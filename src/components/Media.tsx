import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { NeedsInfo, NeedsInfoPanel } from '@/components/NeedsInfo'

export function Media() {
  const ref = useRevealOnScroll<HTMLDivElement>()

  return (
    <section id="media" ref={ref} className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-faint">MEDIA</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">From the build</h2>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Pool tests, CAD renders, and the team at work.
        </p>
      </div>

      {/* Masonry slots. Drop images in as they come. */}
      <div data-reveal className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-xl border border-dashed border-line-strong bg-surface ${
              i % 3 === 0 ? 'row-span-2 min-h-56' : 'min-h-28'
            }`}
          />
        ))}
      </div>

      <div data-reveal className="mt-6">
        <NeedsInfoPanel>photos + video from pool tests and build sessions</NeedsInfoPanel>
      </div>

      <p data-reveal className="mt-8 text-center text-xs text-muted-foreground/70">
        GitHub &amp; technical writeups: <NeedsInfo>links once repos are public</NeedsInfo>
      </p>
    </section>
  )
}
