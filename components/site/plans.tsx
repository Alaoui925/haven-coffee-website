"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { useCart } from "@/components/site/cart";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "core",
    name: "Core Roast",
    price: 18,
    cadence: "One 250 g bag · every two weeks",
    lines: [
      "Rotating single origins — our picks, your shelf",
      "Whole bean or a grind per delivery",
      "Skip or pause any week",
    ],
    featured: false,
  },
  {
    id: "pick",
    name: "Roaster's Pick",
    price: 32,
    cadence: "Two 250 g bags · every month",
    lines: [
      "Boilerhouse Nº 21 + a rotating single origin",
      "A 40 g sample of the next drop",
      "Priority Thursday roast slot",
    ],
    featured: true,
  },
] as const;

function PlanCard({
  plan,
  reserved,
  onReserve,
}: {
  plan: (typeof PLANS)[number];
  reserved: boolean;
  onReserve: () => void;
}) {
  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "relative flex flex-col rounded-xl border bg-card p-6 shadow-xs transition-colors duration-200 lg:p-7",
        plan.featured ? "border-[#8a4a28]" : "border-border",
      )}
    >
      {plan.featured ? (
        <span className="stamp absolute -top-3.5 right-6 z-10 rotate-3 bg-card text-primary-hover">
          Most picked
        </span>
      ) : null}

      <h3
        id={`plan-${plan.id}`}
        className="font-heading text-xl font-medium text-foreground"
      >
        {plan.name}
      </h3>
      <p className="mt-1.5 font-mono text-sm text-muted-foreground">{plan.cadence}</p>

      <p className="mt-6 flex items-baseline gap-2">
        <span className="font-heading text-3xl font-medium tabular-nums text-foreground lg:text-4xl">
          ${plan.price}
        </span>
        <span className="text-sm font-medium text-muted-foreground">per delivery</span>
      </p>

      <ul className="mt-6 flex flex-col gap-3">
        {plan.lines.map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-muted-foreground">
            <CheckIcon
              className="mt-1 size-4 shrink-0 text-success"
              aria-hidden="true"
            />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={plan.featured ? "default" : "outline"}
        onClick={onReserve}
        disabled={reserved}
        className="mt-8 h-11 md:mt-auto"
      >
        {reserved ? "Reserved · skip or pause anytime" : `Start ${plan.name.replace(/'/g, "’")}`}
      </Button>
    </article>
  );
}

export function Plans() {
  const { addItem } = useCart();
  const [reserved, setReserved] = React.useState<string | null>(null);

  const handleReserve = React.useCallback(
    (plan: (typeof PLANS)[number]) => {
      if (reserved) return;
      setReserved(plan.id);
      addItem({
        id: plan.name,
        label: plan.name,
        sublabel: plan.cadence,
        price: plan.price,
        kind: "plan",
      });
    },
    [reserved, addItem],
  );

  return (
    <section id="plans" aria-labelledby="plans-title" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="stamp w-fit text-muted-foreground">The subscription</p>
              <h2
                id="plans-title"
                className="font-heading mt-6 max-w-[13ch] text-display-md font-medium tracking-tight text-foreground"
              >
                Never brew stale coffee again.
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                Supermarket bags average six months off roast, and the shelf
                shows it. Coffee is at its best three to ten days after
                roasting — we roast every Thursday and mail within 48 hours,
                <strong className="font-semibold text-foreground">
                  {" "}
                  so you land inside the window.
                </strong>
              </p>
              <p className="mt-6 font-mono text-sm font-medium text-muted-foreground">
                SKIP · PAUSE · CANCEL ANY TIME — NO LOCK-IN
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid h-full gap-5 sm:grid-cols-2">
              {PLANS.map((plan, index) => (
                <Reveal key={plan.id} delayMs={index * 120} className={index === 1 ? "sm:mt-10" : undefined}>
                  <PlanCard
                    plan={plan}
                    reserved={reserved === plan.id}
                    onReserve={() => handleReserve(plan)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
