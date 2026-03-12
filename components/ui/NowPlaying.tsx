'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Track {
  isPlaying: boolean
  title: string | null
  artist: string
  album: string
  albumArt: string
  songUrl: string
}

export default function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null)

  useEffect(() => {
    const poll = () => {
      fetch('/api/spotify')
        .then((r) => r.json())
        .then(setTrack)
        .catch(() => {})
    }
    poll()
    const interval = setInterval(poll, 10_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden h-[108px]">
      <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col">
        <div className="flex-1 bg-[#1DB954]" />
        <div className="flex-1 bg-[#158a3e]" />
        <div className="flex-1 bg-[#1DB954]" />
        <div className="flex-1 bg-[#158a3e]" />
        <div className="flex-1 bg-[#1DB954]" />
      </div>
      <div className="pl-5 pr-4 py-4 h-full flex flex-col">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Spotify</p>
        {track?.title ? (
          <a
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group flex-1"
          >
            {track.albumArt && (
              <Image
                src={track.albumArt}
                alt={track.album}
                width={40}
                height={40}
                className="rounded-md flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                {track.isPlaying && (
                  <span className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 bg-green-400 animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: '60%' }} />
                    <span className="w-0.5 bg-green-400 animate-[bounce_0.8s_ease-in-out_0.15s_infinite]" style={{ height: '100%' }} />
                    <span className="w-0.5 bg-green-400 animate-[bounce_0.8s_ease-in-out_0.3s_infinite]" style={{ height: '40%' }} />
                  </span>
                )}
                <p className="text-xs text-zinc-500">{track.isPlaying ? 'Now playing' : 'Last played'}</p>
              </div>
              <p className="text-sm font-medium text-zinc-200 truncate group-hover:text-zinc-100 transition-colors">
                {track.title}
              </p>
              <p className="text-xs text-zinc-500 truncate">{track.artist}</p>
            </div>
          </a>
        ) : (
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-md bg-zinc-800 flex-shrink-0 animate-pulse" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-500 mb-1">Not playing</p>
              <p className="text-sm text-zinc-500 truncate">—</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
