import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL!
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!
const HEALTH_SECRET = process.env.HEALTH_SECRET!

function todayKey() {
  return `steps:${new Date().toISOString().slice(0, 10)}`
}

async function redisGet(key: string) {
  const res = await fetch(`${REDIS_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    cache: 'no-store',
  })
  const data = await res.json()
  return data.result
}

async function redisSet(key: string, value: string) {
  await fetch(`${REDIS_URL}/set/${key}/${value}`, {
    method: 'GET', // Upstash REST uses GET for set with inline value
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  })
}

export async function GET() {
  try {
    const steps = await redisGet(todayKey())
    return NextResponse.json({ steps: steps ? parseInt(steps) : null })
  } catch {
    return NextResponse.json({ steps: null })
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get('x-secret')
    if (auth !== HEALTH_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { steps } = await req.json()
    if (typeof steps !== 'number') {
      return NextResponse.json({ error: 'Invalid steps' }, { status: 400 })
    }

    await redisSet(todayKey(), String(Math.round(steps)))
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
