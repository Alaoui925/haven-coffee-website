"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/site/reveal";

const FAQS = [
  {
    q: "Whole bean or ground?",
    a: "Both — pick per delivery. Whole bean keeps the flavor window longest, so it is the default; we grind on roast day for filter, espresso, or press and lose you about a day of peak.",
  },
  {
    q: "Where do you ship, and how much?",
    a: "Everywhere in the U.S. Shipping is a flat $5, free over $40. Portland metro gets bicycle courier delivery within 24 hours of roasting.",
  },
  {
    q: "How fresh is “fresh”?",
    a: "We roast the Thursday before your delivery and mail by Friday. Transit adds two to four days, so most bags land between roast day 3 and 7 — dead center of the flavor window.",
  },
  {
    q: "Can I pause or cancel?",
    a: "Any delivery, any time, from your account page or a one-line email. No calls, no retention maze, no lock-in.",
  },
  {
    q: "What is in Boilerhouse Nº 21?",
    a: "Three origins — this season Brazil honey, Colombia washed, and Sumatra wet-hulled — tuned as espresso but sweet enough to read clean black. The formula rotates quarterly.",
  },
] as const;

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="stamp w-fit text-muted-foreground">Fine print</p>
              <h2
                id="faq-title"
                className="font-heading mt-6 text-display-md font-medium tracking-tight text-foreground"
              >
                Questions, answered.
              </h2>
              <p className="mt-5 max-w-sm text-muted-foreground">
                Anything else — the tasting bar answers email on weekdays at{" "}
                <a
                  href="mailto:hello@slowfireroasting.coffee"
                  className="font-medium text-foreground underline decoration-[#9a7b5c] underline-offset-4 transition-colors hover:text-primary-hover"
                >
                  hello@slowfireroasting.coffee
                </a>
                .
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delayMs={100}>
              <Accordion
                type="single"
                collapsible
                className="border-t border-border"
              >
                {FAQS.map((item, index) => (
                  <AccordionItem key={item.q} value={`faq-${index}`} className="border-b border-border">
                    <AccordionTrigger className="py-5 text-base font-medium hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-2xl">
                      <p className="pb-4 text-base leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
