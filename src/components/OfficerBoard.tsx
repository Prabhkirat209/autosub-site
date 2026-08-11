import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { NeedsInfo } from '@/components/NeedsInfo'

/** Roles are placeholders until the club confirms its board. Fill `name` to publish. */
const ROLES: { role: string; name: string | null }[] = [
  { role: 'President', name: null },
  { role: 'Vice President', name: null },
  { role: 'Treasurer', name: null },
  { role: 'Software Lead', name: null },
  { role: 'Electrical Lead', name: null },
  { role: 'Mechanical Lead', name: null },
  { role: 'Business Lead', name: null },
  { role: 'Outreach Lead', name: null },
]

export function OfficerBoard() {
  const ref = useRevealOnScroll<HTMLDivElement>()

  return (
    <section id="officers" ref={ref} className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-faint">WHO RUNS IT</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Officer Board</h2>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          The students steering the club through its first build season.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {ROLES.map((r) => (
          <div
            key={r.role}
            data-reveal
            className="rounded-xl border border-line bg-surface p-4 text-center transition-colors duration-200 hover:border-line-strong hover:bg-surface-hover"
          >
            {/* Headshot slot. Swap the placeholder for an <img> once photos arrive. */}
            <div className="mx-auto h-16 w-16 rounded-full border border-dashed border-line-strong bg-background/60" />
            <p className="mt-3 text-sm font-semibold text-foreground">{r.name ?? <NeedsInfo>name</NeedsInfo>}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{r.role}</p>
          </div>
        ))}
      </div>

      <p data-reveal className="mt-8 text-center text-xs text-muted-foreground/70">
        Roles listed are placeholders: <NeedsInfo>confirm the real board + headshots</NeedsInfo>
      </p>
    </section>
  )
}
