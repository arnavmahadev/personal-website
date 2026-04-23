import { unstable_cache } from 'next/cache'
import { NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

async function fetchAccessToken(): Promise<string> {
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
  })
  if (!res.ok) throw new Error(`Token fetch failed: ${res.status} ${await res.text()}`)
  const data = await res.json()
  return data.access_token as string
}

type TrackResult = {
  isPlaying: boolean
  title: string | null
  artist?: string
  album?: string
  albumArt?: string
  songUrl?: string
}

const getSpotifyTrack = unstable_cache(
  async (): Promise<TrackResult> => {
    const access_token = await fetchAccessToken()

    const nowRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
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
        }
      }
    }

    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    if (!recentRes.ok) throw new Error(`Recently played fetch failed: ${recentRes.status}`)
    const recentData = await recentRes.json()
    const track = recentData.items?.[0]?.track

    if (track) {
      return {
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((a: { name: string }) => a.name).join(', '),
        album: track.album.name,
        albumArt: track.album.images[0]?.url,
        songUrl: track.external_urls.spotify,
      }
    }

    return { isPlaying: false, title: null }
  },
  ['spotify-track'],
  { revalidate: 30 },
)

export async function GET() {
  try {
    const track = await getSpotifyTrack()
    return NextResponse.json(track)
  } catch (err) {
    return NextResponse.json({ isPlaying: false, title: null, error: String(err) })
  }
}
