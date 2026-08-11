import { useEffect, useRef } from 'react'
import { animate, svg } from 'animejs'
import { Cpu, Radar, Gauge, BatteryCharging, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NeedsInfo } from '@/components/NeedsInfo'

/**
 * The systems the vehicle breaks down into. Hardware choices are still being decided,
 * so each card's readout is a placeholder: set `spec` to publish real detail.
 */
const SUBSYSTEMS: {
  icon: typeof Cpu
  title: string
  tagline: string
  span: string
  spec: string | null
}[] = [
  {
    icon: Cpu,
    title: 'Compute & Autonomy',
    tagline: 'The decision-making core',
    span: 'sm:col-span-3',
    spec: null,
  },
  {
    icon: Radar,
    title: 'Perception & Acoustics',
    tagline: 'How it sees and hears',
    span: 'sm:col-span-3',
    spec: null,
  },
  {
    icon: Gauge,
    title: 'Actuation & Manipulation',
    tagline: 'How it moves and grabs',
    span: 'sm:col-span-2',
    spec: null,
  },
  {
    icon: BatteryCharging,
    title: 'Power & Electronics',
    tagline: 'What keeps it running',
    span: 'sm:col-span-2',
    spec: null,
  },
  {
    icon: Shield,
    title: 'Hull & Mechanical',
    tagline: 'What holds it together',
    span: 'sm:col-span-2',
    spec: null,
  },
]

export function AUVDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]')
    targets.forEach((t, i) => t.style.setProperty('--reveal-delay', `${i * 110}ms`))

    let drawAnim: ReturnType<typeof animate> | undefined
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        targets.forEach((t) => t.classList.add('is-revealed'))
        if (pathRef.current) {
          drawAnim = animate(svg.createDrawable(pathRef.current), {
            draw: ['0 0', '0 1'],
            duration: 1600,
            ease: 'inOutQuad',
          })
        }
        io.disconnect()
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      drawAnim?.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-faint">THE BUILD</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Vehicle Systems</h2>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          The systems our first AUV breaks down into. Hover a card for its readout. Hardware is still being
          selected, so the detail fills in as the build firms up.
        </p>
      </div>

      <svg aria-hidden="true" className="mx-auto mt-10 h-6 w-full max-w-md text-faint" viewBox="0 0 400 24">
        <path ref={pathRef} d="M0 12 H150 L170 2 H230 L250 12 H400" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-6">
        {SUBSYSTEMS.map(({ icon: Icon, title, tagline, spec, span }) => (
          <div
            key={title}
            data-reveal
            className={cn(
              'group relative overflow-hidden rounded-xl border border-line bg-surface p-5 transition-colors duration-200 hover:border-line-strong hover:bg-surface-hover',
              span,
            )}
          >
            <div className="flex items-start justify-between">
              <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
              <span className="font-mono text-[9px] tracking-widest text-faint">SYS</span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-xs text-muted-foreground transition-opacity duration-200 group-hover:opacity-0">
              {tagline}
            </p>

            <div className="pointer-events-none absolute inset-0 flex translate-y-3 flex-col justify-end bg-overlay p-5 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="font-mono text-[9px] tracking-widest text-faint">TELEMETRY</span>
              {spec ? (
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/90">{spec}</p>
              ) : (
                <p className="mt-1.5">
                  <NeedsInfo>hardware for this system</NeedsInfo>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
