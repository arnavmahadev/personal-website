import { NextResponse } from 'next/server'

// Re-read the sheet at most once an hour.
export const revalidate = 3600

export async function GET() {
  try {
    // "Publish to web" CSV link: one weigh-in per row in column A, either as raw
    // weights or already as change-from-start (so the sheet never has to publish real weights).
    const url = process.env.WEIGHT_SHEET_CSV_URL
    if (!url) return NextResponse.json(null)

    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return NextResponse.json(null)

    const weights = (await res.text())
      .split(/\r?\n/)
      .map(row => parseFloat(row.split(',')[0].replace(/"/g, '')))
      .filter(w => Number.isFinite(w))

    if (weights.length < 2) return NextResponse.json(null)

    // Only the change from the first row leaves the server.
    const changes = weights.map(w => Math.round((w - weights[0]) * 10) / 10)
    return NextResponse.json({ changes })
  } catch {
    return NextResponse.json(null)
  }
}
