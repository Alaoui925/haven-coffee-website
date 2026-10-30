import { Wordmark } from "@/components/site/wordmark";

const FOOTER_NAV = [
  { heading: "On this page", links: [
    { label: "This week's drops", href: "#roasts" },
    { label: "Roast log", href: "#roasting" },
    { label: "Plans", href: "#plans" },
    { label: "FAQ", href: "#faq" },
  ]},
  { heading: "The boring bits", links: [
    { label: "Shipping & delays", href: "#faq" },
    { label: "How fresh is fresh", href: "#faq" },
    { label: "Pause or cancel", href: "#faq" },
    { label: "Whole bean or ground", href: "#faq" },
  ]},
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#140d07] pt-14 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Wordmark />
            <p className="font-heading mt-6 max-w-md text-2xl font-medium tracking-tight text-foreground">
              Roasted eight kilos at a time, in Southeast Portland, since 2018.
            </p>
            <address className="mt-8 font-mono text-sm not-italic text-muted-foreground">
              <p>1219 SE DIVISION ST — PORTLAND, OR 97202</p>
              <p className="mt-1.5">TASTING BAR FRI–SUN · 9:00–15:00</p>
              <p className="mt-1.5">
                <a
                  href="mailto:hello@slowfireroasting.coffee"
                  className="underline decoration-[#9a7b5c] underline-offset-4 transition-colors hover:text-foreground"
                >
                  HELLO@SLOWFIREROASTING.COFFEE
                </a>
              </p>
            </address>
          </div>

          {FOOTER_NAV.map((group) => (
            <nav key={group.heading} aria-label={group.heading} className="lg:col-span-3">
              <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.04em] text-muted-foreground">
                {group.heading}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-foreground/85 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © 2026 Slowfire Roasting Co. All batches cupped before they ship.
          </p>
          <p className="font-mono text-sm text-muted-foreground">
            PROBAT UG-22 · 1962 — ROAST LOG ON EVERY BAG
          </p>
        </div>
      </div>
    </footer>
  );
}
