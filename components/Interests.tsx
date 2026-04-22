'use client'

import { useEffect, useState } from 'react'
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


export default function Interests() {
  const [barca, setBarca] = useState<BarcaResult | null>(null)
  const [val, setVal] = useState<ValorantRank | null>(null)

  useEffect(() => {
    fetch('/api/barca').then(r => r.json()).then(setBarca).catch(() => {})
    fetch('/api/valorant').then(r => r.json()).then(setVal).catch(() => {})
  }, [])

  return (
    <SectionWrapper id="interests">
      <h2 className="text-4xl sm:text-5xl font-bold font-serif tracking-tight text-foreground mb-5">
        Hobbies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-0 items-stretch">

        {/* Left column: Spotify + Valorant stacked */}
        <div className="flex flex-col gap-3">
          <div className="flex-1 flex flex-col">
            <NowPlaying />
          </div>

          {/* Valorant — moved here */}
          <div className="flex-1 rounded-xl border overflow-hidden relative bg-card border-border">
            <div className="px-4 py-4 h-full flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="sm:flex-1">
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Valorant</p>
                <p className="text-base text-foreground/80 leading-relaxed">
                  If I&apos;m not playing sports, I&apos;m probably playing video games with my friends.
                  We play Valorant most often. We lowkey suck, but that&apos;s beside the point.
                </p>
              </div>
              <div className="hidden sm:block w-px bg-border self-stretch flex-shrink-0" />
              <div className="sm:hidden h-px bg-border flex-shrink-0" />
              <div className="flex flex-col items-center text-center sm:flex-1 sm:items-center sm:justify-center">
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Current rank</p>
                {val ? (
                  <div className="flex items-center gap-4">
                    {val.icon && (
                      <Image src={val.icon} alt={val.rank} width={72} height={72} />
                    )}
                    <div>
                      <p className="text-2xl font-bold font-serif text-foreground">{val.rank}</p>
                      <p className="text-sm text-muted-foreground">{val.rr} RR</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-10 animate-pulse bg-muted rounded w-36" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Soccer / Barca */}
        <div className="rounded-xl border overflow-hidden relative bg-card border-border">
          <div className="px-4 py-6 h-full flex flex-col justify-center space-y-3">
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Soccer &amp; FC Barcelona</p>
            <p className="text-base text-foreground/80 leading-relaxed">
              I&apos;ve loved soccer since I was 4 and I played competitively until college.
              I was captain of both my club team and high school varsity team, and finished my senior year as the
              top goalscorer in my high school league: <span className="font-semibold text-foreground">17 goals, 5 assists</span>. You can still find me playing pickup or intramural games :)
            </p>
            <p className="text-base text-foreground/80 leading-relaxed">
              I&apos;ve been a Barça fan since age 4 because of my brother (although I&apos;ll never
              admit that to him). I catch most of their games, and honestly my mood heavily
              depends on the result. (jk… mostly.)
            </p>

            <div>
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">Latest result</p>
              {barca ? (
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                      barca.result === 'W' ? 'bg-green-500/15 text-green-500' :
                      barca.result === 'L' ? 'bg-red-500/15 text-red-500' :
                      'bg-muted text-muted-foreground'
                    }`}>{barca.result}</span>
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
              ) : (
                <div className="h-10 animate-pulse bg-muted rounded w-48" />
              )}
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  )
}
