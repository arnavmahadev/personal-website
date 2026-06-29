declare module 'd3-geo' {
  export interface GeoProjection {
    (coordinates: [number, number]): [number, number] | null
    invert?: (point: [number, number]) => [number, number] | null
    scale(scale: number): this
    translate(point: [number, number]): this
  }

  export function geoNaturalEarth1(): GeoProjection

  export interface GeoPath {
    bounds(object: unknown): [[number, number], [number, number]]
  }

  export function geoPath(projection?: GeoProjection): GeoPath
}
