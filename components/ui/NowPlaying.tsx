'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

interface RecentTrack {
  title: string
  artist: string
  albumArt?: string
  songUrl: string
}

interface Track {
  isPlaying: boolean
  title: string | null
  artist: string
  album: string
  albumArt: string
  songUrl: string
  recent?: RecentTrack[]
  topTracks?: RecentTrack[]
  topArtists?: Array<{ name: string; image?: string; url: string }>
}

interface Slide {
  label: string
  round?: boolean
  items: Array<{ href: string; image: string; title: string }>
}

const SLIDE_MS = 5000

// A strip that rotates through sets of thumbnails: recently played, top tracks,
// top artists. The active marker fills up like a progress bar and the strip moves
// on when it is full, so the fill is the timer. It holds while a mouse is over the
// strip or something in it has focus. Clicking anywhere on the strip skips to the
// next slide, and the markers jump straight to one.
function StatSlides({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const active = index % slides.length
  const current = slides[active]
  const rotates = slides.length > 1
  const next = () => setIndex(n => (n + 1) % slides.length)

  const slideIn = {
    initial: { opacity: 0, x: 28 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -28 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  }

  return (
    <div
      className={`px-4 py-3 border-t border-border overflow-hidden flex items-center justify-between gap-3 ${
        rotates ? 'cursor-pointer' : ''
      }`}
      onClick={rotates ? next : undefined}
      // Mouse only: a tap also fires "enter" and would leave the strip stuck on pause.
      onPointerEnter={e => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Label with its markers centred underneath. Every label is laid out invisibly
          in the same grid cell, so the cell is always as big as the largest one and the
          markers below never shift when the visible label changes. */}
      <div className="flex flex-col items-center gap-2.5">
        <div className="grid place-items-center text-xs font-mono text-muted-foreground uppercase tracking-widest text-center">
          {slides.map(slide => (
            <p key={slide.label} aria-hidden className="col-start-1 row-start-1 invisible">
              {slide.label}
            </p>
          ))}
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={current.label} className="col-start-1 row-start-1" {...slideIn}>
              {current.label}
            </motion.p>
          </AnimatePresence>
        </div>

        {rotates && (
          <div className="flex gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.label}
                onClick={e => {
                  e.stopPropagation()
                  setIndex(i)
                }}
                aria-label={`Show ${slide.label.toLowerCase()}`}
                aria-current={i === active}
                className={`relative h-1 rounded-full overflow-hidden bg-border transition-all duration-300 ${
                  i === active ? 'w-10' : 'w-2 hover:bg-muted-foreground'
                }`}
              >
                {i === active && (
                  <span
                    className="slide-fill absolute inset-0 bg-primary"
                    style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                    onAnimationEnd={next}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={current.label} className="flex gap-2" {...slideIn}>
          {current.items.map(item => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.title}
              aria-label={item.title}
              // A thumbnail opens its link; it shouldn't also skip the slide.
              onClick={e => e.stopPropagation()}
              className="block transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Image
                src={item.image}
                alt=""
                width={36}
                height={36}
                className={`object-cover aspect-square ${current.round ? 'rounded-full' : 'rounded'}`}
              />
            </a>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
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
        <div className="flex flex-row items-center gap-3 min-w-0 w-fit mx-auto">
          <div className="rounded-md bg-muted flex-shrink-0 animate-pulse w-16 h-16 sm:w-24 sm:h-24" />
          <div className="flex-1 min-w-0 text-left space-y-1.5">
            <div className="h-4 w-24 rounded animate-pulse bg-muted" />
            <div className="h-5 w-40 rounded animate-pulse bg-muted" />
            <div className="h-4 w-28 rounded animate-pulse bg-muted" />
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

  const trackItems = (tracks: RecentTrack[] = []) =>
    tracks
      .filter(t => t.albumArt)
      .map(t => ({ href: t.songUrl, image: t.albumArt!, title: `${t.title} · ${t.artist}` }))
  const slides: Slide[] = [
    { label: 'Recently played', items: trackItems(track?.recent) },
    { label: 'Top tracks', items: trackItems(track?.topTracks) },
    {
      label: 'Top artists',
      round: true,
      items: (track?.topArtists ?? []).filter(a => a.image).map(a => ({ href: a.url, image: a.image!, title: a.name })),
    },
  ].filter(slide => slide.items.length > 0)

  return (
    <div className="relative rounded-xl bg-card border border-border overflow-hidden h-full flex flex-col card-glow">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[#1DB954]" />
      <div className="px-4 py-4 flex-1 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
        {/* Mobile-only title */}
        <p className="sm:hidden text-sm font-mono text-muted-foreground uppercase tracking-widest">Spotify</p>

        {/* Music taste blurb (with desktop title pinned to top) */}
        <div className="sm:flex-1 sm:self-stretch sm:relative flex flex-col sm:justify-center">
          <p className="hidden sm:block absolute top-0 left-0 text-sm font-mono text-muted-foreground uppercase tracking-widest">Spotify</p>
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

      {slides.length > 0 && <StatSlides slides={slides} />}
    </div>
  )
}
