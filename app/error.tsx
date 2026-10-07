"use client";

import Link from "next/link";
import { BrandSeal } from "@/components/sharedComponents/BrandSeal";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  reset,
}: ErrorPageProps) {
  return (
    <main className="gpg-system-page">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <BrandSeal
          size="md"
          showLabel
          float
          ripple
        />

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold-500)]">
          Something went wrong
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          We couldn't complete that request
        </h1>

        <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
          An unexpected error occurred. Please try again. If the problem
          continues, return to the homepage and try again later.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--gold-500)] px-6 py-3 text-sm font-medium text-[var(--forest-950)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--gold-500)] focus:ring-offset-2"
          >
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[var(--gold-500)] focus:ring-offset-2"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}