import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const NAME = 'MiniMessi4310'
const TAG = '4311'
const REGION = 'na'
const CACHE_KEY = 'valorant:rank'
const CACHE_TTL = 600 // 10 minutes

async function redisGet(key: string): Promise<string | null> {
  const url = `${process.env.UPSTASH_REDIS_REST_URL}/get/${key}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
  })
  const data = await res.json()
  return data.result ?? null
}

async function redisSet(key: string, value: string, ttl: number) {
  const url = `${process.env.UPSTASH_REDIS_REST_URL}/set/${key}/${encodeURIComponent(value)}?EX=${ttl}`
  await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
  })
}

export async function GET() {
  try {
    const [mmrRes, tiersRes] = await Promise.all([
      fetch(`https://api.kyroskoh.xyz/valorant/v1/mmr/${REGION}/${NAME}/${TAG}`),
      fetch('https://valorant-api.com/v1/competitivetiers', { next: { revalidate: 86400 } }),
    ])

    const text = await mmrRes.text()
    const match = text.trim().match(/^(.+?)\s*-\s*(\d+)RR$/)

    if (match) {
      const rank = match[1].trim()
      const rr = parseInt(match[2])

      const tiersData = await tiersRes.json()
      const latestTiers: Array<{ tierName: string; largeIcon: string }> =
        tiersData.data?.at(-1)?.tiers ?? []
      const tierEntry = latestTiers.find(
        t => t.tierName.toLowerCase() === rank.toLowerCase()
      )

      const result = { rank, rr, icon: tierEntry?.largeIcon ?? null }
      await redisSet(CACHE_KEY, JSON.stringify(result), CACHE_TTL)
      return NextResponse.json(result)
    }

    // API failed — try cache
    const cached = await redisGet(CACHE_KEY)
    if (cached) return NextResponse.json(JSON.parse(cached))

    return NextResponse.json(null)
  } catch {
    try {
      const cached = await redisGet(CACHE_KEY)
      if (cached) return NextResponse.json(JSON.parse(cached))
    } catch {}
    return NextResponse.json(null)
  }
}
