import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const NAME = 'MiniMessi4310'
const TAG = '4311'
const REGION = 'na'

export async function GET() {
  try {
    const [mmrRes, tiersRes] = await Promise.all([
      fetch(`https://api.kyroskoh.xyz/valorant/v1/mmr/${REGION}/${NAME}/${TAG}`, { next: { revalidate: 300 } }),
      fetch('https://valorant-api.com/v1/competitivetiers', { next: { revalidate: 86400 } }),
    ])

    const text = await mmrRes.text()
    const match = text.trim().match(/^(.+?)\s*-\s*(\d+)RR$/)
    if (!match) return NextResponse.json(null)

    const rank = match[1].trim()  // e.g. "Gold 1"
    const rr = parseInt(match[2])

    // Find the icon for this rank
    const tiersData = await tiersRes.json()
    const latestTiers: Array<{ tierName: string; largeIcon: string }> =
      tiersData.data?.at(-1)?.tiers ?? []
    const tierEntry = latestTiers.find(
      t => t.tierName.toLowerCase() === rank.toLowerCase()
    )

    return NextResponse.json({
      rank,
      rr,
      icon: tierEntry?.largeIcon ?? null,
    })
  } catch {
    return NextResponse.json(null)
  }
}
