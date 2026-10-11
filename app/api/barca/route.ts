import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const LEAGUES = ['esp.1', 'esp.copa_del_rey', 'uefa.champions']

const BARCA_ID = '83'

// ESPN's scoreboard endpoint rejects date ranges, so read Barça's own schedule per competition.
function fetchSchedule(league: string, season?: number, fixtures = false) {
  const query = fixtures ? '?fixture=true' : season ? `?season=${season}` : ''
  return fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/teams/${BARCA_ID}/schedule${query}`,
    { cache: 'no-store' }
  ).then(r => r.json())
}

function leagueLabel(raw: string) {
  return raw.includes('LALIGA') ? 'La Liga' : raw
}

// The soonest match that hasn't kicked off yet, across all competitions.
async function fetchNext() {
  const results = await Promise.all(LEAGUES.map(league => fetchSchedule(league, undefined, true).catch(() => null)))
  let next: { date: string; opponent: string; oppLogo: string | null; barcaHome: boolean; league: string } | null = null

  for (let i = 0; i < LEAGUES.length; i++) {
    for (const event of results[i]?.events ?? []) {
      const comp = event.competitions?.[0]
      if (comp?.status?.type?.state !== 'pre') continue
      if (new Date(event.date).getTime() < Date.now()) continue
      if (next && event.date >= next.date) continue
      const competitors: Array<{ homeAway: string; team: { id: string; displayName: string; logos?: Array<{ href: string }> } }> =
        comp.competitors ?? []
      const barcaTeam = competitors.find(t => t.team.id === BARCA_ID)
      const oppTeam = competitors.find(t => t.team.id !== BARCA_ID)
      if (!barcaTeam || !oppTeam) continue
      next = {
        date: event.date,
        opponent: oppTeam.team.displayName,
        oppLogo: oppTeam.team.logos?.[0]?.href ?? null,
        barcaHome: barcaTeam.homeAway === 'home',
        league: leagueLabel(event.league?.name ?? LEAGUES[i]),
      }
    }
  }
  return next
}

// Barça's current place in the La Liga table.
async function fetchPosition() {
  const data = await fetch('https://site.api.espn.com/apis/v2/sports/soccer/esp.1/standings', { cache: 'no-store' }).then(r => r.json())
  const entries: Array<{ team?: { id?: string }; stats?: Array<{ name: string; value?: number }> }> =
    data.children?.[0]?.standings?.entries ?? []
  const entry = entries.find(e => e.team?.id === BARCA_ID)
  const stat = (name: string) => entry?.stats?.find(s => s.name === name)?.value
  const rank = stat('rank')
  const points = stat('points')
  if (rank === undefined || points === undefined) return null
  return { rank, points }
}

export async function GET() {
  try {
    let results = await Promise.all(LEAGUES.map(league => fetchSchedule(league)))

    // Before the first match of a new season, fall back to last season's results.
    const played = (r: { events?: Array<{ competitions?: Array<{ status?: { type?: { completed?: boolean } } }> }> }) =>
      (r.events ?? []).some(e => (e.competitions ?? []).some(c => c.status?.type?.completed))
    if (!results.some(played)) {
      const year = results.find(r => r.season?.year)?.season.year
      if (year) results = await Promise.all(LEAGUES.map(league => fetchSchedule(league, year - 1)))
    }

    type Match = {
      date: string
      opponent: string
      barcaScore: string
      oppScore: string
      barcaHome: boolean
      result: 'W' | 'L' | 'D'
      league: string
      barcaLogo: string | null
      oppLogo: string | null
    }

    const matches: Match[] = []

    for (let i = 0; i < LEAGUES.length; i++) {
      const events = results[i].events ?? []
      for (const event of events) {
        const leagueName = leagueLabel(event.league?.name ?? LEAGUES[i])
        for (const comp of event.competitions ?? []) {
          if (!comp.status?.type?.completed) continue
          const competitors: Array<{
            homeAway: string
            team: { id: string; displayName: string; logos?: Array<{ href: string }> }
            score?: { displayValue: string }
          }> = comp.competitors ?? []
          const barcaTeam = competitors.find(t => t.team.id === BARCA_ID)
          const oppTeam = competitors.find(t => t.team.id !== BARCA_ID)
          if (!barcaTeam?.score || !oppTeam?.score) continue
          const barcaScore = barcaTeam.score.displayValue
          const oppScore = oppTeam.score.displayValue
          const bg = parseInt(barcaScore)
          const og = parseInt(oppScore)
          matches.push({
            date: event.date,
            opponent: oppTeam.team.displayName,
            barcaScore,
            oppScore,
            barcaHome: barcaTeam.homeAway === 'home',
            result: bg > og ? 'W' : bg < og ? 'L' : 'D',
            league: leagueName,
            barcaLogo: barcaTeam.team.logos?.[0]?.href ?? null,
            oppLogo: oppTeam.team.logos?.[0]?.href ?? null,
          })
        }
      }
    }

    if (!matches.length) return NextResponse.json(null)

    matches.sort((a, b) => b.date.localeCompare(a.date))

    // The extras are optional: if either lookup fails the latest result still shows.
    const [next, position] = await Promise.all([
      fetchNext().catch(() => null),
      fetchPosition().catch(() => null),
    ])

    return NextResponse.json({
      ...matches[0],
      // Last five, oldest first, so the strip reads left to right.
      form: matches.slice(0, 5).reverse().map(m => ({
        result: m.result,
        opponent: m.opponent,
        score: `${m.barcaScore}–${m.oppScore}`,
      })),
      next,
      position,
    })
  } catch {
    return NextResponse.json(null)
  }
}
