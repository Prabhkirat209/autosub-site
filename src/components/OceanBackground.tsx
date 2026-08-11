import { useMemo } from 'react'
import { useScrollDepthProgress } from '@/hooks/ScrollDepthContext'

const SURFACE: Rgb = [0, 54, 96] // --depth-surface, UCSB navy
const FLOOR: Rgb = [0, 25, 45] // --depth-floor, deep navy

/**
 * The page's only environmental effect: a slow descent from sunlit navy to deep
 * navy as you scroll. No blobs, bubbles, or bloom. Both ends stay on the UCSB
 * navy hue, so the page reads as water rather than as a darkened grey.
 */
export function OceanBackground() {
  const progress = useScrollDepthProgress()

  const style = useMemo(() => {
    const top = mix(SURFACE, FLOOR, progress * 0.75)
    const bottom = mix(SURFACE, FLOOR, Math.min(1, progress * 0.75 + 0.35))
    return { background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)` }
  }, [progress])

  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10" style={style} />
}

type Rgb = [number, number, number]

function mix(a: Rgb, b: Rgb, t: number): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * t)
  const g = Math.round(a[1] + (b[1] - a[1]) * t)
  const bl = Math.round(a[2] + (b[2] - a[2]) * t)
  return `rgb(${r}, ${g}, ${bl})`
}
