import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

export function Mission() {
  const ref = useRevealOnScroll<HTMLDivElement>()

  return (
    <section id="about" ref={ref} className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <p data-reveal className="text-center font-mono text-xs tracking-[0.3em] text-faint">
        OUR MISSION
      </p>
      <h2 data-reveal className="mt-3 text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Why we&rsquo;re diving in
      </h2>

      <div
        data-reveal
        className="mt-10 space-y-5 rounded-xl border border-line bg-surface p-6 text-sm leading-relaxed text-foreground/85 sm:p-8 sm:text-base"
      >
        <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">Our Mission</h3>
        <p>
          The mission of this organization is to provide an opportunity for UCSB students to gain hands-on
          experience in the various facets of designing autonomous underwater vehicles (AUVs). By bridging
          curriculum concepts with real-world application, we aim to foster a collaborative, interdisciplinary
          community where students from all backgrounds can develop skills in both STEM and working with others.
          Furthermore, our work will directly serve the local Santa Barbara ecosystem through the use of AUVs to
          monitor the local conditions of the ocean and ecosystems surrounding our campus.
        </p>
        <p>
          With UC Santa Barbara being the only UC to have a beach directly on campus, we wondered why there
          wasn&rsquo;t already an organization for students to get hands-on experience in marine robotics and
          engineering. So we decided to dive in and be the first, and started <strong className="text-foreground">AutoSub Robotics</strong>.
        </p>
        <p>
          We founded our club in early February 2026, and we&rsquo;ve already made a lot of progress designing our
          first underwater robot, but we&rsquo;re still only just getting started.
        </p>
        <p>
          We&rsquo;re a motivated student team whose mission is to give every member the opportunity to grow their
          hands-on and project-based experience while fostering an accessible, welcoming robotics community.
        </p>
      </div>
    </section>
  )
}
