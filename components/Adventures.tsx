'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import SectionWrapper from './ui/SectionWrapper'
import { ADVENTURES, VISITED_LOCATIONS as VISITED, CONTINENTS, DEFAULT_COUNTRY, type Adventure } from '@/content'
import dynamic from 'next/dynamic'

const WorldMap = dynamic(() => import('./WorldMap'), { ssr: false })

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
    const days    = Math.floor(diff / 86_400_000)
    const hours   = Math.floor((diff % 86_400_000) / 3_600_000)
    const minutes = Math.floor((diff % 3_600_000)  / 60_000)
    const seconds = Math.floor((diff % 60_000)     / 1_000)
    return { days, hours, minutes, seconds, done: false }
  }
  const [time, setTime] = useState<ReturnType<typeof calc> | null>(null)
  useEffect(() => {
    setTime(calc())
    const id = setInterval(() => setTime(calc()), 1_000)
    return () => clearInterval(id)
  }, [target])
  return time
}

function Countdown({ target, onExpire }: { target: Date; onExpire?: () => void }) {
  const time = useCountdown(target)
  const done = time?.done ?? false
  useEffect(() => {
    if (done) onExpire?.()
  }, [done, onExpire])
  if (!time) return (
    <div className="flex items-end gap-3">
      {['days', 'hrs', 'min', 'sec'].map((label) => (
        <div key={label} className="flex flex-col items-center">
          <div className="h-8 w-8 rounded animate-pulse bg-muted mb-0.5" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-0.5 opacity-0 select-none">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
  const { days, hours, minutes, seconds } = time
  // Once the timer expires the trip is moved to Past adventures, so the card
  // (and this countdown) unmounts — render nothing in the interim.
  if (done) return null

  const units = [
    { label: 'days',    value: days    },
    { label: 'hrs',     value: hours   },
    { label: 'min',     value: minutes },
    { label: 'sec',     value: seconds },
  ]

  return (
    <div className="flex items-end gap-3">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-2xl font-bold tabular-nums text-foreground leading-none">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-0.5">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

// Derive the "Month Year" label shown on Past cards from an adventure's date.
function formatAdventureDate(d: Date) {
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

// A round postmark for a past trip: the trip's first photo inside a ring of
// curved type. The ink colour is derived from the trip id, so it never changes
// between renders. Each ink is pulled toward the text colour to stay legible on both themes.
const POSTMARK_INKS = ['--primary', '--accent', '--destructive'].map(
  (ink) => `color-mix(in oklch, var(${ink}) 70%, var(--foreground))`
)

function Postmark({ trip }: { trip: Adventure }) {
  const seed = Array.from(trip.id).reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  const photo = trip.photos?.[0]
  const date = trip.date.toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
  // Said twice so the type runs the whole way round the ring.
  const legend = `${trip.id} • ${date} • `.repeat(2)

  return (
    <span
      aria-hidden
      className="relative shrink-0 w-[68px] h-[68px] sm:w-[84px] sm:h-[84px]"
      style={{ color: POSTMARK_INKS[seed % POSTMARK_INKS.length] }}
    >
      <svg viewBox="0 0 100 100" className="postmark-ring absolute inset-0 w-full h-full">
        <defs>
          <path id={`postmark-${trip.id}`} d="M8,50 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
        </defs>
        <circle cx={50} cy={50} r={38.5} fill="none" stroke="currentColor" strokeWidth={1} />
        <text fill="currentColor" fontSize={8.5} className="font-mono uppercase">
          <textPath href={`#postmark-${trip.id}`} textLength={258} lengthAdjust="spacing">
            {legend}
          </textPath>
        </text>
      </svg>
      {photo && (
        <Image
          src={photo.src}
          alt=""
          width={120}
          height={120}
          className="absolute inset-[14%] w-[72%] h-[72%] rounded-full object-cover"
        />
      )}
    </span>
  )
}

function PastTrip({ past }: { past: Adventure }) {
  const [open, setOpen] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const photos = past.photos ?? []
  const hasPhotos = photos.length > 0

  const header = (
    <div className="px-4 py-4 flex items-center justify-between gap-4">
      <div className="mr-auto">
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">
          {formatAdventureDate(past.date)}
        </p>
        <p className="text-lg font-semibold font-serif text-foreground leading-snug">
          {past.label}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">{past.description}</p>
      </div>
      <Postmark trip={past} />
      {/* Fixed width so the postmarks line up down the list whatever the photo count */}
      {hasPhotos && (
        <span className="w-[6.5rem] justify-end text-sm text-muted-foreground flex-shrink-0 flex items-center gap-1 group-hover:text-foreground transition-colors">
          {photos.length} photos
          <svg
            viewBox="0 0 24 24"
            className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" strokeWidth={2}
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </div>
  )

  return (
    <div>
      {/* Header card — only clickable / collapsible when there are photos */}
      {hasPhotos ? (
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full text-left rounded-xl border border-border bg-card overflow-hidden relative group card-glow"
        >
          {header}
        </button>
      ) : (
        <div className="w-full text-left rounded-xl border border-border bg-card overflow-hidden relative card-glow">
          {header}
        </div>
      )}

      {/* Collapsible photo grid */}
      {hasPhotos && (
        <div
          ref={gridRef}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? gridRef.current?.scrollHeight ?? 9999 : 0 }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 pt-2">
            {photos.map((photo) => (
              <div key={photo.src} className="aspect-square overflow-hidden rounded-lg shadow-md">
                <Image
                  src={photo.src}
                  alt=""
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Adventures() {
  // `now` drives the upcoming/past split. It's set once on mount, then bumped
  // whenever a countdown hits zero so the trip moves to Past automatically.
  const [now, setNow] = useState(() => Date.now())
  const markExpired = useCallback(() => setNow(Date.now()), [])

  const { upcoming, past, markers, stats } = useMemo(() => {
    // A single list, partitioned purely by date: future → upcoming (soonest
    // first, with a countdown), past → past (most recent first).
    const upcoming = ADVENTURES
      .filter((a) => a.date.getTime() > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
    const past = ADVENTURES
      .filter((a) => a.date.getTime() <= now)
      .sort((a, b) => b.date.getTime() - a.date.getTime())

    const markers = [
      ...past.map((t) => ({ id: t.id, label: t.label, description: t.description, coordinates: t.coordinates, type: 'past' as const })),
      ...VISITED.map((t) => ({ id: t.id, label: t.label, description: '', coordinates: t.coordinates, type: 'past' as const })),
      ...upcoming.map((t) => ({ id: t.id, label: t.label, description: t.description, coordinates: t.coordinates, type: 'upcoming' as const })),
    ]

    // Totals for the stats strip: only places already visited count.
    const visited = [...past, ...VISITED]
    const countries = new Set(visited.flatMap((v) => v.countries ?? [DEFAULT_COUNTRY]))
    const continents = new Set(Array.from(countries).map((c) => CONTINENTS[c]).filter(Boolean))
    const summit = past.filter((t) => t.summitFt).sort((a, b) => b.summitFt! - a.summitFt!)[0]
    const stats = [
      { label: 'Places pinned', value: visited.length, note: 'trips and stops' },
      { label: 'Countries', value: countries.size, note: 'so far' },
      { label: 'Continents', value: continents.size, note: 'of 7' },
      ...(summit
        ? [{ label: 'Highest summit', value: summit.summitFt!, unit: 'ft', note: summit.label.replace(/^Summit /, '') }]
        : []),
    ]
    return { upcoming, past, markers, stats }
  }, [now])

  return (
    <SectionWrapper id="adventures">
      <h2 className="text-4xl sm:text-5xl font-bold font-serif tracking-tight text-foreground mb-5">
        Adventures
      </h2>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card px-4 py-4 card-glow">
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-bold font-serif tabular-nums text-foreground">
              {stat.value.toLocaleString('en-US')}
              {'unit' in stat && <span className="text-lg font-medium text-muted-foreground"> {stat.unit}</span>}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">{stat.note}</p>
          </div>
        ))}
      </div>

      <WorldMap markers={markers} />

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <>
          <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3 mt-8">
            Upcoming
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {upcoming.map((trip) => (
              <div
                key={trip.id}
                className="rounded-xl border border-border bg-card overflow-hidden relative flex flex-col card-glow"
              >
                {trip.image && (
                  <div className="relative w-full h-32 overflow-hidden">
                    <Image
                      src={trip.image}
                      alt={trip.label}
                      fill
                      className="object-cover object-center"
                      style={trip.imagePosition ? { objectPosition: trip.imagePosition } : undefined}
                    />
                  </div>
                )}
                <div className="px-4 py-4 flex flex-col gap-3 flex-1">
                  <div>
                    <p className="text-lg font-semibold font-serif text-foreground leading-snug">
                      {trip.label}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">{trip.description}</p>
                  </div>
                  <Countdown target={trip.date} onExpire={markExpired} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Past adventures */}
      <h3 className={`text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3${upcoming.length === 0 ? ' mt-8' : ''}`}>
        Past
      </h3>
      <div className="flex flex-col gap-3">
        {past.map((trip) => (
          <PastTrip key={trip.id} past={trip} />
        ))}
      </div>
    </SectionWrapper>
  )
}
