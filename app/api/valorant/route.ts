import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const NAME = 'MiniMessi4310'
const TAG = '4311'
const REGION = 'na'

const RANK_KEY = 'valorant:rank' // last-known-good value, only overwritten on a successful fetch
const CHECK_KEY = 'valorant:checked' // presence acts as "refreshed recently, skip upstream"

const PERSIST_TTL = 60 * 60 * 24 * 30 // keep the last-known-good rank for 30 days
const REFRESH_TTL = 60 * 60 * 24 // only re-hit the upstream API once a day
const RETRY_TTL = 60 * 30 // after a failed refresh, back off for 30 min before retrying

interface ValorantRank {
  rank: string
  rr: number
  icon: string | null
}

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

// Pull the live rank from the upstream API. Returns null if it's unreachable
// or the response can't be parsed into a rank.
async function fetchRank(): Promise<ValorantRank | null> {
  const [mmrRes, tiersRes] = await Promise.all([
    fetch(`https://api.kyroskoh.xyz/valorant/v1/mmr/${REGION}/${NAME}/${TAG}`),
    fetch('https://valorant-api.com/v1/competitivetiers', { next: { revalidate: 86400 } }),
  ])

  const text = await mmrRes.text()
  const match = text.trim().match(/^(.+?)\s*-\s*(\d+)RR$/)
  if (!match) return null

  const rank = match[1].trim()
  const rr = parseInt(match[2])

  const tiersData = await tiersRes.json()
  const latestTiers: Array<{ tierName: string; largeIcon: string }> =
    tiersData.data?.at(-1)?.tiers ?? []
  const tierEntry = latestTiers.find(
    t => t.tierName.toLowerCase() === rank.toLowerCase()
  )

  return { rank, rr, icon: tierEntry?.largeIcon ?? null }
}

export async function GET() {
  let cached: ValorantRank | null = null
  let checkedRecently = false

  try {
    const [rankRaw, checkRaw] = await Promise.all([
      redisGet(RANK_KEY),
      redisGet(CHECK_KEY),
    ])
    if (rankRaw) cached = JSON.parse(rankRaw)
    checkedRecently = checkRaw !== null
  } catch {}

  // Already refreshed within the freshness window — serve cache, leave upstream alone.
  if (checkedRecently) {
    return NextResponse.json(cached)
  }

  // Freshness window elapsed (or nothing cached yet) — try to refresh.
  try {
    const fresh = await fetchRank()
    if (fresh) {
      await redisSet(RANK_KEY, JSON.stringify(fresh), PERSIST_TTL)
      await redisSet(CHECK_KEY, '1', REFRESH_TTL)
      return NextResponse.json(fresh)
    }
  } catch {}

  // Upstream is down or unparseable. Back off so we don't retry on every request,
  // and keep serving the last-known-good rank (which survives for 30 days).
  try {
    await redisSet(CHECK_KEY, '1', RETRY_TTL)
  } catch {}
  return NextResponse.json(cached)
}
