"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error boundary.
 *
 * Rendered when an error is not caught by a nested error boundary — runs in
 * place of the root layout, so it must render its own <html>/<body>. A minimal
 * standalone reset is provided so the visitor can recover without a full
 * reload.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground px-md flex min-h-dvh flex-col items-center justify-center font-sans">
        <div className="space-y-md max-w-xl text-center">
          <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
            Specification // Critical Error
          </p>
          <h1 className="font-display text-foreground text-5xl font-medium tracking-tight">
            The studio archive experienced a critical error.
          </h1>
          <p className="text-foreground/70 text-lg leading-relaxed font-medium text-balance">
            Please try again. If the fault persists, reload the page or visit the index.
          </p>
          <div className="gap-sm pt-md flex justify-center">
            <button
              type="button"
              onClick={reset}
              className="bg-foreground text-background hover:border-foreground hover:text-foreground gap-xs px-md py-sm inline-flex cursor-pointer items-center rounded-xs border border-transparent font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:bg-transparent"
            >
              RETRY
            </button>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root { color-scheme: light dark; }
              body {
                background: #ffffff;
                color: #0a0a0a;
                font-family: ui-sans-serif, system-ui, sans-serif;
                -webkit-font-smoothing: antialiased;
                margin: 0;
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
