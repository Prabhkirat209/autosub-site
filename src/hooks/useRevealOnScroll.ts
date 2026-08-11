import { useEffect, useRef } from 'react'

const STAGGER_MS = 110

/**
 * Reveals `[data-reveal]` children once the section scrolls into view, staggered.
 * The motion itself lives in CSS (see `[data-reveal]` in index.css) so the long
 * glide easings run on the compositor rather than through a JS tick.
 */
export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!targets.length) return

    targets.forEach((t, i) => {
      t.style.setProperty('--reveal-delay', `${i * STAGGER_MS}ms`)
    })

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        targets.forEach((t) => t.classList.add('is-revealed'))
        io.disconnect()
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
