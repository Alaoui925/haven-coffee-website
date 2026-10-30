const ITEMS = [
  "Roasted Thursdays",
  "Shipped Fridays",
  "Peak on day 3–10",
  "Free U.S. shipping over $40",
  "Single origins from 8 farm partners",
  "Gedeb · Ethiopia",
  "Huila · Colombia",
  "Antigua · Guatemala",
  "Nariño · Colombia",
  "Sidama · Ethiopia",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-9 pr-9">
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center gap-9 text-xs font-medium uppercase tracking-[0.04em] whitespace-nowrap text-muted-foreground"
        >
          {item}
          <span aria-hidden="true" className="size-1 rounded-full bg-primary" />
        </span>
      ))}
    </div>
  );
}

/**
 * Continuous origin ticker — the marquee effect (Magic UI equivalent):
 * one track, two identical halves, translateX(-50%) keyframe.
 * Decorative repetition is hidden from assistive tech; the same facts
 * ("roasted Thursdays", origins) appear in real text elsewhere on the page.
 */
export function Ticker() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-border bg-[#201409] py-3.5"
    >
      <div className="animate-marquee flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}
