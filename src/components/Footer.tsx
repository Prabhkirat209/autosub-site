const EMAIL = 'autosubrobotics@gmail.com'

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/autosubrobotics/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/autosub-robotics-a3b648420' },
]

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line px-4 py-16 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-faint">SURFACE</p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Come build the sub with us
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Whether you want to join a subteam or sponsor the dive, we&rsquo;d love to hear from you.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-accent-ink transition-colors duration-300 hover:bg-accent-hover"
          >
            {EMAIL}
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted-foreground/70">
          &copy; {new Date().getFullYear()} AutoSub Robotics &middot; UC Santa Barbara
        </p>
      </div>
    </footer>
  )
}
