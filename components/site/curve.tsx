"use client";

import * as React from "react";
import { LineChart, type CustomTooltipProps } from "@tremor/react";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

type CurvePoint = { time: string; bean: number };

const CURVE: CurvePoint[] = [
  { time: "0:00", bean: 200 },
  { time: "0:20", bean: 148 },
  { time: "0:40", bean: 118 },
  { time: "1:00", bean: 104 },
  { time: "1:30", bean: 96.4 },
  { time: "2:00", bean: 100.2 },
  { time: "3:00", bean: 110.1 },
  { time: "4:00", bean: 121.3 },
  { time: "5:00", bean: 133.2 },
  { time: "6:00", bean: 146.0 },
  { time: "7:00", bean: 160.2 },
  { time: "8:00", bean: 174.1 },
  { time: "9:00", bean: 189.0 },
  { time: "9:40", bean: 196.5 },
  { time: "10:40", bean: 201.8 },
  { time: "11:50", bean: 208.5 },
];

const LOG: { label: string; value: string }[] = [
  { label: "Charge", value: "200°C" },
  { label: "Turning point", value: "96.4°C @ 1:30" },
  { label: "First crack", value: "196.5°C @ 9:40" },
  { label: "Drop", value: "208.5°C @ 11:50" },
  { label: "Development", value: "2:10 · 18.5%" },
];

function CurveTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0];
  return (
    <div className="rounded-lg border border-input bg-popover px-3 py-2 shadow-lg">
      <p className="font-mono text-sm tabular-nums text-foreground">
        {point.payload.time} — {Number(point.value).toFixed(1)}°C bean
      </p>
    </div>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Thursday — roast & cup",
    copy: "Your order hits the drum first thing Thursday. Every batch is cupped the same morning; 86.4 average so far this season.",
  },
  {
    n: "02",
    title: "Friday — in the mail",
    copy: "Mailed the day it roasts. U.S. transit runs 2–4 days, shipping is free from $40, and Portland metro gets a bicycle courier within 24 hours.",
  },
  {
    n: "03",
    title: "Day 3–10 — the window",
    copy: "Rest two days after roast, then brew hard for a week. That is peak coffee — our job is to land you in the middle of it.",
  },
];

export function RoastCurve() {
  return (
    <section
      id="roasting"
      aria-labelledby="roast-log-title"
      className="border-y border-border bg-[#201409] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="stamp w-fit text-muted-foreground">The roast log</p>
              <h2
                id="roast-log-title"
                className="font-heading mt-6 text-display-md font-medium tracking-tight text-foreground"
              >
                Every batch leaves a record.
              </h2>
              <p className="mt-5 max-w-sm text-muted-foreground">
                Charge, turning point, first crack, drop — plotted in real time,
                eight kilos at a time. This is batch 2217, Nº 07 Huila, from
                Thursday. The same curve prints on every bag.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delayMs={120}>
              <div className="rounded-xl border border-border bg-card p-5 shadow-xs lg:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-sm font-semibold text-foreground">
                    BATCH 2217 — Nº 07 · HUILA
                  </p>
                  <p className="font-mono text-sm text-muted-foreground">
                    PROBAT UG-22 · 12 KG DRUM · THU 29 OCT 2026
                  </p>
                </div>

                <div className="mt-5">
                  <LineChart
                    data={CURVE}
                    index="time"
                    categories={["bean"]}
                    colors={["orange"]}
                    className="roast-chart h-72 w-full sm:h-80"
                    yAxisWidth={46}
                    showLegend={false}
                    curveType="natural"
                    valueFormatter={(value) => `${Math.round(value)}°`}
                    customTooltip={CurveTooltip}
                    minValue={90}
                    maxValue={214}
                  />
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-5 sm:grid-cols-5">
                  {LOG.map((entry) => (
                    <div key={entry.label}>
                      <dt className="text-xs font-medium uppercase tracking-[0.04em] text-muted-foreground">
                        {entry.label}
                      </dt>
                      <dd className="mt-1 font-mono text-sm tabular-nums text-foreground">
                        {entry.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>

        <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => (
            <Reveal
              key={step.n}
              as="li"
              delayMs={index * 120}
              className={cn(
                "relative pl-14",
                index === 1 && "md:mt-10",
                index === 2 && "md:mt-20",
              )}
            >
              <span
                aria-hidden="true"
                className="font-mono absolute top-0.5 left-0 text-sm font-semibold text-primary-hover"
              >
                {step.n}
              </span>
              <h3 className="font-heading text-xl font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-2.5 text-base text-muted-foreground">{step.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
