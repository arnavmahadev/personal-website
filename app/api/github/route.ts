import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!
const USERNAME = 'arnavmahadev'

export async function GET() {
  try {
    const query = `
      query {
        user(login: "${USERNAME}") {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `

    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      cache: 'no-store',
    })

    const json = await res.json()
    const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks

    const days: { date: string; count: number }[] = weeks.flatMap(
      (w: { contributionDays: { date: string; contributionCount: number }[] }) =>
        w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
    )

    return NextResponse.json({ days })
  } catch {
    return NextResponse.json({ days: [] })
  }
}
