"use client";

import * as React from "react";
import { PlusIcon } from "lucide-react";
import { useCart } from "@/components/site/cart";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Roast = {
  no: string;
  name: string;
  meta: string;
  sca?: string;
  level: 1 | 2 | 3 | 4 | 5;
  notes: string[];
  price: number;
  featured?: boolean;
  stampLabel?: string;
};

const ROASTS: Roast[] = [
  {
    no: "Nº 21",
    name: "Boilerhouse Blend",
    meta: "Brazil + Colombia + Sumatra — honey · washed · wet-hulled · 1,150–1,850 m",
    level: 4,
    notes: ["Bittersweet chocolate", "Orange zest", "Toffee"],
    price: 17,
    featured: true,
    stampLabel: "House espresso",
  },
  {
    no: "Nº 07",
    name: "Huila",
    meta: "Colombia — washed · caturra, castillo · 1,600–1,900 m",
    sca: "SCA 87.25",
    level: 3,
    notes: ["Panela", "Red plum", "Cacao nib"],
    price: 19,
  },
  {
    no: "Nº 04",
    name: "Gedeb",
    meta: "Ethiopia — washed · heirloom · 1,950–2,100 m",
    sca: "SCA 88.00",
    level: 1,
    notes: ["Bergamot", "Apricot", "Black tea"],
    price: 21,
  },
  {
    no: "Nº 16",
    name: "Antigua",
    meta: "Guatemala — washed · bourbon · 1,600 m",
    sca: "SCA 86.50",
    level: 3,
    notes: ["Cocoa", "Almond", "Brown sugar"],
    price: 18,
  },
  {
    no: "Nº 12",
    name: "Sidama",
    meta: "Ethiopia — natural · heirloom · 1,900–2,050 m",
    sca: "SCA 87.50",
    level: 2,
    notes: ["Strawberry jam", "Mango", "Florals"],
    price: 20,
  },
];

const LEVEL_FILLS = ["#d9b98a", "#c08845", "#9c5a28", "#6b3a1b", "#3e2110"];

const BLEND = [
  { origin: "Brazil · natural", role: "cocoa base", pct: "40%" },
  { origin: "Colombia · washed", role: "sweet centre", pct: "35%" },
  { origin: "Sumatra · wet-hulled", role: "body & crema", pct: "25%" },
];

function RoastDots({ level }: { level: Roast["level"] }) {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {LEVEL_FILLS.map((fill, index) => (
        <span
          key={fill}
          className="size-2 rounded-full border border-[#3a2b20]"
          style={{ backgroundColor: index < level ? fill : "transparent" }}
        />
      ))}
    </span>
  );
}

function RoastCard({ roast, className }: { roast: Roast; className?: string }) {
  const { addItem } = useCart();
  const featured = Boolean(roast.featured);

  return (
    <article
      aria-labelledby={`roast-${roast.no.replace(/[^\d]/g, "")}`}
      className={cn(
        "group card relative flex flex-col rounded-xl border border-border bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-input hover:shadow-md motion-reduce:hover:translate-y-0 lg:p-7",
        featured && "border-[#8a4a28] p-7 lg:p-8",
        className,
      )}
    >
      {roast.stampLabel ? (
        <span className="stamp absolute -top-3.5 right-6 z-10 rotate-3 bg-card text-primary-hover">
          {roast.stampLabel}
        </span>
      ) : null}

      <div className="flex items-center justify-between gap-4">
        <p className="stamp text-muted-foreground">{roast.no}</p>
        <span className="sr-only">{`Roast level ${roast.level} of 5`}</span>
        <RoastDots level={roast.level} />
      </div>

      <h3
        id={`roast-${roast.no.replace(/[^\d]/g, "")}`}
        className={cn(
          "font-heading mt-5 font-medium tracking-tight text-foreground",
          featured ? "text-2xl lg:text-3xl" : "text-2xl",
        )}
      >
        {roast.name}
      </h3>

      <p className="mt-2 text-sm font-medium uppercase tracking-[0.04em] text-muted-foreground">
        {roast.meta}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {roast.notes.map((note) => (
          <li
            key={note}
            className="rounded-full border border-border bg-muted px-3 py-1 text-foreground/90"
          >
            {note}
          </li>
        ))}
      </ul>

      {featured ? (
        <>
          <p className="mt-5 max-w-sm text-muted-foreground">
            Built to cut milk and read clean black. The formula rotates with
            the seasons — this one is three years old and still unbeaten.
          </p>
          <div className="mt-7 border-t border-dashed border-border pt-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              This build
            </p>
            <dl>
              {BLEND.map((part) => (
                <div
                  key={part.origin}
                  className="flex items-start justify-between gap-6 pt-3"
                >
                  <dt className="text-sm font-medium text-foreground">
                    {part.origin}
                    <span className="mt-0.5 block text-sm font-normal text-muted-foreground">
                      {part.role}
                    </span>
                  </dt>
                  <dd className="font-mono text-sm font-semibold tabular-nums text-primary-hover">
                    {part.pct}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </>
      ) : null}

      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-7">
        <div>
          <p className="font-mono text-2xl font-medium tabular-nums text-foreground">
            ${roast.price.toFixed(2)}
          </p>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            {roast.sca ? `${roast.sca} · ` : ""}250 g · whole bean
          </p>
        </div>
        <Button
          variant={featured ? "default" : "outline"}
          className={cn(featured ? undefined : "border-input", "h-11")}
          onClick={() =>
            addItem({
              id: roast.no,
              label: `${roast.no} ${roast.name}`,
              sublabel: "250 g · whole bean",
              price: roast.price,
              kind: "roast",
            })
          }
        >
          Add to bag
          <PlusIcon aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}

export function RoastMenu() {
  return (
    <section id="roasts" aria-labelledby="roasts-title" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="stamp w-fit text-muted-foreground">The roster · Thu 29 Oct</p>
            <h2
              id="roasts-title"
              className="font-heading mt-6 max-w-[14ch] text-display-md font-medium tracking-tight text-foreground"
            >
              This week&apos;s drops.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground lg:pb-2 lg:text-right">
            Every lot is cupped the morning it roasts. Prices per 250 g bag,
            whole bean unless you ask us to grind.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12">
          <Reveal className="md:col-span-7 md:row-span-2" delayMs={0}>
            <RoastCard roast={ROASTS[0]} className="h-full" />
          </Reveal>
          <Reveal className="md:col-span-5" delayMs={90}>
            <RoastCard roast={ROASTS[1]} />
          </Reveal>
          <Reveal className="md:col-span-5" delayMs={180}>
            <RoastCard roast={ROASTS[2]} />
          </Reveal>
          <Reveal className="md:col-span-7" delayMs={90}>
            <RoastCard roast={ROASTS[3]} />
          </Reveal>
          <Reveal className="md:col-span-5" delayMs={180}>
            <RoastCard roast={ROASTS[4]} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
