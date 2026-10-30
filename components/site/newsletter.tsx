"use client";

import * as React from "react";
import { CircleCheckIcon, LoaderCircleIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const touched = React.useRef(false);

  const valid = EMAIL_RE.test(email.trim());

  const describe = (nextEmail: string, wasTouched: boolean) => {
    if (!wasTouched) return null;
    if (nextEmail.trim().length === 0) {
      return "Enter an email address so we know where the drop list goes.";
    }
    if (!EMAIL_RE.test(nextEmail.trim())) {
      return "That address doesn’t look right — try you@yourplace.com.";
    }
    return null;
  };

  return (
    <section id="drop" aria-labelledby="drop-title" className="pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-10 rounded-2xl border border-border bg-card p-7 shadow-xs sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-12">
            <div className="lg:col-span-7">
              <p className="stamp w-fit text-muted-foreground">
                First crack, first to know
              </p>
              <h2
                id="drop-title"
                className="font-heading mt-5 text-2xl font-medium tracking-tight text-foreground lg:text-3xl"
              >
                One email every Thursday.
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                What roasted, what&apos;s running low, and the cupping scores
                from the table — in about sixty seconds. No spam, no “last
                chance” countdowns, unsubscribe in one click.
              </p>
              <p className="mt-5 hidden font-mono text-sm text-muted-foreground lg:block">
                SENT THURSDAYS · 4,208 READERS · AVG READ TIME 00:47
              </p>
            </div>

            <div className="lg:col-span-5">
              {done ? (
                <div
                  role="status"
                  className="animate-fade-up flex flex-col items-start gap-3 rounded-xl border border-border bg-popover p-6 shadow-xs"
                >
                  <CircleCheckIcon className="size-6 text-success" aria-hidden="true" />
                  <p className="font-medium text-foreground">
                    You&apos;re on the list.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    First drop note lands Thursday, November 5. Roasted that
                    same morning, shipped Friday.
                  </p>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={(event) => {
                    event.preventDefault();
                    touched.current = true;
                    const nextError = describe(email, true);
                    setError(nextError);
                    if (nextError) return;
                    setLoading(true);
                    window.setTimeout(() => {
                      setLoading(false);
                      setDone(true);
                    }, 900);
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="drop-email" className="text-base font-medium">
                      Email address
                    </Label>
                    <Input
                      id="drop-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@yourplace.com"
                      value={email}
                      onChange={(event) => {
                        const next = event.target.value;
                        setEmail(next);
                        setError(describe(next, touched.current));
                      }}
                      onBlur={() => {
                        touched.current = true;
                        setError(describe(email, true));
                      }}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? "drop-email-error" : "drop-email-helper"}
                      className="h-12 rounded-lg bg-input/20 text-base"
                      disabled={loading}
                    />
                    <p
                      id="drop-email-helper"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      We send once a week, Thursday mornings.
                    </p>
                    {error ? (
                      <p
                        id="drop-email-error"
                        role="alert"
                        className="text-sm font-medium text-destructive"
                      >
                        {error}
                      </p>
                    ) : null}
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="mt-5 h-12 w-full text-base"
                  >
                    {loading ? (
                      <>
                        <LoaderCircleIcon className="animate-spin" aria-hidden="true" />
                        Joining…
                      </>
                    ) : (
                      "Get the drop list"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
