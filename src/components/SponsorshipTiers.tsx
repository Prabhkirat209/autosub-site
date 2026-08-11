import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import { cn } from '@/lib/utils'
import { NeedsInfo, NeedsInfoPanel } from '@/components/NeedsInfo'
import submarineUrl from '@/assets/submarine.png'

type TierKey = 'silver' | 'gold' | 'platinum'

const TIER_RANK: Record<TierKey, number> = { silver: 0, gold: 1, platinum: 2 }

const BENEFITS: { label: string; tier: TierKey }[] = [
  { label: 'Logo on the club website', tier: 'silver' },
  { label: 'Shoutout on our social media', tier: 'silver' },
  { label: 'Logo on team apparel', tier: 'gold' },
  { label: 'Access to our recruiting resume book', tier: 'gold' },
  { label: 'Sub on display at outreach events & competitions', tier: 'platinum' },
  { label: 'Priority recruiting session with our engineers', tier: 'platinum' },
]

/**
 * `ink` is a real CSS colour rather than a utility class so the rails can be drawn
 * as gradients. Each tier's rail dims slightly toward its lower end, the way light
 * falls off with depth.
 */
const TIERS: {
  key: TierKey
  name: string
  price: string
  ink: string
  plaque: string
  text: string
}[] = [
  {
    key: 'silver',
    name: 'Silver',
    price: '$250+',
    ink: 'var(--text-muted)',
    plaque: 'border-line-strong bg-muted-foreground/10',
    text: 'text-foreground',
  },
  {
    key: 'gold',
    name: 'Gold',
    price: '$750+',
    ink: 'var(--accent)',
    plaque: 'border-line-strong bg-accent/10',
    text: 'text-accent-quiet',
  },
  {
    key: 'platinum',
    name: 'Platinum',
    price: '$1,500+',
    ink: 'var(--text-faint)',
    plaque: 'border-line-strong bg-faint/10',
    text: 'text-foreground',
  },
]

const ROW_H = 64 // px, must stay in sync with the row divs' inline height below
const HEADER_H = 68 // px, height reserved for the plaque/price header above the gauges
const GAUGE_H = BENEFITS.length * ROW_H

function unlockedCount(tier: TierKey) {
  return BENEFITS.filter((b) => TIER_RANK[tier] >= TIER_RANK[b.tier]).length
}

// A stratum line under the last row a tier still covers (skip the final row, the
// bottom of the whole gauge already reads as the sea floor).
const CUTOFFS = TIERS.map((t, i) => ({ tierIndex: i, tier: t, depth: unlockedCount(t.key) })).filter(
  (c) => c.depth < BENEFITS.length,
)

/** Suspended particulate. Fixed values so the field is stable across renders. */
const MOTES = [
  { left: '18%', top: '70%', size: 2, delay: '0s', duration: '19s' },
  { left: '46%', top: '86%', size: 1, delay: '6s', duration: '24s' },
  { left: '63%', top: '62%', size: 2, delay: '11s', duration: '21s' },
  { left: '81%', top: '92%', size: 1, delay: '3s', duration: '26s' },
  { left: '31%', top: '95%', size: 1, delay: '15s', duration: '22s' },
]

