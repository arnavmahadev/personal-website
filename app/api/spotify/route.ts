import { NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=20'
// Both "top" endpoints need the user-top-read scope on the refresh token; without it
// they return 403 and those slides are simply left out.
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5'
const TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5'

type RecentTrack = {
  title: string
  artist: string
  albumArt?: string
  songUrl: string
}

type TrackResult = {
  isPlaying: boolean
  title: string | null
  artist?: string
  album?: string
  albumArt?: string
  songUrl?: string
  recent?: RecentTrack[]
  topTracks?: RecentTrack[]
  topArtists?: TopArtist[]
  error?: string
}

type TopArtist = {
  name: string
  image?: string
  url: string
}

const RECENT_COUNT = 5

// Spotify rate-limits by app, and failed responses are never cached by fetch, so a
// failing endpoint would otherwise be retried on every request. These keys remember
// what worked and when to stay away.
const LAST_KEY = 'spotify:last' // last good response, served whenever Spotify can't be asked
const TOP_KEY = 'spotify:top' // last good top tracks and artists
const TOP_CHECK_KEY = 'spotify:top:checked' // presence = the top endpoints were tried recently
const BLOCK_KEY = 'spotify:blocked' // presence = Spotify told us to back off

const PERSIST_TTL = 60 * 60 * 24 * 30
const TOP_REFRESH_TTL = 60 * 60 // rankings cover four weeks; hourly is plenty
const MIN_BACKOFF = 30
const MAX_BACKOFF = 60 * 60 * 6

type TopStats = { topTracks: RecentTrack[]; topArtists: TopArtist[] }

const redisHeaders = () => ({ Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` })

async function redisMGet(keys: string[]): Promise<(string | null)[]> {
  const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/mget/${keys.join('/')}`, {
    headers: redisHeaders(),
    cache: 'no-store',
  })
  const data = await res.json()
  return Array.isArray(data.result) ? data.result : keys.map(() => null)
}

// The value goes in the body, so long JSON payloads don't have to fit in a URL.
async function redisSet(key: string, value: string, ttl: number) {
  await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${key}?EX=${ttl}`, {
    method: 'POST',
    headers: redisHeaders(),
    body: value,
    cache: 'no-store',
  })
}

function parse<T>(raw: string | null): T | null {
  try {
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

// How long Spotify asked us to wait, kept within sane bounds.
function backoff(res: Response) {
  const seconds = Number(res.headers.get('retry-after'))
  return Math.min(MAX_BACKOFF, Math.max(MIN_BACKOFF, Number.isFinite(seconds) ? Math.ceil(seconds) : MIN_BACKOFF))
}

const toRecent = (track: SpotifyTrack): RecentTrack => ({
  title: track.name,
  artist: track.artists.map(a => a.name).join(', '),
  albumArt: track.album.images.at(-1)?.url,
  songUrl: track.external_urls.spotify,
})

type SpotifyTrack = {
  id: string
  name: string
  artists: Array<{ name: string }>
  album: { name: string; images: Array<{ url: string }> }
  external_urls: { spotify: string }
}

async function fetchAccessToken(): Promise<string | null> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
    next: { revalidate: 3400 },
  })
  if (!res.ok) return null
  const data = await res.json()
  return (data.access_token as string) ?? null
}

// Spotify's own four-week rankings. Whatever happens, the endpoints are then left
// alone for a while: an hour normally, or as long as Spotify asks after a 429.
async function refreshTop(headers: Record<string, string>, previous: TopStats): Promise<TopStats> {
  const [tracksRes, artistsRes] = await Promise.all([
    fetch(TOP_TRACKS_ENDPOINT, { headers, cache: 'no-store' }),
    fetch(TOP_ARTISTS_ENDPOINT, { headers, cache: 'no-store' }),
  ])

  const limited = [tracksRes, artistsRes].find(res => res.status === 429)
  if (!tracksRes.ok || !artistsRes.ok) {
    await redisSet(TOP_CHECK_KEY, '1', limited ? backoff(limited) : TOP_REFRESH_TTL)
    return previous
  }

  const top: TopStats = {
    topTracks: ((await tracksRes.json()).items ?? []).map(toRecent),
    topArtists: ((await artistsRes.json()).items ?? []).map(
      (artist: { name: string; images?: Array<{ url: string }>; external_urls: { spotify: string } }) => ({
        name: artist.name,
        image: artist.images?.at(-1)?.url,
        url: artist.external_urls.spotify,
      })
    ),
  }
  await redisSet(TOP_KEY, JSON.stringify(top), PERSIST_TTL)
  await redisSet(TOP_CHECK_KEY, '1', TOP_REFRESH_TTL)
  return top
}

// What is playing now, or failing that the most recent play, plus the rest of the history.
async function readPlayer(nowRes: Response, recentRes: Response): Promise<TrackResult> {
  // Distinct tracks from the listening history, newest first.
  const history: SpotifyTrack[] = []
  if (recentRes.ok) {
    const recentData = await recentRes.json()
    for (const item of recentData.items ?? []) {
      const track: SpotifyTrack | undefined = item.track
      if (track && !history.some(t => t.id === track.id)) history.push(track)
    }
  }

  if (nowRes.status === 200) {
    const data = await nowRes.json()
    if (data.item) {
      return {
        isPlaying: data.is_playing,
        title: data.item.name,
        artist: data.item.artists.map((a: { name: string }) => a.name).join(', '),
        album: data.item.album.name,
        albumArt: data.item.album.images[0]?.url,
        songUrl: data.item.external_urls.spotify,
        recent: history.filter(t => t.id !== data.item.id).slice(0, RECENT_COUNT).map(toRecent),
      }
    }
  }

  if (!recentRes.ok) {
    return { isPlaying: false, title: null, error: `recent-${recentRes.status}` }
  }

  // Nothing playing: the newest history entry is the headline, the rest fill the strip.
  const track = history[0]
  if (track) {
    return {
      isPlaying: false,
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      album: track.album.name,
      albumArt: track.album.images[0]?.url,
      songUrl: track.external_urls.spotify,
      recent: history.slice(1, RECENT_COUNT + 1).map(toRecent),
    }
  }

  return { isPlaying: false, title: null }
}

// The last response written to Redis by this instance, so an unchanged track isn't rewritten.
let savedSignature = ''

export async function GET() {
  let last: TrackResult | null = null
  let top: TopStats = { topTracks: [], topArtists: [] }
  let topChecked = false
  let blocked = false

  try {
    const [lastRaw, topRaw, topCheckRaw, blockRaw] = await redisMGet([LAST_KEY, TOP_KEY, TOP_CHECK_KEY, BLOCK_KEY])
    last = parse<TrackResult>(lastRaw)
    top = parse<TopStats>(topRaw) ?? top
    topChecked = topCheckRaw !== null
    blocked = blockRaw !== null
  } catch {}

  // Whenever Spotify can't give an answer, fall back to the last one that worked.
  const fallback = (error: string) =>
    NextResponse.json({ ...(last ?? { isPlaying: false, title: null, error }), isPlaying: false, ...top })

  if (blocked) return fallback('rate-limited')

  const access_token = await fetchAccessToken()
  if (!access_token) return fallback('token-unavailable')

  const headers = { Authorization: `Bearer ${access_token}` }
  const [nowRes, recentRes] = await Promise.all([
    fetch(NOW_PLAYING_ENDPOINT, { headers, next: { revalidate: 15 } }),
    fetch(RECENTLY_PLAYED_ENDPOINT, { headers, next: { revalidate: 15 } }),
  ])

  const limited = [nowRes, recentRes].find(res => res.status === 429)
  if (limited) {
    try {
      await redisSet(BLOCK_KEY, '1', backoff(limited))
    } catch {}
    return fallback('rate-limited')
  }

  if (!topChecked) {
    try {
      top = await refreshTop(headers, top)
    } catch {}
  }

  const track = await readPlayer(nowRes, recentRes)
  if (!track.title) return fallback(track.error ?? 'nothing-played')

  const signature = `${track.songUrl}|${track.isPlaying}|${track.recent?.[0]?.songUrl}`
  if (signature !== savedSignature) {
    try {
      await redisSet(LAST_KEY, JSON.stringify(track), PERSIST_TTL)
      savedSignature = signature
    } catch {}
  }

  return NextResponse.json({ ...track, ...top })
}
