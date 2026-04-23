'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function MarqueeText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const span = textRef.current
    if (!container || !span) return
    const overflow = span.scrollWidth - container.clientWidth
    setOffset(overflow > 0 ? overflow : 0)
  }, [text])

  return (
    <div ref={containerRef} className="overflow-hidden">
      <span
        ref={textRef}
        className={`marquee-text ${className ?? ''}`}
        style={{ '--marquee-offset': offset > 0 ? `-${offset}px` : '0px' } as React.CSSProperties}
      >
        {text}
      </span>
    </div>
  )
}

interface Track {
  isPlaying: boolean
  title: string | null
  artist: string
  album: string
  albumArt: string
  songUrl: string
}

function TrackPanel({ track }: { track: Track | null }) {
  return (
    <div className="flex-1 min-w-0 flex items-center justify-center">
      {track?.title ? (
        <a
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center gap-3 group min-w-0 w-fit mx-auto"
        >
          {track.albumArt && (
            <Image
              src={track.albumArt}
              alt={track.album}
              width={96}
              height={96}
              className="rounded-md flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24"
            />
          )}
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-start gap-1.5 mb-0.5">
              {track.isPlaying && (
                <span className="flex gap-0.5 items-end h-3">
                  <span className="w-0.5 bg-green-500 animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: '60%' }} />
                  <span className="w-0.5 bg-green-500 animate-[bounce_0.8s_ease-in-out_0.15s_infinite]" style={{ height: '100%' }} />
                  <span className="w-0.5 bg-green-500 animate-[bounce_0.8s_ease-in-out_0.3s_infinite]" style={{ height: '40%' }} />
                </span>
              )}
              <p className="text-sm text-muted-foreground">{track.isPlaying ? 'Now playing' : 'Last played'}</p>
            </div>
            <MarqueeText text={track.title!} className="text-base font-medium text-foreground/90 group-hover:text-foreground transition-colors" />
            <MarqueeText text={track.artist} className="text-sm text-muted-foreground" />
          </div>
        </a>
      ) : (
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-muted flex-shrink-0 animate-pulse w-24 h-24" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-1">Not playing</p>
            <p className="text-sm text-muted-foreground truncate">—</p>
          </div>
        </div>
      )}
    </div>
  )
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
    const interval = setInterval(poll, 15_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative rounded-xl bg-card border border-border overflow-hidden h-full">
      <div className="px-4 py-4 h-full flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
        {/* Mobile-only title */}
        <p className="sm:hidden text-sm font-mono text-muted-foreground uppercase tracking-widest">Spotify</p>

        {/* Music taste blurb (with desktop title) */}
        <div className="sm:flex-1">
          <p className="hidden sm:block text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Spotify</p>
          <p className="text-base text-foreground/80 leading-relaxed">
            The best way I can describe my music taste is &ldquo;I like what I like.&rdquo;
          </p>
        </div>

        {/* Divider — vertical on sm+, horizontal on mobile */}
        <div className="hidden sm:block w-px bg-border self-stretch flex-shrink-0" />
        <div className="sm:hidden h-px bg-border flex-shrink-0" />

        {/* Track info */}
        <TrackPanel track={track} />
      </div>
    </div>
  )
}
