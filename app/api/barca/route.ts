import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const LEAGUES = ['esp.1', 'esp.copa_del_rey', 'uefa.champions']

function dateStr(d: Date) {
  return d.toISOString().slice(0, 10).replace(/-/g, '')
}

export async function GET() {
  try {
    const today = new Date()
    const past = new Date(today)
    past.setDate(past.getDate() - 120)
    const range = `${dateStr(past)}-${dateStr(today)}`

    const results = await Promise.all(
      LEAGUES.map(league =>
        fetch(
          `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard?dates=${range}`,
          { cache: 'no-store' }
        ).then(r => r.json())
      )
    )

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
      const rawLeague = results[i].leagues?.[0]?.name ?? LEAGUES[i]
      const leagueName = rawLeague.includes('LALIGA') ? 'La Liga' : rawLeague

      for (const event of events) {
        for (const comp of event.competitions ?? []) {
          if (!comp.status?.type?.completed) continue
          const competitors: Array<{ homeAway: string; team: { displayName: string; logo?: string }; score: string }> =
            comp.competitors ?? []
          const barcaTeam = competitors.find(t => t.team.displayName === 'Barcelona')
          if (!barcaTeam) continue
          const oppTeam = competitors.find(t => t.team.displayName !== 'Barcelona')!
          const barcaScore = barcaTeam.score
          const oppScore = oppTeam.score
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
            barcaLogo: barcaTeam.team.logo ?? null,
            oppLogo: oppTeam.team.logo ?? null,
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
