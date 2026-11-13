import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// ESPN team ids, used both in the schedule URL and to tell our side from the opponent.
const TEAMS: Record<string, { sport: string; id: string; name: string; league: string }> = {
  warriors: { sport: 'basketball/nba', id: '9', name: 'Golden State Warriors', league: 'NBA' },
  niners: { sport: 'football/nfl', id: '25', name: 'San Francisco 49ers', league: 'NFL' },
}

// Regular season and playoffs; preseason games are skipped.
const SEASON_TYPES = [2, 3]

type Competitor = {
  homeAway: string
  team: { id: string; displayName: string; shortDisplayName?: string; logos?: Array<{ href: string }> }
  score?: { displayValue: string }
}

type Event = {
  date: string
  seasonType?: { type?: number }
  competitions?: Array<{
    status?: { type?: { state?: string; completed?: boolean } }
    competitors?: Competitor[]
  }>
}

type Schedule = {
  events?: Event[]
  requestedSeason?: { year?: number }
  team?: { recordSummary?: string; standingSummary?: string }
}

function fetchSchedule(sport: string, id: string, seasonType: number, season?: number): Promise<Schedule> {
  const query = `seasontype=${seasonType}${season ? `&season=${season}` : ''}`
  return fetch(`https://site.api.espn.com/apis/site/v2/sports/${sport}/teams/${id}/schedule?${query}`, {
    cache: 'no-store',
  })
    .then(r => r.json())
    .catch(() => ({}))
}

function sides(event: Event, id: string) {
  const comp = event.competitions?.[0]
  const competitors = comp?.competitors ?? []
  const us = competitors.find(t => t.team.id === id)
  const them = competitors.find(t => t.team.id !== id)
  return { comp, us, them }
}

export async function GET(_req: Request, { params }: { params: { team: string } }) {
  const team = TEAMS[params.team]
  if (!team) return NextResponse.json(null, { status: 404 })

  try {
    const current = await Promise.all(SEASON_TYPES.map(t => fetchSchedule(team.sport, team.id, t)))
    const hasPlayed = (schedules: Schedule[]) =>
      schedules.some(s => (s.events ?? []).some(e => sides(e, team.id).comp?.status?.type?.completed))

    // In the offseason the new season has no results yet, so show last season's.
    let past = current
    if (!hasPlayed(current)) {
      const year = current.find(s => s.requestedSeason?.year)?.requestedSeason?.year
      if (year) past = await Promise.all(SEASON_TYPES.map(t => fetchSchedule(team.sport, team.id, t, year - 1)))
    }

    const games = []
    for (const event of past.flatMap(s => s.events ?? [])) {
      const { comp, us, them } = sides(event, team.id)
      if (!comp?.status?.type?.completed || !us?.score || !them?.score) continue
      const ours = parseInt(us.score.displayValue)
      const theirs = parseInt(them.score.displayValue)
      games.push({
        date: event.date,
        opponent: them.team.displayName,
        teamScore: us.score.displayValue,
        oppScore: them.score.displayValue,
        home: us.homeAway === 'home',
        league: event.seasonType?.type === 3 ? `${team.league} Playoffs` : team.league,
        result: (ours > theirs ? 'W' : ours < theirs ? 'L' : 'T') as 'W' | 'L' | 'T',
        teamLogo: us.team.logos?.[0]?.href ?? null,
        oppLogo: them.team.logos?.[0]?.href ?? null,
      })
    }

    if (!games.length) return NextResponse.json(null)
    games.sort((a, b) => b.date.localeCompare(a.date))
    const latest = games[0]

    // The soonest game that hasn't tipped off / kicked off yet.
    let next = null
    for (const event of current.flatMap(s => s.events ?? [])) {
      const { comp, us, them } = sides(event, team.id)
      if (comp?.status?.type?.state !== 'pre' || !us || !them) continue
      if (new Date(event.date).getTime() < Date.now()) continue
      if (next && event.date >= next.date) continue
      next = {
        date: event.date,
        // "Spurs" rather than "San Antonio Spurs": the next-up column is narrow.
        opponent: them.team.shortDisplayName ?? them.team.displayName,
        oppLogo: them.team.logos?.[0]?.href ?? null,
        home: us.homeAway === 'home',
      }
    }

    // The regular-season schedule carries the record and division standing,
    // e.g. "8-4" and "2nd in Pacific Division" (shortened to "2nd in Pacific").
    const summary = past[0]?.team
    const standing = summary?.recordSummary
      ? {
          label: 'Record',
          value: summary.recordSummary,
          detail: summary.standingSummary?.replace(/ Division$/, '') ?? null,
        }
      : null

    return NextResponse.json({
      ...latest,
      teamName: team.name,
      // Last five, oldest first, so the strip reads left to right.
      form: games.slice(0, 5).reverse().map(g => ({
        result: g.result,
        opponent: g.opponent,
        score: `${g.teamScore}–${g.oppScore}`,
      })),
      next,
      standing,
    })
  } catch {
    return NextResponse.json(null)
  }
}
