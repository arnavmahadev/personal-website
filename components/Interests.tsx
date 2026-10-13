'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import SectionWrapper from './ui/SectionWrapper'
import NowPlaying from './ui/NowPlaying'
import CutProgress from './ui/CutProgress'
import Sparkline from './ui/Sparkline'

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
  form?: Array<{ result: 'W' | 'L' | 'D'; opponent: string; score: string }>
  next?: { date: string; opponent: string; oppLogo: string | null; barcaHome: boolean; league: string } | null
  position?: { rank: number; points: number } | null
}

const RESULT_TONE = {
  W: 'bg-green-500/15 text-green-500',
  L: 'bg-red-500/15 text-red-500',
  D: 'bg-muted text-muted-foreground',
}

function ordinal(n: number) {
  const suffix = n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'
  return `${n}${suffix}`
}

// Kickoff in the visitor's own timezone, e.g. "Sat, Oct 17".
function formatKickoff(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

interface ValorantRank {
  rank: string
  rr: number
  icon: string | null
  trend?: number[]
}



export default function Interests() {
  const [barca, setBarca] = useState<BarcaResult | null | undefined>(undefined)
  const [val, setVal] = useState<ValorantRank | null | undefined>(undefined)

  useEffect(() => {
    fetch('/api/barca').then(r => r.json()).then(setBarca).catch(() => setBarca(null))
    fetch('/api/valorant').then(r => r.json()).then(setVal).catch(() => setVal(null))
  }, [])

  return (
    <SectionWrapper id="interests">
      <h2 className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-foreground mb-5">
        Hobbies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-0 items-stretch">

        {/* Left column: Spotify + Valorant stacked */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <NowPlaying />
          </div>

          {/* Valorant — moved here */}
          <div className="flex-1 rounded-xl border overflow-hidden relative bg-card border-border card-glow">
            <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[#FF4655]" />
            <div className="px-4 py-4 pb-6 sm:pb-4 sm:h-full flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="sm:flex-1 sm:self-stretch sm:relative flex flex-col sm:justify-center sm:pt-8">
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2 sm:mb-0 sm:absolute sm:top-0 sm:left-0">Valorant</p>
                <p className="text-base text-foreground/80 leading-relaxed">
                  If I&apos;m not playing sports, I&apos;m probably playing video games with my friends.
                  We play Valorant most often. We're lowkey terrible, but that&apos;s beside the point.
                </p>
              </div>
              <div className="hidden sm:block w-px bg-border self-stretch flex-shrink-0" />
              <div className="sm:hidden h-px bg-border flex-shrink-0" />
              <div className="flex flex-col items-center text-center sm:flex-1 sm:items-center sm:justify-center sm:self-stretch">
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Current rank</p>
                {val === undefined ? (
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-[72px] h-[72px] rounded animate-pulse bg-muted" />
                    <div className="space-y-2">
                      <div className="h-6 w-24 rounded animate-pulse bg-muted" />
                      <div className="h-4 w-14 rounded animate-pulse bg-muted" />
                    </div>
                  </div>
                ) : val === null ? (
                  <p className="text-sm text-muted-foreground">Rank unavailable.</p>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    {val.icon && (
                      <Image src={val.icon} alt={val.rank} width={72} height={72} />
                    )}
                    <div>
                      <p className="text-2xl font-bold font-display text-foreground">{val.rank}</p>
                      <p className="text-sm text-muted-foreground">{val.rr} RR</p>
                    </div>
                  </div>
                )}
                {/* Rating trend, built up from one reading a day */}
                {val?.trend && val.trend.length > 1 && (
                  <div className="mt-3 flex items-center gap-2">
                    <Sparkline values={val.trend} className="w-24 h-6" />
                    <p className="text-xs font-mono tabular-nums text-muted-foreground">
                      {val.trend[val.trend.length - 1] >= 0 ? '+' : '−'}
                      {Math.abs(val.trend[val.trend.length - 1])} RR
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Soccer / Barca */}
        <div className="rounded-xl border overflow-hidden relative bg-card border-border card-glow">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{ background: 'repeating-linear-gradient(90deg, #004D98 0 28px, #A50044 28px 56px)' }}
          />
          <div className="px-4 py-4 sm:py-4 h-full flex flex-col space-y-3">
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Soccer &amp; FC Barcelona</p>
            <p className="text-base text-foreground/80 leading-relaxed">
              I&apos;ve loved soccer since I was 4 and I played competitively until college.
              I was captain of both my club team and high school varsity team, made the all league first team all 4 years of high school, and finished with <span className="font-semibold text-foreground">45 goals and 20 assists</span> over 4 years. You can still find me playing pickup or intramural games :)
            </p>
            <p className="text-base text-foreground/80 leading-relaxed">
              I&apos;ve been a Barça fan since age 4 because of my older brother. I catch most of their games, and honestly my mood heavily
              depends on the result. (jk… mostly.)
            </p>

            <div className="pb-3">
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">Latest result</p>
              {barca === undefined ? (
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-7 rounded animate-pulse bg-muted" />
                    <div className="h-4 w-28 rounded animate-pulse bg-muted" />
                  </div>
                  <div className="flex items-center justify-between w-full gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-[22px] h-[22px] rounded animate-pulse bg-muted" />
                      <div className="h-5 w-32 rounded animate-pulse bg-muted" />
                    </div>
                    <div className="h-7 w-5 rounded animate-pulse bg-muted" />
                  </div>
                  <div className="flex items-center justify-between w-full gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-[22px] h-[22px] rounded animate-pulse bg-muted" />
                      <div className="h-5 w-32 rounded animate-pulse bg-muted" />
                    </div>
                    <div className="h-7 w-5 rounded animate-pulse bg-muted" />
                  </div>
                </div>
              ) : barca === null ? (
                <p className="text-sm text-muted-foreground">No recent results — check back next season.</p>
              ) : (
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${RESULT_TONE[barca.result]}`}>{barca.result}</span>
                    <p className="text-sm text-muted-foreground">{barca.league}</p>
                  </div>
                  {/* Home team */}
                  <div className="flex items-center justify-between w-full gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {(barca.barcaHome ? barca.barcaLogo : barca.oppLogo) && (
                        <Image src={(barca.barcaHome ? barca.barcaLogo : barca.oppLogo)!} alt="" width={22} height={22} className="object-contain shrink-0" />
                      )}
                      <p className="text-base font-medium text-foreground/90 truncate">
                        {barca.barcaHome ? 'FC Barcelona' : barca.opponent}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-foreground shrink-0">
                      {barca.barcaHome ? barca.barcaScore : barca.oppScore}
                    </p>
                  </div>
                  {/* Away team */}
                  <div className="flex items-center justify-between w-full gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {(barca.barcaHome ? barca.oppLogo : barca.barcaLogo) && (
                        <Image src={(barca.barcaHome ? barca.oppLogo : barca.barcaLogo)!} alt="" width={22} height={22} className="object-contain shrink-0" />
                      )}
                      <p className="text-base font-medium text-foreground/90 truncate">
                        {barca.barcaHome ? barca.opponent : 'FC Barcelona'}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-foreground shrink-0">
                      {barca.barcaHome ? barca.oppScore : barca.barcaScore}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Form, next fixture and league position */}
            {barca && (barca.form?.length || barca.next || barca.position) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-border !mt-auto">
                {barca.form && barca.form.length > 0 && (
                  <div>
                    <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Last {barca.form.length}</p>
                    <div className="flex gap-1">
                      {barca.form.map((m, i) => (
                        <span
                          key={i}
                          title={`${m.score} vs ${m.opponent}`}
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono font-bold ${RESULT_TONE[m.result]}`}
                        >
                          {m.result}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {barca.next && (
                  <div className="min-w-0">
                    <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Next up</p>
                    <div className="flex items-center gap-2 min-w-0">
                      {barca.next.oppLogo && (
                        <Image src={barca.next.oppLogo} alt="" width={22} height={22} className="object-contain shrink-0" />
                      )}
                      <p className="text-base font-medium text-foreground/90 truncate">
                        {barca.next.barcaHome ? 'vs' : 'at'} {barca.next.opponent}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{formatKickoff(barca.next.date)}</p>
                  </div>
                )}
                {barca.position && (
                  <div>
                    <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">La Liga</p>
                    <p className="text-base font-medium text-foreground/90">{ordinal(barca.position.rank)}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{barca.position.points} pts</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Gym / cut progress */}
        <CutProgress />

      </div>
    </SectionWrapper>
  )
}
