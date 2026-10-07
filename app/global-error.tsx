"use client";

import Link from "next/link";
import { BrandSeal } from "@/components/sharedComponents/BrandSeal";

type GlobalErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function GlobalError({
  reset,
}: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-[var(--forest-950)] px-6 py-20 text-[var(--ivory-100)]">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <BrandSeal
              size="lg"
              showLabel
              float
              ripple
            />

            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold-500)]">
              System error
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Something went wrong
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/60">
              Golden Palmera Global encountered an unexpected system error.
              Please try again or return to the homepage.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--gold-500)] px-6 py-3 text-sm font-medium text-[var(--forest-950)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--gold-500)] focus:ring-offset-2 focus:ring-offset-[var(--forest-950)]"
              >
                Try again
              </button>

              <Link
                href="/"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[var(--gold-500)] focus:ring-offset-2 focus:ring-offset-[var(--forest-950)]"
              >
                Return home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}