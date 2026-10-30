import { cn } from "@/lib/utils";

/**
 * Wordmark — pure markup so it renders as a server component wherever it is
 * used (navbar and footer both import it).
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <a href="#main" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground transition-colors group-hover:bg-primary-hover">
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
          <path d="M12 2c.8 3.2-1.6 4.4-2.8 6.2-1 1.5-.9 3 .2 4.3C10.7 11 12 10.5 12 8.6c1.5 1.7 3 3.9 3 6.4A5 5 0 0 1 5 15c0-4.5 3.5-6.8 7-13Z" />
          <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
        Slowfire
        <span className="hidden text-muted-foreground sm:inline"> Roasting Co.</span>
      </span>
    </a>
  );
}
