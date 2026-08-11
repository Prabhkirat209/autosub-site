import { Code2, CircuitBoard, Cog, Briefcase } from 'lucide-react'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

const SUBTEAMS = [
  {
    icon: Code2,
    name: 'Software & AI',
    blurb: 'The sub’s brain.',
    stack: ['ROS 2 infrastructure', 'Machine learning vision pipelines', 'Acoustic localization', 'Mission planning'],
  },
  {
    icon: CircuitBoard,
    name: 'Electrical',
    blurb: 'Its nervous system.',
    stack: ['Power distribution', 'ARM-based microcontroller integration', 'PCB design', 'Telemetry'],
  },
  {
    icon: Cog,
    name: 'Mechanical',
    blurb: 'What survives the pressure.',
    stack: ['Pressure vessel hydrodynamics', 'Modular frame design', 'Thermal dissipation', 'Custom end-effectors'],
  },
  {
    icon: Briefcase,
    name: 'Business & PR',
    blurb: 'What keeps us funded and known.',
    stack: ['Sponsorship acquisition', 'Media management', 'Community outreach'],
  },
]

export function Team() {
  const ref = useRevealOnScroll<HTMLDivElement>()

  return (
    <section id="team" ref={ref} className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-faint">HOW WE&rsquo;RE ORGANIZED</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Team Subdivisions</h2>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Four clusters, one submarine. Every discipline it takes to design, build, and fund an AUV from
          scratch.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SUBTEAMS.map(({ icon: Icon, name, blurb, stack }) => (
          <div
            key={name}
            data-reveal
            className="rounded-xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong hover:bg-surface-hover"
          >
            <Icon className="h-6 w-6 text-accent" strokeWidth={1.75} />
            <h3 className="mt-4 text-lg font-semibold text-foreground">{name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{blurb}</p>
            <ul className="mt-4 space-y-1.5">
              {stack.map((s) => (
                <li key={s} className="flex items-start gap-2 text-xs text-foreground/75">
                  <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-faint" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
