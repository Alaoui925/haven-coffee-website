import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-105 overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(70%_70%_at_72%_10%,black,transparent)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pt-30 pb-16 sm:px-6 sm:pt-36 lg:grid-cols-12 lg:pt-40 lg:pb-24 lg:gap-10 lg:px-8">
        <div className="lg:col-span-7">
          <p className="stamp animate-fade-up w-fit text-muted-foreground [animation-delay:60ms]">
            Small-batch roastery · Portland, OR · est. 2018
          </p>

          <h1
            id="hero-title"
            className="font-heading mt-7 text-display font-medium tracking-tight text-foreground"
          >
            <span className="animate-fade-up block [animation-delay:150ms]">
              Roasted the slow way.
            </span>
            <span className="animate-fade-up block text-primary italic [animation-delay:260ms]">
              Poured at its peak.
            </span>
          </h1>

          <p className="animate-fade-up mt-6 max-w-[38rem] text-lg text-muted-foreground [animation-delay:360ms]">
            Fourteen single origins and one obsessive blend, roasted eight kilos at a
            time on a 1962 Probat — and mailed within 48 hours of first crack, so
            every bag lands inside its two-week flavor window.
          </p>

          <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-3 [animation-delay:460ms]">
            <Button asChild size="lg" className="h-12 px-7 text-base">
              <a href="#plans">Start your plan</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="group h-12 px-5 text-base text-foreground/85 hover:text-foreground"
            >
              <a href="#roasts">
                Browse this week&apos;s roasts
                <ArrowRightIcon
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </Button>
          </div>

          <p className="animate-fade-up mt-5 font-mono text-sm font-medium text-muted-foreground [animation-delay:560ms]">
            Next drop · Thu Nov 5 — roasted that morning, shipped Fri Nov 6
          </p>
        </div>

        <div className="relative lg:col-span-5">
          <div className="animate-fade-up relative [animation-delay:480ms]">
            <div className="relative aspect-4/5 overflow-hidden rounded-xl border border-border shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1080&auto=format&fit=crop"
                alt="A gooseneck kettle pouring hot water into a coffee cup, lit dark and warm"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#171009]/55 via-transparent to-transparent"
              />
            </div>

            <div className="animate-fade-up absolute -bottom-7 -left-5 max-w-[20rem] -rotate-3 rounded-lg border border-input bg-popover p-4 shadow-xl [animation-delay:680ms] sm:-left-7">
              <p className="font-mono text-sm font-semibold text-foreground">
                ROAST Nº 07 — HUILA, COLOMBIA
              </p>
              <p className="mt-1.5 font-mono text-sm text-muted-foreground">
                CHARGE 200°C · FIRST CRACK 9:40 · DROP 11:50
              </p>
              <p className="mt-1.5 font-mono text-sm font-medium text-primary-hover">
                ROASTED THU 29 OCT — SHIPS FRI
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
