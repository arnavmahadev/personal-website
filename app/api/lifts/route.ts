import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const headers = { 'Cache-Control': 'public, s-maxage=60' }

export async function GET() {
  try {
    // "Publish to web" CSV link for a lifts tab: one lift per row as
    // name, starting weight, current weight. Header rows are skipped.
    const url = process.env.LIFTS_SHEET_CSV_URL
    if (!url) return NextResponse.json(null)

    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return NextResponse.json(null)

    const lifts = (await res.text())
      .split(/\r?\n/)
      .map(row => row.split(',').map(c => c.replace(/"/g, '').trim()))
      .map(([name, start, current]) => ({ name, start: parseFloat(start), current: parseFloat(current) }))
      .filter(l => l.name && Number.isFinite(l.start) && Number.isFinite(l.current))
      // Only the change from the starting weight leaves the server.
      .map(l => ({ name: l.name, change: Math.round((l.current - l.start) * 10) / 10 }))

    if (!lifts.length) return NextResponse.json(null)
    return NextResponse.json({ lifts }, { headers })
  } catch {
    return NextResponse.json(null)
  }
}
