import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { NeedsInfo } from '@/components/NeedsInfo'

/**
 * The rows the spec sheet will carry. Every figure is still to be confirmed by the
 * team, so `value: null` renders the handwritten "give info" marker in its place.
 * Fill a value in to publish it.
 */
const SPECS: { label: string; value: string | null }[] = [
  { label: 'Length', value: null },
  { label: 'Width', value: null },
  { label: 'Height', value: null },
  { label: 'Weight', value: null },
  { label: 'Degrees of Freedom', value: null },
  { label: 'Depth Rating', value: null },
  { label: 'Propulsion', value: null },
  { label: 'Battery', value: null },
  { label: 'Vision', value: null },
  { label: 'Central Processing', value: null },
  { label: 'Software Architecture', value: null },
  { label: 'Hull', value: null },
]

export function RobotSpecs() {
  const ref = useRevealOnScroll<HTMLDivElement>()

  return (
    <section id="robot" ref={ref} className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-faint">OUR ROBOT</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Meet <NeedsInfo className="text-3xl sm:text-4xl">name the sub</NeedsInfo>
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Our first vehicle, currently in design. Target specifications below. These firm up as the build
          progresses.
        </p>
      </div>

      {/* Photo/render of the sub goes here once available. */}
      <div
        data-reveal
        className="mt-12 flex min-h-56 items-center justify-center rounded-xl border border-dashed border-line-strong bg-surface"
      >
        <NeedsInfo>photo / CAD render of the sub</NeedsInfo>
      </div>

      <dl data-reveal className="mt-10 grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
        {SPECS.map((s) => (
          <div
            key={s.label}
            className="flex items-baseline justify-between gap-4 border-b border-line py-3.5 last:border-0"
          >
            <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</dt>
            <dd className="text-right text-sm text-foreground/90">{s.value ?? <NeedsInfo />}</dd>
          </div>
        ))}
      </dl>

      <p data-reveal className="mt-8 text-center text-xs text-muted-foreground/70">
        Technical Design Report: <NeedsInfo>link once written</NeedsInfo>
      </p>
    </section>
  )
}
