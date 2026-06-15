'use client'

import { useEffect, useState } from 'react'

interface Day {
  date: string
  count: number
}

// CSS variables are already full oklch(...) values, so use var() directly
const PALETTE = [
  'var(--muted)',
  'color-mix(in oklch, var(--muted-foreground) 50%, transparent)',
  'var(--muted-foreground)',
  'color-mix(in oklch, var(--foreground) 60%, transparent)',
  'var(--foreground)',
]

function getColor(count: number): string {
  if (count === 0) return PALETTE[0]
  if (count <= 2)  return PALETTE[1]
  if (count <= 5)  return PALETTE[2]
  if (count <= 9)  return PALETTE[3]
  return PALETTE[4]
}

function getMonthLabels(weeks: (Day | null)[][]): { label: string; col: number }[] {
  const labels: { label: string; col: number }[] = []
  let lastMonth = -1
  weeks.forEach((week, i) => {
    const firstReal = week.find((d) => d !== null) as Day | undefined
    if (!firstReal) return
    const month = new Date(firstReal.date).getMonth()
    if (month !== lastMonth) {
      labels.push({
        label: new Date(firstReal.date).toLocaleString('default', { month: 'short' }),
        col: i,
      })
      lastMonth = month
    }
  })
  return labels
}

export default function GitHubCalendar() {
  const [weeks, setWeeks] = useState<(Day | null)[][] | undefined>(undefined)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetch('/api/github')
      .then(r => r.json())
      .then(({ days }: { days: Day[] }) => {
        if (!days?.length) { setWeeks([]); return }
        // Align to Sun–Sat columns: pad the first week with nulls so day 0 lands on its correct weekday
        const firstDow = new Date(days[0].date).getDay() // 0=Sun … 6=Sat
        const padded: (Day | null)[] = [...Array(firstDow).fill(null), ...days]
        const grouped: (Day | null)[][] = []
        for (let i = 0; i < padded.length; i += 7) {
          grouped.push(padded.slice(i, i + 7))
        }
        setWeeks(grouped as Day[][])
        setTotal(days.reduce((sum, d) => sum + d.count, 0))
      })
      .catch(() => setWeeks([]))
  }, [])

  const CELL = 11
  const GAP = 3
  const LABEL_COL_W = 28  // logical units for the day-label column inside the SVG
  const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

  const monthLabels = weeks?.length ? getMonthLabels(weeks) : []

  if (weeks === undefined) {
    return (
      <div className="w-full">
        <div className="text-base text-muted-foreground mb-3 font-mono opacity-0 select-none" aria-hidden>
          0 contributions in the last year
        </div>
        <div className="overflow-x-auto -mx-1 px-1 pb-3">
          <div
            className="animate-pulse bg-muted rounded-lg w-full"
            style={{ aspectRatio: '53 / 8' }}
          />
        </div>
      </div>
    )
  }

  if (!weeks.length) {
    return (
      <div className="w-full">
        <div className="text-base text-muted-foreground mb-3 font-mono">
          GitHub activity unavailable
        </div>
        <div className="overflow-x-auto -mx-1 px-1 pb-3">
          <div
            className="bg-muted rounded-lg w-full opacity-30"
            style={{ aspectRatio: '53 / 8' }}
          />
        </div>
      </div>
    )
  }

  const gridW = weeks.length * (CELL + GAP) - GAP
  const gridH = 7 * (CELL + GAP) - GAP
  const MONTH_ROW_H = 20
  // Total viewBox: day-label column + gap + grid columns
  const totalW = LABEL_COL_W + 4 + gridW
  const totalH = MONTH_ROW_H + gridH

  return (
    <div className="w-full">
      <div className="text-base text-muted-foreground mb-3 font-mono">
        {total.toLocaleString()} contributions in the last year
      </div>
      <div className="overflow-x-auto -mx-1 px-1 pb-3">
      <svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        style={{ display: 'block', minWidth: `${totalW * 1.4}px`, width: '100%' }}
      >
        {/* Day labels */}
        {DAY_LABELS.map((label, i) => (
          <text
            key={i}
            x={LABEL_COL_W - 2}
            y={MONTH_ROW_H + i * (CELL + GAP) + CELL / 2 + 3}
            textAnchor="end"
            fontSize={8}
            className="fill-muted-foreground font-mono"
            style={{ fontFamily: 'monospace' }}
            fill="var(--muted-foreground)"
          >
            {label}
          </text>
        ))}

        {/* Month labels */}
        {monthLabels.map(({ label, col }) => (
          <text
            key={label + col}
            x={LABEL_COL_W + 4 + col * (CELL + GAP)}
            y={MONTH_ROW_H - 6}
            fontSize={8}
            fill="var(--muted-foreground)"
            style={{ fontFamily: 'monospace' }}
          >
            {label}
          </text>
        ))}

        {/* Cells */}
        {weeks.map((week, wi) =>
          week.map((day, di) =>
            day === null ? null : (
              <rect
                key={day.date}
                x={LABEL_COL_W + 4 + wi * (CELL + GAP)}
                y={MONTH_ROW_H + di * (CELL + GAP)}
                width={CELL}
                height={CELL}
                rx={2}
                fill={getColor(day.count)}
              >
                <title>{day.date}: {day.count} contribution{day.count !== 1 ? 's' : ''}</title>
              </rect>
            )
          )
        )}
      </svg>
      </div>
    </div>
  )
}
