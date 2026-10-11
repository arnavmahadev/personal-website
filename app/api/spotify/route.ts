import { NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=20'

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
  error?: string
}

const RECENT_COUNT = 5

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

async function fetchTrack(): Promise<TrackResult> {
  const access_token = await fetchAccessToken()
  if (!access_token) {
    return { isPlaying: false, title: null, error: 'token-unavailable' }
  }

  const headers = { Authorization: `Bearer ${access_token}` }
  const [nowRes, recentRes] = await Promise.all([
    fetch(NOW_PLAYING_ENDPOINT, { headers, next: { revalidate: 10 } }),
    fetch(RECENTLY_PLAYED_ENDPOINT, { headers, next: { revalidate: 10 } }),
  ])

  // Distinct tracks from the listening history, newest first.
  const history: SpotifyTrack[] = []
  if (recentRes.ok) {
    const recentData = await recentRes.json()
    for (const item of recentData.items ?? []) {
      const track: SpotifyTrack | undefined = item.track
      if (track && !history.some(t => t.id === track.id)) history.push(track)
    }
  }
  const toRecent = (track: SpotifyTrack): RecentTrack => ({
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    albumArt: track.album.images.at(-1)?.url,
    songUrl: track.external_urls.spotify,
  })

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

export async function GET() {
  const track = await fetchTrack()
  return NextResponse.json(track)
}
