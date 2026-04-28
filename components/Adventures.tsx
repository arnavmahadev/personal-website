'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import SectionWrapper from './ui/SectionWrapper'
import { UPCOMING_TRIPS as TRIPS, PAST_TRIPS as PAST } from '@/content'

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

function Countdown({ target }: { target: Date }) {
  const time = useCountdown(target)
  if (!time) return <div className="h-10" />
  const { days, hours, minutes, seconds, done } = time
  if (done) return <p className="text-sm font-semibold text-green-400">It&apos;s happening! 🎉</p>

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

type PastTripData = typeof PAST[number]

function PastTrip({ past, index: _index }: { past: PastTripData; index: number }) {
  const [open, setOpen] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      {/* Clickable header card */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left rounded-xl border border-border bg-card overflow-hidden relative group"
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">
              {past.date}
            </p>
            <p className="text-lg font-semibold font-serif text-foreground leading-snug">
              {past.label}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">{past.description}</p>
          </div>
          {past.photos.length > 0 && (
            <span className="text-sm text-muted-foreground ml-4 flex-shrink-0 flex items-center gap-1 group-hover:text-foreground transition-colors">
              {past.photos.length} photos
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
      </button>

      {/* Collapsible photo grid */}
      {past.photos.length > 0 && (
        <div
          ref={gridRef}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? gridRef.current?.scrollHeight ?? 9999 : 0 }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 pt-2">
            {past.photos.map((photo) => (
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
  return (
    <SectionWrapper id="adventures">
      <h2 className="text-4xl sm:text-5xl font-bold font-serif tracking-tight text-foreground mb-5">
        Adventures
      </h2>

      {/* Upcoming */}
      <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">
        Upcoming
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {TRIPS.map((trip) => (
          <div
            key={trip.id}
            className="rounded-xl border border-border bg-card overflow-hidden relative flex flex-col"
          >
            {trip.image && (
              <div className="relative w-full h-32 overflow-hidden">
                <Image
                  src={trip.image}
                  alt={trip.label}
                  fill
                  className="object-cover object-center"
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
              <Countdown target={trip.target} />
            </div>
          </div>
        ))}
      </div>

      {/* Past adventures */}
      <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">
        Past
      </h3>
      <div className="flex flex-col gap-3">
        {PAST.map((past, i) => (
          <PastTrip key={past.id} past={past} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
