import Link from "next/link";

import type { ServicePageData } from "@/content/services/types";

type Props = {
  service: ServicePageData;
};

export function ServiceHero({ service }: Props) {
  return (
    <section className="relative overflow-hidden bg-[#173f2b] px-6 py-28 text-[#f8f6f0] md:px-10 md:py-36 lg:px-16 lg:py-44">
      <div className="absolute right-[-10%] top-[-30%] h-[600px] w-[600px] rounded-full border border-white/10" />

      <div className="relative mx-auto max-w-[1400px]">
        <Link
          href="/services"
          className="mb-12 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
        >
          <span>←</span>
          Back to services
        </Link>

        <div className="grid gap-12 lg:grid-cols-[0.25fr_1fr]">
          <div>
            <span className="font-mono text-sm text-[#b7924a]">
              {service.number}
            </span>
          </div>

          <div>
            {service.category && (
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#b7924a]">
                {service.category}
              </p>
            )}

            <h1 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
              {service.title}
            </h1>

            {service.shortDescription && (
              <p className="mt-10 max-w-3xl text-xl leading-relaxed text-white/60 md:text-2xl">
                {service.shortDescription}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
