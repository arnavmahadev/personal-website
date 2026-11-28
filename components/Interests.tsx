'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import SectionWrapper from './ui/SectionWrapper'
import NowPlaying from './ui/NowPlaying'
import CutProgress from './ui/CutProgress'
import Sparkline from './ui/Sparkline'
import TeamCard, { type TeamResult } from './ui/TeamCard'

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

function ordinal(n: number) {
  const suffix = n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'
  return `${n}${suffix}`
}

// Reshape the /api/barca payload into the shape TeamCard shares with the other teams.
function fromBarca(b: BarcaResult | null): TeamResult | null {
  if (!b) return null
  return {
    teamName: 'FC Barcelona',
    opponent: b.opponent,
    teamScore: b.barcaScore,
    oppScore: b.oppScore,
    home: b.barcaHome,
    result: b.result,
    league: b.league,
    date: b.date,
    teamLogo: b.barcaLogo,
    oppLogo: b.oppLogo,
    form: b.form,
    next: b.next && { date: b.next.date, opponent: b.next.opponent, oppLogo: b.next.oppLogo, home: b.next.barcaHome },
    standing: b.position && { label: 'La Liga', value: ordinal(b.position.rank), detail: `${b.position.points} pts` },
  }
}

function loadJson<T>(url: string, set: (v: T | null) => void) {
  fetch(url).then(r => r.json()).then(set).catch(() => set(null))
}

interface ValorantRank {
  rank: string
  rr: number
  icon: string | null
  trend?: number[]
}



export default function Interests() {
  const [barca, setBarca] = useState<TeamResult | null | undefined>(undefined)
  const [warriors, setWarriors] = useState<TeamResult | null | undefined>(undefined)
  const [niners, setNiners] = useState<TeamResult | null | undefined>(undefined)
  const [val, setVal] = useState<ValorantRank | null | undefined>(undefined)

  useEffect(() => {
    loadJson<BarcaResult>('/api/barca', b => setBarca(fromBarca(b)))
    loadJson<TeamResult>('/api/team/warriors', setWarriors)
    loadJson<TeamResult>('/api/team/niners', setNiners)
    loadJson<ValorantRank>('/api/valorant', setVal)
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
          <div className="flex-1 rounded-xl border overflow-hidden relative bg-card border-border">
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
        <TeamCard
          title="Soccer & FC Barcelona"
          stripe="repeating-linear-gradient(90deg, #004D98 0 28px, #A50044 28px 56px)"
          data={barca}
          emptyText="No recent results — check back next season."
        >
          <p className="text-base text-foreground/80 leading-relaxed">
            I&apos;ve loved soccer since I was 4 and I played competitively until college.
            I was captain of both my club team and high school varsity team, made the all league first team all 4 years of high school, and finished with <span className="font-semibold text-foreground">45 goals and 20 assists</span> over 4 years. You can still find me playing pickup or intramural games :)
          </p>
          <p className="text-base text-foreground/80 leading-relaxed">
            I&apos;ve been a Barça fan since age 4 because of my older brother. I catch most of their games, and honestly my mood heavily
            depends on the result. (jk… mostly.)
          </p>
        </TeamCard>

        {/* Bay Area teams */}
        <TeamCard
          title="Golden State Warriors"
          stripe="repeating-linear-gradient(90deg, #1D428A 0 28px, #FFC72C 28px 56px)"
          data={warriors}
          emptyText="No recent games — check back next season."
        >
          <p className="text-base text-foreground/80 leading-relaxed">
            I grew up in the Bay, so I&apos;ve been a Warriors fan for as long as I can remember. I catch as
            many games as I can, and I recently went to the Heat game, where we got the dub.
          </p>
        </TeamCard>
        <TeamCard
          title="San Francisco 49ers"
          stripe="repeating-linear-gradient(90deg, #AA0000 0 28px, #B3995D 28px 56px)"
          data={niners}
          emptyText="No recent games — check back next season."
        >
          <p className="text-base text-foreground/80 leading-relaxed">
            Same story with the Niners. I try to watch every game, usually with my friends, but I&apos;ve
            never actually been to one. Still waiting on that sixth ring too.
          </p>
        </TeamCard>

        {/* Gym / cut progress */}
        <CutProgress />

      </div>
    </SectionWrapper>
  )
}
