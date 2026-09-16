import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import matthewPhoto from '@/assets/officers/matthew.webp'
import chrisPhoto from '@/assets/officers/chris.webp'
import rajaPhoto from '@/assets/officers/raja.webp'
import kaustubhPhoto from '@/assets/officers/kaustubh.webp'
import boEnPhoto from '@/assets/officers/bo-en.webp'

/** Current board, in display order. */
const OFFICERS: { name: string; role: string; photo?: string }[] = [
  { name: 'Matthew', role: 'Co-President', photo: matthewPhoto },
  { name: 'Chris', role: 'Co-President', photo: chrisPhoto },
  { name: 'Raja', role: 'Treasurer', photo: rajaPhoto },
  { name: 'Kaustubh', role: 'Technical Director', photo: kaustubhPhoto },
  { name: 'Bo-En', role: 'Secretary', photo: boEnPhoto },
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
                loading="lazy"
                decoding="async"
                width={80}
                height={80}
                className="mx-auto h-20 w-20 rounded-full border border-line object-cover"
              />
            ) : (
              <div className="mx-auto h-20 w-20 rounded-full border border-dashed border-line-strong bg-background/60" />
            )}
            <p className="mt-3 text-sm font-semibold text-foreground">{o.name}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{o.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
