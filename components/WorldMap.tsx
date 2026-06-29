'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'

const GEO_URL = '/world-110m.json'
const MIN_ZOOM = 1
const MAX_ZOOM = 8

const MAP_WIDTH = 800
const MAP_HEIGHT = 480
const MAP_SCALE = 155

// Projection mirroring the <ComposableMap> config, used to clamp panning so the
// viewport can never show empty space beyond the edges of the world.
const projection = geoNaturalEarth1()
  .scale(MAP_SCALE)
  .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2])
// Projected bounding box of the whole globe in SVG coordinates.
const [[BOUNDS_X0, BOUNDS_Y0], [BOUNDS_X1, BOUNDS_Y1]] = geoPath(projection).bounds({
  type: 'Sphere',
})

// Clamp a value into [lo, hi]; if the viewport is larger than the content
// (lo > hi), center it instead.
function clampValue(value: number, lo: number, hi: number) {
  if (lo > hi) return (lo + hi) / 2
  return Math.max(lo, Math.min(hi, value))
}

// Clamp a [lon, lat] center for the given zoom so the viewport stays inside the
// projected world bounds (no blank space at any zoom level).
function clampCenter(center: [number, number], zoom: number): [number, number] {
  const projected = projection(center)
  if (!projected) return center
  const halfW = MAP_WIDTH / 2 / zoom
  const halfH = MAP_HEIGHT / 2 / zoom
  const x = clampValue(projected[0], BOUNDS_X0 + halfW, BOUNDS_X1 - halfW)
  const y = clampValue(projected[1], BOUNDS_Y0 + halfH, BOUNDS_Y1 - halfH)
  return (projection.invert?.([x, y]) as [number, number]) ?? center
}

type MapMarker = {
  id: string
  label: string
  description: string
  coordinates: [number, number]
  type: 'past' | 'upcoming'
}

type Tooltip = {
  x: number
  y: number
  marker: MapMarker
} | null

export default function WorldMap({ markers }: { markers: MapMarker[] }) {
  const [tooltip, setTooltip] = useState<Tooltip>(null)
  const [zoom, setZoom] = useState(1)
  const [center, setCenter] = useState<[number, number]>([0, 0])
  const containerRef = useRef<HTMLDivElement>(null)

  // Latest view kept in a ref so the (effect-bound) wheel handler reads fresh values.
  const viewRef = useRef({ zoom, center })
  viewRef.current = { zoom, center }

  // Programmatic zoom (wheel/buttons) bypasses d3-zoom's translateExtent, so we
  // re-clamp the center ourselves to keep the viewport inside the world bounds.
  const applyZoom = useCallback((nextZoom: number) => {
    const z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom))
    setZoom(z)
    setCenter((c) => clampCenter(c, z))
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      // Always block ZoomableGroup from seeing wheel events
      e.stopPropagation()
      if (e.metaKey || e.ctrlKey) {
        // Cmd+scroll (Mac) or Ctrl+scroll (Windows) → zoom map
        e.preventDefault()
        const factor = e.deltaY < 0 ? 1.06 : 1 / 1.06
        applyZoom(viewRef.current.zoom * factor)
      }
      // Otherwise event propagation is stopped but default (page scroll) still happens
    }
    el.addEventListener('wheel', handler, { capture: true, passive: false })
    return () => el.removeEventListener('wheel', handler, { capture: true })
  }, [applyZoom])

  return (
    <div ref={containerRef} className="relative w-full rounded-xl overflow-hidden border border-border bg-card">
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 155, translate: [400, 240] }}
        width={800}
        height={480}
        style={{ width: '100%', height: 'auto' }}
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          translateExtent={[[BOUNDS_X0, BOUNDS_Y0], [BOUNDS_X1, BOUNDS_Y1]]}
          onMoveEnd={({ zoom: z, coordinates }) => {
            setZoom(z)
            setCenter(clampCenter(coordinates, z))
          }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: import('react-simple-maps').GeoFeature[] }) =>
              geographies.map((geo: import('react-simple-maps').GeoFeature) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: 'var(--muted)', stroke: 'var(--border)', strokeWidth: 0.4 / zoom, outline: 'none' },
                    hover:   { fill: 'var(--muted)', stroke: 'var(--border)', strokeWidth: 0.4 / zoom, outline: 'none' },
                    pressed: { fill: 'var(--muted)', stroke: 'var(--border)', strokeWidth: 0.4 / zoom, outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {markers.map((m) => (
            <Marker
              key={m.id}
              coordinates={m.coordinates}
              onMouseEnter={(e: React.MouseEvent<SVGGElement>) => {
                const svgEl = (e.target as SVGElement).closest('svg') as SVGSVGElement | null
                if (!svgEl) return
                const rect = svgEl.getBoundingClientRect()
                const pt = svgEl.createSVGPoint()
                pt.x = e.clientX
                pt.y = e.clientY
                const svgPt = pt.matrixTransform(svgEl.getScreenCTM()!.inverse())
                setTooltip({
                  x: (svgPt.x / svgEl.viewBox.baseVal.width) * rect.width,
                  y: (svgPt.y / svgEl.viewBox.baseVal.height) * rect.height,
                  marker: m,
                })
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              <circle
                r={(m.type === 'upcoming' ? 5.5 : 4.5) / zoom}
                fill={m.type === 'upcoming' ? 'var(--marker-upcoming, var(--secondary))' : 'var(--primary)'}
                stroke="var(--background)"
                strokeWidth={1.5 / zoom}
                className="cursor-pointer"
              />
              {m.type === 'upcoming' && (
                <circle
                  r={10 / zoom}
                  fill="none"
                  stroke="var(--marker-upcoming, var(--secondary))"
                  strokeWidth={1.5 / zoom}
                  opacity={0.5}
                  className="animate-ping"
                />
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 bg-popover border border-border rounded-lg px-3 py-2 shadow-lg text-sm max-w-[200px] -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y - 12 }}
        >
          <p className="font-semibold text-foreground">{tooltip.marker.label}</p>
          <p className="text-muted-foreground text-xs mt-0.5 leading-snug">{tooltip.marker.description}</p>
          {tooltip.marker.type === 'upcoming' && (
            <span className="inline-block mt-1 text-[10px] font-mono uppercase tracking-widest text-primary">
              upcoming
            </span>
          )}
        </div>
      )}

      {/* Zoom buttons */}
      <div className="absolute top-2 left-3 flex flex-col gap-1">
        <button
          onClick={() => applyZoom(viewRef.current.zoom * 2)}
          className="w-7 h-7 rounded border border-border bg-card text-foreground text-lg leading-none flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Zoom in"
        >+</button>
        <button
          onClick={() => applyZoom(viewRef.current.zoom / 2)}
          className="w-7 h-7 rounded border border-border bg-card text-foreground text-lg leading-none flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Zoom out"
        >−</button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 right-3 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /> visited
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: 'var(--marker-upcoming, var(--secondary))' }} /> upcoming
        </span>
      </div>
    </div>
  )
}
