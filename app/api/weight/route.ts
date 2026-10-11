import { NextResponse } from 'next/server'

// Read the sheet on request rather than serving a prerendered copy, which kept
// showing old weigh-ins until someone's visit triggered a background refresh.
export const dynamic = 'force-dynamic'

// Let the CDN hold a response for a minute so a burst of visits is one sheet read.
const headers = { 'Cache-Control': 'public, s-maxage=60' }

export async function GET() {
  try {
    // "Publish to web" CSV link: one weigh-in per row in column A, either as raw
    // weights or already as change-from-start (so the sheet never has to publish real weights).
    // An optional goal sits in B1, in the same units as column A.
    const url = process.env.WEIGHT_SHEET_CSV_URL
    if (!url) return NextResponse.json(null)

    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return NextResponse.json(null)

    const cell = (row: string, col: number) => parseFloat((row.split(',')[col] ?? '').replace(/"/g, ''))
    const rows = (await res.text()).split(/\r?\n/).filter(row => Number.isFinite(cell(row, 0)))
    const weights = rows.map(row => cell(row, 0))

    if (weights.length < 2) return NextResponse.json(null)

    // Only the change from the first row leaves the server.
    const change = (w: number) => Math.round((w - weights[0]) * 10) / 10
    const goal = cell(rows[0], 1)
    return NextResponse.json(
      { changes: weights.map(change), goal: Number.isFinite(goal) ? change(goal) : null },
      { headers }
    )
  } catch {
    return NextResponse.json(null)
  }
}
