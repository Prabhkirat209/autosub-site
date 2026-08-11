import { Eye, Target, MapPinned, CircleDot } from 'lucide-react'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

const TASKS = [
  { icon: Eye, name: 'Visual Servoing', blurb: 'Track and align with underwater targets using real-time vision feedback.' },
  { icon: Target, name: 'Torpedo Firing', blurb: 'Launch torpedoes at scored targets with precision positioning.' },
  { icon: MapPinned, name: 'Marker Dropping', blurb: 'Localize over a target and release markers with pinpoint accuracy.' },
  { icon: CircleDot, name: 'Octagon Surfacing', blurb: 'Navigate to and surface within the final octagon to close out the run.' },
]

export function Competitions() {
  const ref = useRevealOnScroll<HTMLDivElement>()

  return (
    <section ref={ref} className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-faint">THE COMPETITION</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">What is RoboSub?</h2>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          RoboSub is an international robotics competition where student teams design, program, and build
          Autonomous Underwater Vehicles (AUVs), then put them to the test in judged tasks that mimic real-world
          submarine applications: navigation, perception, and autonomous decision-making in the deep.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TASKS.map(({ icon: Icon, name, blurb }) => (
          <div
            key={name}
            data-reveal
            className="rounded-xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong hover:bg-surface-hover"
          >
            <Icon className="h-6 w-6 text-accent" strokeWidth={1.75} />
            <h3 className="mt-4 text-lg font-semibold text-foreground">{name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
          </div>
        ))}
      </div>

      <p data-reveal className="mx-auto mt-10 max-w-xl text-center text-xs text-muted-foreground/80">
        We&rsquo;re a brand-new team building toward our first RoboSub run, and these are the tasks we&rsquo;re
        designing our vehicle around.
      </p>
    </section>
  )
}
