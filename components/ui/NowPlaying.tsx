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
          className="flex flex-col sm:flex-row items-center gap-3 group min-w-0 w-full"
        >
          {track.albumArt && (
            <Image
              src={track.albumArt}
              alt={track.album}
              width={96}
              height={96}
              className="rounded-md flex-shrink-0 w-[min(45vw,8rem)] h-[min(45vw,8rem)] sm:w-24 sm:h-24"
            />
          )}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-0.5">
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
    const interval = setInterval(poll, 10_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative rounded-xl bg-card border border-border overflow-hidden h-full">
      <div className="px-4 py-4 h-full flex flex-col gap-3">
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Spotify</p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 flex-1">
          {/* Music taste blurb */}
          <div className="sm:flex-[0_0_auto] sm:w-[32%] flex flex-col justify-center">
            <p className="text-base text-foreground/80 leading-relaxed">
              I don&apos;t know what my music taste is. The best way I can describe it is &ldquo;I like what I like.&rdquo;
            </p>
            <a
              href="https://open.spotify.com/user/qjzz2wqvhzmjkjitps4vilhrm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Check out my playlists
            </a>
          </div>

          {/* Divider — vertical on sm+, horizontal on mobile */}
          <div className="hidden sm:block w-px bg-border flex-shrink-0" />
          <div className="sm:hidden h-px bg-border flex-shrink-0" />

          {/* Track info */}
          <TrackPanel track={track} />
        </div>
      </div>
    </div>
  )
}
