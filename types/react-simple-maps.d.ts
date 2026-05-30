declare module 'react-simple-maps' {
  import { ComponentProps, ReactNode, SVGProps } from 'react'

  export interface ComposableMapProps {
    projection?: string
    projectionConfig?: Record<string, unknown>
    width?: number
    height?: number
    style?: React.CSSProperties
    children?: ReactNode
  }
  export function ComposableMap(props: ComposableMapProps): JSX.Element

  export interface GeographiesProps {
    geography: string | object
    children: (args: { geographies: GeoFeature[] }) => ReactNode
  }
  export interface GeoFeature {
    rsmKey: string
    [key: string]: unknown
  }
  export function Geographies(props: GeographiesProps): JSX.Element

  export interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: GeoFeature
    style?: {
      default?: React.CSSProperties
      hover?: React.CSSProperties
      pressed?: React.CSSProperties
    }
  }
  export function Geography(props: GeographyProps): JSX.Element

  export interface MarkerProps extends SVGProps<SVGGElement> {
    coordinates: [number, number]
    children?: ReactNode
  }
  export function Marker(props: MarkerProps): JSX.Element

  export interface ZoomableGroupProps {
    zoom?: number
    center?: [number, number]
    minZoom?: number
    maxZoom?: number
    onMoveEnd?: (pos: { zoom: number; coordinates: [number, number] }) => void
    onMoveStart?: (pos: { zoom: number; coordinates: [number, number] }) => void
    children?: ReactNode
  }
  export function ZoomableGroup(props: ZoomableGroupProps): JSX.Element
}