export function SponsorshipTiers() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const fillRefs = useRef<(HTMLDivElement | null)[]>([])
  const played = useRef(false)

  // Reveal, plus the rails filling down to their depth.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !played.current) {
          played.current = true
          el.querySelectorAll<HTMLElement>('[data-reveal]').forEach((t, i) => {
            t.style.setProperty('--reveal-delay', `${i * 110}ms`)
            t.classList.add('is-revealed')
          })
          TIERS.forEach((t, i) => {
            const target = fillRefs.current[i]
            if (!target) return
            animate(target, {
              height: `${unlockedCount(t.key) * ROW_H}px`,
              duration: 1600,
              delay: i * 260,
              ease: 'outExpo',
            })
          })
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // The survey submarine: descends its lane in step with scroll progress through
  // the gauge. Same easing approach as the page indicator, scoped to this block.
  useEffect(() => {
    const grid = gridRef.current
    const sub = subRef.current
    if (!grid || !sub) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let target = 0
    let current = 0
    let frame = 0
    let running = false

    const readTarget = () => {
      const r = grid.getBoundingClientRect()
      const vh = window.innerHeight
      // Spread the descent over the whole time the gauge is on screen: it starts as
      // the block rises past 85% of the viewport and finishes as it leaves at 15%.
      // Mapping it to the block's own height alone made the sub drop far too fast.
      const span = r.height + vh * 0.7 || 1
      target = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / span))
    }

    const paint = () => {
      const travel = GAUGE_H - sub.clientHeight
      sub.style.transform = `translate3d(0, ${HEADER_H + current * travel}px, 0)`
    }

    const tick = () => {
      const delta = target - current
      if (Math.abs(delta) < 0.0005) {
        current = target
        paint()
        running = false
        return
      }
      current += delta * 0.08
      paint()
      frame = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      readTarget()
      if (reduced.matches) {
        current = target
        paint()
        return
      }
      if (!running) {
        running = true
        frame = requestAnimationFrame(tick)
      }
    }

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
    <section
      id="sponsor"
      ref={sectionRef}
      className="relative isolate mx-auto max-w-5xl px-4 py-24 sm:px-6"
    >
      {/* Atmosphere: a faint cold wash over the gauge and a slow darkening toward the
          foot of the section. Radial gradients rather than blurred layers, so this
          costs nothing to composite. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        style={{
          background:
            'radial-gradient(60% 42% at 50% 46%, rgba(125, 190, 230, 0.05), transparent 70%),' +
            'linear-gradient(to bottom, transparent, rgba(0, 12, 22, 0.35))',
        }}
      >
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="animate-motes absolute rounded-full bg-white/25"
            style={{
              left: m.left,
              top: m.top,
              width: m.size,
              height: m.size,
              animationDelay: m.delay,
              animationDuration: m.duration,
            }}
          />
        ))}
      </div>

      <div data-reveal className="mb-14 text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-faint">PARTNER WITH US</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sponsorship Tiers</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Every tier descends further with you. The deeper the support, the more benefits unlock along the way.
        </p>
      </div>

      <div className="no-scrollbar overflow-x-auto">
        {/* pr on mobile gives the last column's gauge tick somewhere to sit once the
            survey lane is hidden, otherwise it pushes the row into overflow. */}
        <div ref={gridRef} className="tier-grid relative mx-auto flex min-w-[300px] max-w-3xl pr-3 sm:pr-0">
          {/* Stratum lines. Each carries a leader that runs back to its own tier's
              end marker, so the label reads as an annotation on that gauge rather
              than a caption floating at the edge. */}
          {CUTOFFS.map((c) => (
            <div
              key={c.tier.key}
              className="pointer-events-none absolute z-10"
              style={{ top: HEADER_H + c.depth * ROW_H, left: 0, right: 'var(--sub-lane)' }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-line" />
              <div
                className="absolute top-0 h-px"
                style={{
                  right: 0,
                  width: `calc(${(TIERS.length - c.tierIndex - 0.5).toFixed(1)} * var(--col-w))`,
                  background: `linear-gradient(to right, ${c.tier.ink}, transparent 12%, transparent 55%, var(--line-strong))`,
                }}
              />
              <span className="absolute right-0 -translate-y-[calc(100%+4px)] font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                {c.tier.name} ends here
              </span>
            </div>
          ))}

          {/* benefit labels */}
          <div className="flex flex-1 flex-col pr-3">
            <div className="flex items-end pb-2" style={{ height: HEADER_H }}>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Benefits</span>
            </div>
            {BENEFITS.map((b, i) => (
              <div
                key={b.label}
                className={cn(
                  'flex items-center pr-2 text-xs leading-snug text-foreground/90 sm:text-sm',
                  i > 0 && 'border-t border-line',
                )}
                style={{ height: ROW_H }}
              >
                {b.label}
              </div>
            ))}
          </div>

          {/* gauge columns */}
          {TIERS.map((t, i) => {
            const depth = unlockedCount(t.key)
            return (
              <div key={t.key} className="relative flex w-14 flex-none flex-col items-center sm:w-24 md:w-28">
                {/* Water column: each tier sits fractionally deeper and darker. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-2 bottom-0"
                  style={{
                    top: HEADER_H,
                    background: `linear-gradient(to bottom, transparent, rgba(0, 10, 20, ${0.05 + i * 0.05}))`,
                  }}
                />

                <div className="relative flex flex-col items-center justify-end gap-1 pb-3" style={{ height: HEADER_H }}>
                  <span
                    className={cn(
                      'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide',
                      t.plaque,
                      t.text,
                    )}
                  >
                    {t.name.toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">{t.price}</span>
                </div>

                <div className="relative" style={{ height: GAUGE_H }}>
                  {/* Unlit rail, fading out at both ends so it has no hard stop. */}
                  <div
                    className="absolute left-1/2 h-full w-px -translate-x-1/2"
                    style={{
                      background:
                        'linear-gradient(to bottom, transparent, var(--line) 8%, var(--line) 92%, transparent)',
                    }}
                  />
                  {/* Lit section: the tier's actual reach, attenuating with depth. */}
                  <div
                    ref={(el) => {
                      fillRefs.current[i] = el
                    }}
                    className="absolute left-1/2 top-0 h-0 w-px -translate-x-1/2"
                    style={{
                      background: `linear-gradient(to bottom, ${t.ink}, color-mix(in srgb, ${t.ink} 45%, transparent))`,
                    }}
                  />

                  {/* Checkpoints: an open ring at each benefit this tier reaches. */}
                  {BENEFITS.map((b, r) =>
                    TIER_RANK[t.key] >= TIER_RANK[b.tier] ? (
                      <div
                        key={r}
                        className="absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
                        style={{ top: (r + 0.5) * ROW_H, borderColor: `color-mix(in srgb, ${t.ink} 70%, transparent)` }}
                      />
                    ) : null,
                  )}

                  {/* End marker: a gauge index. Ring, centre dot, and a tick to
                      either side, sitting exactly on the stratum line. */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ top: depth * ROW_H }}
                  >
                    <div className="relative flex h-3 w-3 items-center justify-center">
                      <span
                        className="absolute inset-0 rounded-full border"
                        style={{ borderColor: `color-mix(in srgb, ${t.ink} 85%, transparent)` }}
                      />
                      <span className="h-1 w-1 rounded-full" style={{ background: t.ink }} />
                      <span
                        className="absolute right-full mr-1 h-px w-1.5"
                        style={{ background: `color-mix(in srgb, ${t.ink} 55%, transparent)` }}
                      />
                      <span
                        className="absolute left-full ml-1 h-px w-1.5"
                        style={{ background: `color-mix(in srgb, ${t.ink} 55%, transparent)` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Survey lane: clear of every label and rail. Deliberately trackless. A
              line here read as a scrollbar, so the sub descends open water. */}
          <div className="relative hidden w-10 flex-none sm:block" aria-hidden="true">
            <div
              ref={subRef}
              className="absolute left-1/2 top-0 w-[26px] -translate-x-1/2 opacity-40"
              style={{
                aspectRatio: '256 / 202',
                background: 'var(--text-muted)',
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
        </div>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <a
          href="#contact"
          className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-accent-ink transition-colors duration-300 hover:bg-accent-hover"
        >
          Become a Sponsor
        </a>
        {/* Wire this to the finished sponsorship PDF once it's exported. */}
        <span className="inline-flex items-center rounded-md border border-dashed border-accent-quiet/30 px-6 py-2.5">
          <NeedsInfo>sponsorship packet PDF to link</NeedsInfo>
        </span>
      </div>

      <div data-reveal className="mt-20 text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-faint">OUR SPONSORS</p>
        <h3 className="mt-3 text-xl font-semibold text-foreground">The people backing our first build</h3>
        <NeedsInfoPanel className="mt-6">sponsor logos once partners are confirmed</NeedsInfoPanel>
      </div>
    </section>
  )
}
