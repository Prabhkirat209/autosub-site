import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

export function JoinUs() {
  const ref = useRevealOnScroll<HTMLDivElement>()

  return (
    <section id="join" ref={ref} className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-faint">GET INVOLVED</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Ready to join AutoSub?</h2>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          No prior experience needed. We&rsquo;ll teach you. Here&rsquo;s how to get started.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Step n={1} title="Come to a meeting">
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            General and subteam meeting times are to be announced.
          </p>
        </Step>

        <Step n={2} title="Join the Discord">
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We coordinate everything on Discord: announcements, build sessions, and questions.
          </p>
        </Step>

        <Step n={3} title="Take the onboarding course">
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A short course on your subteam that gets you up to speed on the tools we use.
          </p>
        </Step>
      </div>
    </section>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div
      data-reveal
      className="rounded-xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong hover:bg-surface-hover"
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent font-mono text-xs font-semibold text-accent-ink">
        {n}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  )
}
