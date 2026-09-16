import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

/** Current board, in display order. Set `photo` to an imported image once headshots arrive. */
const OFFICERS: { name: string; role: string; photo?: string }[] = [
  { name: 'Chris', role: 'Co-President' },
  { name: 'Matthew', role: 'Co-President' },
  { name: 'Kaustubh', role: 'Technical Director' },
  { name: 'Bo-En', role: 'Secretary' },
  { name: 'Raja', role: 'Treasurer' },
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

      {/* Flex-wrap rather than a fixed grid so five cards stay centred on every width. */}
      <div className="mt-14 flex flex-wrap justify-center gap-4">
        {OFFICERS.map((o) => (
          <div
            key={o.name}
            data-reveal
            className="w-[calc(50%-0.5rem)] rounded-xl border border-line bg-surface p-4 text-center transition-colors duration-200 hover:border-line-strong hover:bg-surface-hover sm:w-40"
          >
            {o.photo ? (
              <img
                src={o.photo}
                alt={o.name}
                className="mx-auto h-16 w-16 rounded-full border border-line object-cover"
              />
            ) : (
              <div className="mx-auto h-16 w-16 rounded-full border border-dashed border-line-strong bg-background/60" />
            )}
            <p className="mt-3 text-sm font-semibold text-foreground">{o.name}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{o.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
