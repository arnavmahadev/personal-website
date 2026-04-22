'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionWrapper from './ui/SectionWrapper'

const TRIPS = [
  {
    id: 'utah',
    label: 'Utah Road Trip',
    image: '/adventures/utah.jpg' as string | null,
    target: new Date('2026-05-21T03:00:00Z'),
    description: 'Zion · Bryce · Arches · Canyonlands · Capitol Reef · La Sal',
    stripes: ['bg-orange-500', 'bg-orange-700', 'bg-orange-500', 'bg-orange-700', 'bg-orange-500'],
  },
  {
    id: 'kili',
    label: 'Summit Mt. Kilimanjaro',
    image: '/adventures/kili.jpg' as string | null,
    target: new Date('2026-08-02T05:00:00Z'),
    description: '5,895 m (19,341 ft) · Uhuru Peak · Tanzania',
    stripes: ['bg-sky-500', 'bg-sky-700', 'bg-sky-500', 'bg-sky-700', 'bg-sky-500'],
  },
  {
    id: 'safari',
    label: 'Tanzania Safari',
    image: '/adventures/safari.jpg' as string | null,
    target: new Date('2026-08-10T03:00:00Z'),
    description: 'Serengeti · Tarangire · Ngorongoro Crater',
    stripes: ['bg-yellow-500', 'bg-amber-700', 'bg-yellow-500', 'bg-amber-700', 'bg-yellow-500'],
  },
]

const PAST: {
  id: string
  label: string
  date: string
  description: string
  stripes: string[]
  photos: { src: string; caption: string }[]
}[] = [
  {
    id: 'barcelona',
    label: 'Barcelona, Spain',
    date: 'January 2026',
    description: 'Gothic Quarter · La Sagrada Família · Park Güell · Montserrat · Sitges · Costa Brava · Castell de Montjuïc · Bunkers del Carmel · Camp Nou',
    stripes: ['bg-[#A50044]', 'bg-[#004D98]', 'bg-[#A50044]', 'bg-[#004D98]', 'bg-[#A50044]'],
    photos: [
      { src: '/adventures/barcelona/IMG_2134.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2212_2.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2232_3.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2263.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2394_2.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2623_2.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2857.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2876.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_3003_3.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_3465.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_3487.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_3495_2.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_3588_2.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_3870_2.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/PXL_20260105_025312781_Original_2.jpg', caption: 'Barcelona' },
    ],
  },
  {
    id: 'norcal',
    label: 'Northern California Road Trip',
    date: 'December 2025',
    description: 'Redwood National Park · Avenue of the Giants · Humboldt Redwoods · Eureka',
    stripes: ['bg-amber-500', 'bg-amber-700', 'bg-amber-500', 'bg-amber-700', 'bg-amber-500'],
    photos: [
      { src: '/adventures/norcal/IMG_1050_2.jpg', caption: '' },
      { src: '/adventures/norcal/IMG_1287_3.jpg', caption: '' },
      { src: '/adventures/norcal/IMG_1293_2.jpg', caption: '' },
      { src: '/adventures/norcal/IMG_1467_2.jpg', caption: '' },
      { src: '/adventures/norcal/IMG_1604_2.jpg', caption: '' },
    ],
  },
  {
    id: 'colorado',
    label: 'Colorado Road Trip',
    date: 'August 2025',
    description: 'Rocky Mountain · Maroon Bells · Grand Mesa · Black Canyon · Garden of the Gods · Pikes Peak · Great Sand Dunes',
    stripes: ['bg-emerald-600', 'bg-emerald-800', 'bg-emerald-600', 'bg-emerald-800', 'bg-emerald-600'],
    photos: [
      { src: '/adventures/colorado/IMG_0014_2.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0131.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0209.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0211.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0215.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0224.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0237.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0285.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0306.jpg', caption: '' },
      { src: '/adventures/colorado/f1ae8af3-956d-4921-ab75-c7389fdb2e39.jpg', caption: '' },
    ],
  },
]

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
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1_000)
    return () => clearInterval(id)
  }, [target])
  return time
}

function Countdown({ target }: { target: Date }) {
  const { days, hours, minutes, seconds, done } = useCountdown(target)
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

const fade = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
})

type PastTripData = typeof PAST[number]

function PastTrip({ past, index }: { past: PastTripData; index: number }) {
  const [open, setOpen] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div {...fade(TRIPS.length + index)}>
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
    </motion.div>
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
        {TRIPS.map((trip, i) => (
          <motion.div
            key={trip.id}
            {...fade(i)}
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
          </motion.div>
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
