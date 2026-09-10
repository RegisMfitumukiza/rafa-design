"use client";

import { useEffect } from "react";

import { Section } from "@/components/layout/Section";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Site error boundary.
 *
 * Rendered when a runtime error bubbles up from any page within the `(site)`
 * route group, replacing that segment while the root layout (Header/Footer)
 * stays mounted. Under the reduced motion / editorial language of the studio.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section container="narrow" className="py-3xl flex-1">
      <div className="space-y-md">
        <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
          Specification // Runtime Error
        </p>

        <h1 className="font-display text-foreground text-6xl font-medium tracking-tight sm:text-7xl">
          Something failed to load.
        </h1>

        <p className="text-foreground/70 max-w-xl text-lg leading-relaxed font-medium text-balance md:text-xl">
          An error occurred while rendering this part of the archive. The studio is aware of the
          fault — please try again or return to the index.
        </p>

        <div className="gap-sm pt-md flex flex-wrap">
          <button
            type="button"
            onClick={reset}
            className="bg-foreground text-background hover:border-foreground hover:text-foreground gap-xs px-md py-sm inline-flex cursor-pointer items-center rounded-xs border border-transparent font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:bg-transparent"
          >
            RETRY
          </button>
        </div>

        {error.digest ? (
          <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
            Reference // {error.digest}
          </p>
        ) : null}
      </div>
    </Section>
  );
}
