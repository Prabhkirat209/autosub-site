import { cn } from '@/lib/utils'

/**
 * Handwritten-style placeholder marking content the club still has to supply.
 * Deliberately looks like a margin note so it can never be mistaken for real copy.
 * search the codebase for `<NeedsInfo` to find everything still outstanding.
 */
export function NeedsInfo({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex -rotate-2 items-center gap-1 font-hand text-lg leading-tight text-accent-quiet',
        className,
      )}
    >
      <span aria-hidden="true" className="text-accent-quiet/70">
        &#8594;
      </span>
      {children ?? 'give info'}
    </span>
  )
}

/** Block-level variant: a dashed placeholder panel standing in for a whole section. */
export function NeedsInfoPanel({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex min-h-28 items-center justify-center rounded-xl border border-dashed border-accent-quiet/30 bg-accent/[0.04] px-6 py-8 text-center',
        className,
      )}
    >
      <NeedsInfo>{children}</NeedsInfo>
    </div>
  )
}
