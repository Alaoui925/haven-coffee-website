"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal. Hidden state only applies while `.js` is on the root
 * (set by a pre-paint inline script) — no JS, no hiding. Reduced motion
 * users get instant visibility via both the matchMedia check and the CSS
 * media query in globals.css.
 */
export function Reveal({
  className,
  delayMs = 0,
  children,
  as: Tag = "div",
}: {
  className?: string;
  delayMs?: number;
  children: React.ReactNode;
  /** Render as another element — e.g. an `li` directly inside a `<ul>`/`<ol>`. */
  as?: "div" | "li" | "article" | "section";
}) {
  const Component = Tag as React.ElementType;
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={cn("reveal", className)}
      style={
        delayMs
          ? ({ "--reveal-delay": `${delayMs}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Component>
  );
}
