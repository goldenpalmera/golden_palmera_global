import Link from "next/link";
import { BrandSeal } from "@/components/sharedComponents/BrandSeal";

export default function NotFound() {
  return (
    <main className="gpg-system-page">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <BrandSeal
          size="md"
          showLabel
          float
          ripple
        />

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em]">
          404
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-4 text-base leading-7 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--gold-500)] px-6 py-3 text-sm font-medium text-[var(--forest-950)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--gold-500)] focus:ring-offset-2"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}