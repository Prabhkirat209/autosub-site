import { useEffect, useRef } from 'react'
import submarineUrl from '@/assets/submarine.png'
import { MAX_DEPTH_M } from '@/hooks/ScrollDepthContext'

/** How much of the gap to close each frame. Lower drifts longer; 0.09 glides without feeling slack. */
const FOLLOW = 0.09
/** Below this delta we snap and park the loop, so we are not burning frames on sub-pixel motion. */
const EPSILON = 0.0005

/**
 * Scroll depth indicator: a narrow open track inset from the right edge, with the
 * club's submarine descending it as you scroll.
 *
 * Deliberately standalone. It reads scroll position directly and animates through a
 * ref rather than React state, so following the scroll never re-renders the page.
 */
export function SubmarineDepth() {
  const trackRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const depthRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const sub = subRef.current
    if (!track || !sub) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    let target = 0 // 0..1, true scroll progress
    let current = 0 // 0..1, eased position actually rendered
    let frame = 0
    let running = false

    const readTarget = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      target = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0
    }

    const paint = () => {
      // Travel is expressed as a percentage of the track minus the sub's own height,
      // so the vehicle sits fully inside the track at both extremes.
      const travel = track.clientHeight - sub.clientHeight
      sub.style.transform = `translate3d(0, ${current * travel}px, 0)`
      if (depthRef.current) {
        depthRef.current.textContent = Math.round(current * MAX_DEPTH_M).toLocaleString('en-US')
      }
    }

    const tick = () => {
      const delta = target - current
      if (Math.abs(delta) < EPSILON) {
        current = target
        paint()
        running = false
        return
      }
      current += delta * FOLLOW
      paint()
      frame = requestAnimationFrame(tick)
    }

    const request = () => {
      if (reduced.matches) {
        // No easing: jump straight to the scroll position.
        current = target
        paint()
        return
      }
      if (!running) {
        running = true
        frame = requestAnimationFrame(tick)
      }
    }

    const onScroll = () => {
      readTarget()
      request()
    }

    // Resize, reduced-motion changes, and returning to a backgrounded tab all snap
    // straight to position. Backgrounded tabs pause rAF, so without this the sub
    // would sit wherever it was parked until the next scroll event.
    const sync = () => {
      readTarget()
      current = target
      paint()
    }

    sync()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', sync)
    reduced.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', sync)
      reduced.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 select-none flex-col items-center gap-2 md:flex lg:right-6"
    >
      {/* Open water column: edge only, page shows straight through the middle. The
          sub is wider than the track, so its nose and tail break both edges. */}
      <div
        ref={trackRef}
        className="relative h-[42vh] w-10 rounded-full bg-transparent lg:h-[46vh]"
        style={{
          borderWidth: 'var(--track-edge-width)',
          borderStyle: 'solid',
          borderColor: 'var(--track-edge)',
        }}
      >
        {/* The artwork is a CSS mask rather than an image element, so the submarine
            takes a CSS colour and stays in step with the track edge. */}
        <div
          ref={subRef}
          className="absolute left-1/2 top-0 w-12 -translate-x-1/2 bg-sub-ink opacity-80"
          style={{
            aspectRatio: '256 / 202',
            maskImage: `url(${submarineUrl})`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: `url(${submarineUrl})`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
          }}
        />
      </div>

      {/* Fixed width and tabular figures: the readout grows from 0 to 3,682 as you
          descend, and a centred label would otherwise shift as digits are added. */}
      <div className="flex w-14 items-baseline justify-center font-mono text-[10px] tabular-nums text-faint">
        <span ref={depthRef}>0</span>
        <span className="ml-px">m</span>
      </div>
    </div>
  )
}
