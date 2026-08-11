import type { CSSProperties } from 'react'
import auvRenderUrl from '@/assets/auv-render.webp'

/** Staggered entrance delays, in source order. */
const enterDelay = (i: number) => ({ '--enter-delay': `${150 + i * 130}ms` }) as CSSProperties

export function Hero() {
  return (
    // `isolate` keeps the layering below scoped to this section rather than competing
    // with the fixed page background and the nav.
    <section className="relative isolate flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center sm:px-6">
      {/* Full-bleed CAD render behind the headline. Held at 30% and desaturated so it
          settles into the navy instead of competing with the type in front of it. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 select-none">
        <img
          src={auvRenderUrl}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover opacity-30 saturate-50"
        />
        {/* Scrims: hold the centre dark enough for white type, then fade the image out
            top and bottom so it has no hard edge against the page. */}
        <div className="absolute inset-0 bg-background/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <p data-enter style={enterDelay(0)} className="font-mono text-xs tracking-[0.35em] text-faint">
          UNDERWATER ROBOTICS &middot; UC SANTA BARBARA
        </p>

        <h1
          data-enter
          style={enterDelay(1)}
          className="mt-5 max-w-4xl text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          Engineering autonomy
          <br />
          beneath the surface.
        </h1>

        <p
          data-enter
          style={enterDelay(2)}
          className="mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          UCSB is the only UC with a beach on campus, so we&rsquo;re building the autonomous underwater vehicle
          to prove it. Founded February 2026, headed for RoboSub.
        </p>

        <div data-enter style={enterDelay(3)} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#sponsor"
            className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-accent-ink transition-colors duration-300 hover:bg-accent-hover"
          >
            Sponsor the Dive
          </a>
          <a
            href="#contact"
            className="rounded-md border border-line-strong px-6 py-2.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:bg-line"
          >
            Join the Crew
          </a>
        </div>

        <div data-enter style={enterDelay(4)} className="mt-16 grid grid-cols-3 gap-6 sm:gap-14">
          <Stat value="Feb '26" label="Founded" />
          <Stat value="4" label="Subteams" />
          <Stat value="RoboSub" label="First Competition" />
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-semibold text-foreground sm:text-2xl">{value}</span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  )
}
