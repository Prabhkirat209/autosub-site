import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { cn } from '@/lib/utils'

const MAJORS = [
  { label: 'Mechanical Engineering', pct: 37.2, color: 'bg-surface-hover' },
  { label: 'Computer Engineering', pct: 30.2, color: 'bg-accent' },
  { label: 'Electrical Engineering', pct: 27.9, color: 'bg-surface-hover' },
  { label: 'Communication', pct: 4.7, color: 'bg-faint' },
]

// Survey is from the previous academic year; everyone has since moved up one class.
const YEARS = [
  { label: 'Second Year', pct: 54.3, color: 'bg-surface-hover' },
  { label: 'Third Year', pct: 40, color: 'bg-surface-hover' },
  { label: 'Fourth Year', pct: 5.7, color: 'bg-accent' },
]

export function TeamStats() {
  const ref = useRevealOnScroll<HTMLDivElement>()

  return (
    <section ref={ref} className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-faint">OUR CREW</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">A team still growing</h2>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Sophomores to seniors, across every engineering discipline, built from the ground up since
          February 2026.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <BreakdownCard title="By major" rows={MAJORS} />
        <BreakdownCard title="By class year" rows={YEARS} />
      </div>
    </section>
  )
}

function BreakdownCard({
  title,
  rows,
}: {
  title: string
  rows: { label: string; pct: number; color: string }[]
}) {
  return (
    <div data-reveal className="rounded-xl border border-line bg-surface p-6">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{title}</h3>
      <div className="mt-5 space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="mb-1.5 flex items-baseline justify-between text-xs">
              <span className="text-foreground/85">{r.label}</span>
              <span className="font-mono text-muted-foreground">{r.pct}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-line-strong">
              <div className={cn('h-full rounded-full', r.color)} style={{ width: `${r.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
