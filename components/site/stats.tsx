"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const STATS = [
  { value: 2431, decimals: 0, label: "Batches roasted this year" },
  { value: 14, decimals: 0, label: "Origins on the rotation" },
  { value: 86.4, decimals: 1, label: "Average cupping score" },
  { value: 48, decimals: 0, label: "Hours roast-to-mailbox" },
] as const;

function formatValue(value: number, decimals: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function Row({
  value,
  decimals,
  label,
  started,
  className,
}: {
  value: number;
  decimals: number;
  label: string;
  started: boolean;
  className?: string;
}) {
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    setDisplay(0);
    let raf = 0;
    const t0 = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value]);

  return (
    <div className={cn("py-9 lg:py-11", className)}>
      <p className="font-heading tabular-nums text-3xl font-medium text-foreground lg:text-4xl">
        {formatValue(display, decimals)}
      </p>
      <p className="mt-2 text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

export function StatsStrip() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Instant content for reduced-motion users; still "in view" ready.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            setStarted(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="border-y border-border">
      <div
        ref={ref}
        className="reveal mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8"
      >
        {STATS.map((stat, index) => (
          <Row key={stat.label} started={started} className={index === 0 ? "col-span-2 lg:col-span-1" : undefined} {...stat} />
        ))}
      </div>
    </section>
  );
}
