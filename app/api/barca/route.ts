import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const LEAGUES = ['esp.1', 'esp.copa_del_rey', 'uefa.champions']

const BARCA_ID = '83'

// ESPN's scoreboard endpoint rejects date ranges, so read Barça's own schedule per competition.
function fetchSchedule(league: string, season?: number) {
  return fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/teams/${BARCA_ID}/schedule${season ? `?season=${season}` : ''}`,
    { cache: 'no-store' }
  ).then(r => r.json())
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
        const rawLeague: string = event.league?.name ?? LEAGUES[i]
        const leagueName = rawLeague.includes('LALIGA') ? 'La Liga' : rawLeague
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
            date: event.date.slice(0, 10),
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
    return NextResponse.json(matches[0])
  } catch {
    return NextResponse.json(null)
  }
}
