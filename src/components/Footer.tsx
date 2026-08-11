import { NeedsInfo } from '@/components/NeedsInfo'

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
          <span className="inline-flex items-center rounded-md border border-dashed border-accent-quiet/30 px-6 py-2.5">
            <NeedsInfo>club contact email</NeedsInfo>
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Instagram</span>
          <NeedsInfo>handle</NeedsInfo>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">LinkedIn</span>
          <NeedsInfo>handle</NeedsInfo>
        </div>

        <p className="mt-10 text-xs text-muted-foreground/70">
          &copy; {new Date().getFullYear()} AutoSub Robotics &middot; UC Santa Barbara
        </p>
      </div>
    </footer>
  )
}
