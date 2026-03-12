'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionWrapper from './ui/SectionWrapper'
import NowPlaying from './ui/NowPlaying'

interface BarcaResult {
  opponent: string
  barcaScore: string
  oppScore: string
  barcaHome: boolean
  result: 'W' | 'L' | 'D'
  league: string
  date: string
  barcaLogo: string | null
  oppLogo: string | null
}

interface ValorantRank {
  rank: string
  rr: number
  icon: string | null
}

const RANK_COLOR: Record<string, string> = {
  Iron:       'text-zinc-400',
  Bronze:     'text-orange-400',
  Silver:     'text-slate-300',
  Gold:       'text-yellow-400',
  Platinum:   'text-cyan-400',
  Diamond:    'text-blue-400',
  Ascendant:  'text-emerald-400',
  Immortal:   'text-red-400',
  Radiant:    'text-yellow-300',
}

function rankColor(rank: string) {
  const tier = rank.split(' ')[0]
  return RANK_COLOR[tier] ?? 'text-zinc-200'
}

const fade = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
})

export default function Interests() {
  const [barca, setBarca] = useState<BarcaResult | null>(null)
  const [val, setVal] = useState<ValorantRank | null>(null)
  const [steps, setSteps] = useState<number | null | undefined>(undefined)

  useEffect(() => {
    fetch('/api/barca').then(r => r.json()).then(setBarca).catch(() => {})
    fetch('/api/valorant').then(r => r.json()).then(setVal).catch(() => {})
    fetch('/api/health').then(r => r.json()).then(d => setSteps(d.steps)).catch(() => setSteps(null))
  }, [])

  useEffect(() => {
    if (steps !== null) return
    const id = setInterval(() => {
      fetch('/api/health').then(r => r.json()).then(d => {
        if (d.steps !== null) setSteps(d.steps)
      }).catch(() => {})
    }, 60000)
    return () => clearInterval(id)
  }, [steps])

  return (
    <SectionWrapper id="interests">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mb-8">
        Hobbies
      </h2>

      <div className="grid grid-cols-2 gap-3">

        {/* Spotify */}
        <motion.div {...fade(0)} className="col-span-1 h-[108px]">
          <NowPlaying />
        </motion.div>

        {/* Barca */}
        <motion.div
          {...fade(1)}
          className="col-span-1 h-[108px] rounded-xl border overflow-hidden relative bg-zinc-900 border-zinc-800"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col">
            <div className="flex-1 bg-[#A50044]" />
            <div className="flex-1 bg-[#004D98]" />
            <div className="flex-1 bg-[#A50044]" />
            <div className="flex-1 bg-[#004D98]" />
            <div className="flex-1 bg-[#A50044]" />
          </div>
          <div className="pl-5 pr-4 py-4">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">FC Barcelona&apos;s Latest Match</p>
            {barca ? (
              <>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                    barca.result === 'W' ? 'bg-green-500/15 text-green-400' :
                    barca.result === 'L' ? 'bg-red-500/15 text-red-400' :
                    'bg-zinc-700 text-zinc-400'
                  }`}>{barca.result}</span>
                  <p className="text-xs text-zinc-500">{barca.league}</p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Home team */}
                  <div className="flex items-center gap-1.5">
                    {(barca.barcaHome ? barca.barcaLogo : barca.oppLogo) && (
                      <Image src={(barca.barcaHome ? barca.barcaLogo : barca.oppLogo)!} alt="" width={20} height={20} className="object-contain" />
                    )}
                    <p className="text-sm font-bold text-zinc-100">
                      {barca.barcaHome ? 'Barcelona' : barca.opponent}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-zinc-100">
                    {barca.barcaHome ? barca.barcaScore : barca.oppScore}
                    <span className="text-zinc-600 mx-1">–</span>
                    {barca.barcaHome ? barca.oppScore : barca.barcaScore}
                  </p>
                  {/* Away team */}
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-zinc-100">
                      {barca.barcaHome ? barca.opponent : 'Barcelona'}
                    </p>
                    {(barca.barcaHome ? barca.oppLogo : barca.barcaLogo) && (
                      <Image src={(barca.barcaHome ? barca.oppLogo : barca.barcaLogo)!} alt="" width={20} height={20} className="object-contain" />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-10 animate-pulse bg-zinc-800 rounded w-48" />
            )}
          </div>
        </motion.div>

        {/* Valorant */}
        <motion.div
          {...fade(2)}
          className="col-span-1 h-[108px] rounded-xl border overflow-hidden relative bg-zinc-900 border-zinc-800"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col">
            <div className="flex-1 bg-[#FF4655]" />
            <div className="flex-1 bg-[#7B1E26]" />
            <div className="flex-1 bg-[#FF4655]" />
            <div className="flex-1 bg-[#7B1E26]" />
            <div className="flex-1 bg-[#FF4655]" />
          </div>
          <div className="pl-5 pr-4 py-4">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Valorant</p>
            {val ? (
              <div className="flex items-center gap-3">
                {val.icon && (
                  <Image src={val.icon} alt={val.rank} width={40} height={40} />
                )}
                <div>
                  <p className={`text-xl font-bold ${rankColor(val.rank)}`}>{val.rank}</p>
                  <p className="text-xs text-zinc-500">{val.rr} RR</p>
                </div>
              </div>
            ) : (
              <div className="h-7 animate-pulse bg-zinc-800 rounded w-32" />
            )}
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          {...fade(3)}
          className="col-span-1 h-[108px] rounded-xl border overflow-hidden relative bg-zinc-900 border-zinc-800"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col">
            <div className="flex-1 bg-[#FF9500]" />
            <div className="flex-1 bg-[#CC6A00]" />
            <div className="flex-1 bg-[#FF9500]" />
            <div className="flex-1 bg-[#CC6A00]" />
            <div className="flex-1 bg-[#FF9500]" />
          </div>
          <div className="pl-5 pr-4 py-4">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Steps Today</p>
            {steps === undefined ? (
              <div className="h-7 animate-pulse bg-zinc-800 rounded w-24" />
            ) : steps === null ? (
              <p className="text-sm text-zinc-600">No data yet</p>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-3xl">👣</span>
                <div>
                  <p className="text-xl font-bold text-zinc-100">{steps.toLocaleString()}</p>
                  <p className="text-xs text-zinc-500">steps</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  )
}
