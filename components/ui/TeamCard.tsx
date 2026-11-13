import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'

export type GameResult = 'W' | 'L' | 'D' | 'T'

export interface TeamResult {
  teamName: string
  opponent: string
  teamScore: string
  oppScore: string
  home: boolean
  result: GameResult
  league: string
  date: string
  teamLogo: string | null
  oppLogo: string | null
  form?: Array<{ result: GameResult; opponent: string; score: string }>
  next?: { date: string; opponent: string; oppLogo: string | null; home: boolean } | null
  // Third footer column: league position, win–loss record, etc.
  standing?: { label: string; value: string; detail: string | null } | null
}

const RESULT_TONE: Record<GameResult, string> = {
  W: 'bg-green-500/15 text-green-500',
  L: 'bg-red-500/15 text-red-500',
  D: 'bg-muted text-muted-foreground',
  T: 'bg-muted text-muted-foreground',
}

// Game time in the visitor's own timezone, e.g. "Sat, Oct 17".
function formatKickoff(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function TeamRow({ logo, name, score }: { logo: string | null; name: string; score: string }) {
  return (
    <div className="flex items-center justify-between w-full gap-3">
      <div className="flex items-center gap-2 min-w-0">
        {logo && <Image src={logo} alt="" width={22} height={22} className="object-contain shrink-0" />}
        <p className="text-base font-medium text-foreground/90 truncate">{name}</p>
      </div>
      <p className="text-xl font-bold text-foreground shrink-0">{score}</p>
    </div>
  )
}

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between w-full gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-[22px] h-[22px] rounded animate-pulse bg-muted" />
        <div className="h-5 w-32 rounded animate-pulse bg-muted" />
      </div>
      <div className="h-7 w-5 rounded animate-pulse bg-muted" />
    </div>
  )
}

export default function TeamCard({
  title,
  stripe,
  data,
  emptyText,
  children,
}: {
  title: string
  // Background for the 3px accent bar along the top edge.
  stripe: CSSProperties['background']
  // undefined while loading, null when the lookup failed or there are no games.
  data: TeamResult | null | undefined
  emptyText: string
  children?: ReactNode
}) {
  const ours = data && { logo: data.teamLogo, name: data.teamName, score: data.teamScore }
  const theirs = data && { logo: data.oppLogo, name: data.opponent, score: data.oppScore }

  return (
    <div className="rounded-xl border overflow-hidden relative bg-card border-border">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px]" style={{ background: stripe }} />
      <div className="px-4 py-4 sm:py-4 h-full flex flex-col space-y-3">
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">{title}</p>
        {children}

        <div className="pb-3">
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">Latest result</p>
          {data === undefined ? (
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-7 rounded animate-pulse bg-muted" />
                <div className="h-4 w-28 rounded animate-pulse bg-muted" />
              </div>
              <SkeletonRow />
              <SkeletonRow />
            </div>
          ) : data === null ? (
            <p className="text-sm text-muted-foreground">{emptyText}</p>
          ) : (
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${RESULT_TONE[data.result]}`}>{data.result}</span>
                <p className="text-sm text-muted-foreground">{data.league}</p>
              </div>
              {/* Home team on top */}
              <TeamRow {...(data.home ? ours! : theirs!)} />
              <TeamRow {...(data.home ? theirs! : ours!)} />
            </div>
          )}
        </div>

        {/* Form, next game and standing */}
        {data && (data.form?.length || data.next || data.standing) && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-border !mt-auto">
            {data.form && data.form.length > 0 && (
              <div>
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Last {data.form.length}</p>
                <div className="flex gap-1">
                  {data.form.map((m, i) => (
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
            {data.next && (
              <div className="min-w-0">
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Next up</p>
                <div className="flex items-center gap-2 min-w-0">
                  {data.next.oppLogo && (
                    <Image src={data.next.oppLogo} alt="" width={22} height={22} className="object-contain shrink-0" />
                  )}
                  <p className="text-base font-medium text-foreground/90 truncate">
                    {data.next.home ? 'vs' : 'at'} {data.next.opponent}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{formatKickoff(data.next.date)}</p>
              </div>
            )}
            {data.standing && (
              <div className="min-w-0">
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">{data.standing.label}</p>
                <p className="text-base font-medium text-foreground/90">{data.standing.value}</p>
                {data.standing.detail && (
                  <p className="text-sm text-muted-foreground mt-0.5 truncate" title={data.standing.detail}>{data.standing.detail}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
