import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Team' },
  { href: '#robot', label: 'Robot' },
  { href: '#sponsor', label: 'Sponsors' },
  { href: '#join', label: 'Join' },
]

export function Nav() {
  const [hidden, setHidden] = useState(false)
  const [lifted, setLifted] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setLifted(y > 24)
      // Only hide once past the hero, so the bar doesn't flicker on small early scrolls.
      setHidden(y > 400 && y > lastY.current)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[translate,background-color,border-color] duration-200 will-change-transform',
        hidden ? '-translate-y-full' : 'translate-y-0',
        lifted ? 'border-line bg-surface backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground">
          <span className="h-2 w-2 rounded-full bg-accent" />
          AUTOSUB ROBOTICS
        </a>
        <div className="flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors duration-300 hover:text-foreground sm:inline"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#join"
            className="rounded-md bg-accent px-4 py-1.5 text-xs font-semibold text-accent-ink transition-colors duration-300 hover:bg-accent-hover"
          >
            Join Us
          </a>
        </div>
      </nav>
    </header>
  )
}
