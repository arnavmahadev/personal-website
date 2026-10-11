'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { motion, useInView } from 'framer-motion'

// Signed pounds with a real minus sign, e.g. "−15.4" / "+0.6" / "0.0".
function formatChange(v: number) {
  const rounded = Math.round(v * 10) / 10
  const abs = Math.abs(rounded).toFixed(1)
  return rounded < 0 ? `−${abs}` : rounded > 0 ? `+${abs}` : abs
}

// Pick a round tick step that gives at most ~4 gridlines across the range.
function tickStep(span: number) {
  return [1, 2, 5, 10, 20, 50].find(s => span / s <= 4) ?? 100
}

function Chart({
  changes,
  goal,
  cardRef,
}: {
  changes: number[]
  goal: number | null
  cardRef: RefObject<HTMLDivElement>
}) {
  const [hover, setHover] = useState<number | null>(null)

  // The line draws once the whole widget is on screen. On screens too short to
  // ever fit the whole card, the plot itself being fully visible is enough.
  const plotRef = useRef<HTMLDivElement>(null)
  const cardInView = useInView(cardRef, { once: true, amount: 'all' })
  const plotInView = useInView(plotRef, { once: true, amount: 'all' })
  const [cardFits, setCardFits] = useState(true)
  useEffect(() => {
    setCardFits((cardRef.current?.offsetHeight ?? 0) <= window.innerHeight)
  }, [cardRef])
  const drawn = cardInView || (!cardFits && plotInView)

  const n = changes.length
  // The goal is part of the range so its line is always on the plot.
  const high = Math.max(...changes, goal ?? 0, 0)
  const low = Math.min(...changes, goal ?? 0, 0)
  const step = tickStep(high - low)
  const top = Math.ceil(high / step) * step
  const bottom = Math.floor(low / step) * step
  const ticks: number[] = []
  for (let t = top; t >= bottom; t -= step) ticks.push(t)

  // Positions as percentages of the plot box, so the SVG can stretch freely.
  const x = (i: number) => (i / (n - 1)) * 100
  const y = (v: number) => ((top - v) / (top - bottom)) * 100

  const line = changes.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ')
  const area = `${line} L100,100 L0,100 Z`

  const active = hover ?? n - 1

  function track(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const frac = (e.clientX - rect.left) / rect.width
    setHover(Math.max(0, Math.min(n - 1, Math.round(frac * (n - 1)))))
  }

  return (
    <div>
      <div className="flex">
        {/* Y axis labels */}
        <div className="relative w-9 shrink-0 h-36">
          {ticks.map(t => (
            <span
              key={t}
              className="absolute right-2 -translate-y-1/2 text-xs font-mono tabular-nums text-muted-foreground"
              style={{ top: `${y(t)}%` }}
            >
              {t === 0 ? '0' : formatChange(t).replace('.0', '')}
            </span>
          ))}
        </div>

        {/* Plot */}
        <div
          ref={plotRef}
          className="relative flex-1 h-36 touch-pan-y"
          onPointerMove={track}
          onPointerDown={track}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={`Line chart of weight change over ${n} days, currently ${formatChange(changes[n - 1])} pounds from the start.`}
        >
          {ticks.map(t => (
            <div key={t} className="absolute inset-x-0 h-px bg-border opacity-60" style={{ top: `${y(t)}%` }} />
          ))}

          {goal !== null && (
            <div className="absolute inset-x-0 border-t border-dashed border-accent" style={{ top: `${y(goal)}%` }}>
              <span className="absolute right-0 -top-5 text-xs font-mono uppercase tracking-widest text-accent">
                Goal
              </span>
            </div>
          )}

          {/* The line wipes in from the left, once */}
          <motion.svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full overflow-visible"
            // Both ends are in percentages: mixed units can't be interpolated, and the
            // wipe would start partway across instead of at the y axis.
            initial={{ clipPath: 'inset(-10% 100% -10% -5%)' }}
            animate={drawn ? { clipPath: 'inset(-10% -5% -10% -5%)' } : undefined}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          >
            <path d={area} fill="var(--primary)" opacity={0.1} />
            <path
              d={line}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </motion.svg>

          {hover !== null && (
            <div className="absolute inset-y-0 w-px bg-muted-foreground opacity-60" style={{ left: `${x(hover)}%` }} />
          )}

          {/* Marker on the latest weigh-in, or on the hovered one */}
          <motion.div
            className="absolute w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-primary ring-2 ring-card"
            style={{ left: `${x(active)}%`, top: `${y(changes[active])}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={drawn ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.3, delay: 1.5 }}
          />

          {hover !== null && (
            <div
              className="pointer-events-none absolute z-10 bg-popover border border-border rounded-lg px-2.5 py-1.5 shadow-lg whitespace-nowrap"
              // Sit beside the crosshair, flipping sides at the midpoint, and drop
              // below the point when it is near the top so the card title stays clear.
              style={{
                left: `${x(hover)}%`,
                top: `${y(changes[hover])}%`,
                transform: `translate(${hover > n / 2 ? 'calc(-100% - 8px)' : '8px'}, ${
                  y(changes[hover]) < 40 ? '10px' : 'calc(-100% - 10px)'
                })`,
              }}
            >
              <p className="text-sm font-semibold tabular-nums text-foreground">{formatChange(changes[hover])} lb</p>
              <p className="text-xs text-muted-foreground">Day {hover + 1}</p>
            </div>
          )}
        </div>
      </div>

      {/* X axis labels */}
      <div className="flex justify-between pl-9 mt-1.5 text-xs font-mono text-muted-foreground">
        <span>Start</span>
        <span>Day {n}</span>
      </div>
    </div>
  )
}

interface Lift {
  name: string
  change: number
}

export default function CutProgress() {
  const [data, setData] = useState<{ changes: number[]; goal?: number | null } | null | undefined>(undefined)
  const [lifts, setLifts] = useState<Lift[] | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/weight').then(r => r.json()).then(setData).catch(() => setData(null))
    fetch('/api/lifts').then(r => r.json()).then(d => setLifts(d?.lifts ?? null)).catch(() => {})
  }, [])

  const latest = data ? data.changes[data.changes.length - 1] : null
  const goal = data?.goal ?? null
  // Works for a cut (negative goal) or a bulk (positive goal).
  const toGo = goal !== null && latest !== null ? Math.abs(goal - latest) : null
  const reached = goal !== null && latest !== null && (goal <= 0 ? latest <= goal : latest >= goal)

  return (
    <div ref={cardRef} className="sm:col-span-2 rounded-xl border overflow-hidden relative bg-card border-border card-glow">
      <div className="px-4 py-4 flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="sm:w-1/3 flex flex-col gap-3">
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Gym</p>
          <p className="text-base text-foreground/80 leading-relaxed">
            I lift regularly and I&apos;m currently on a cut. I log every weigh-in, and this graph updates as I do.
          </p>
          <div>
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">Since the start</p>
            {data === undefined ? (
              <div className="h-9 w-28 rounded animate-pulse bg-muted" />
            ) : latest === null ? (
              <p className="text-sm text-muted-foreground">Progress unavailable.</p>
            ) : (
              <>
                <p className="text-3xl font-bold font-serif tabular-nums text-foreground">
                  {formatChange(latest)}{' '}
                  <span className="text-lg font-medium text-muted-foreground">lb</span>
                </p>
                {toGo !== null && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {reached ? 'Goal reached.' : `${toGo.toFixed(1)} lb to go.`}
                  </p>
                )}
              </>
            )}
          </div>
          {lifts && (
            <div>
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">Lifts</p>
              <ul className="space-y-0.5">
                {lifts.map(lift => (
                  <li key={lift.name} className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-foreground/80">{lift.name}</span>
                    <span className="font-mono tabular-nums text-foreground">{formatChange(lift.change)} lb</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="sm:flex-1 min-w-0">
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">Weight change (lb)</p>
          {data === undefined ? (
            <div className="h-36 rounded animate-pulse bg-muted" />
          ) : data === null ? (
            <div className="h-36 flex items-center justify-center rounded border border-dashed border-border">
              <p className="text-sm text-muted-foreground">No weigh-ins to show yet.</p>
            </div>
          ) : (
            <Chart changes={data.changes} goal={goal} cardRef={cardRef} />
          )}
        </div>
      </div>
    </div>
  )
}
