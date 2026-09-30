import Image from "next/image";
import Link from "next/link";

import type { ServicePageData } from "@/content/services/types";

type Props = {
  service: ServicePageData;
};

const serviceImages = [
  "/images/agriculture/agriculture.jpg",
  "/images/agriculture/commodity.jpg",
  "/images/agriculture/logistics.jpg",
  "/images/agriculture/consulting.jpg",
];

export function ServiceHero({ service }: Props) {
  return (
    <section className="relative min-h-[68vh] overflow-hidden bg-[#173f2b] text-[#f8f6f0]">
      {/* Decorative circle */}
      <div className="pointer-events-none absolute right-[-10%] top-[-30%] z-0 h-[600px] w-[600px] rounded-full border border-white/10" />

      {/* =====================================================
          DESKTOP IMAGE COMPOSITION
          ===================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          z-[1]
          hidden
          w-[62%]
          lg:block
        "
      >
        <div className="relative h-full w-full overflow-hidden">
          {/* -----------------------------------------------
              UPPER LEFT
              Triangle created by the hero diagonal
              ----------------------------------------------- */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(32% 0%, 50% 0%, 50% 50%, 0% 50%)",
            }}
          >
            <Image
              src={serviceImages[0]}
              alt=""
              fill
              priority
              sizes="31vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-[#173f2b]/15 mix-blend-multiply" />
          </div>

          {/* -----------------------------------------------
              UPPER RIGHT
              Full rectangular image
              ----------------------------------------------- */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%)",
            }}
          >
            <Image
              src={serviceImages[1]}
              alt=""
              fill
              sizes="31vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-[#173f2b]/15 mix-blend-multiply" />
          </div>

          {/* -----------------------------------------------
              LOWER LEFT
              Wide rectangle/trapezoid.

              The top edge begins at the diagonal,
              while the bottom remains completely horizontal.
              ----------------------------------------------- */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(0% 50%, 50% 50%, 50% 100%, 0% 100%)",
            }}
          >
            <Image
              src={serviceImages[2]}
              alt=""
              fill
              sizes="31vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-[#173f2b]/15 mix-blend-multiply" />
          </div>

          {/* -----------------------------------------------
              LOWER RIGHT
              Full rectangular image
              ----------------------------------------------- */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
            }}
          >
            <Image
              src={serviceImages[3]}
              alt=""
              fill
              sizes="31vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-[#173f2b]/15 mix-blend-multiply" />
          </div>

          {/* ------------------------------------------------
              SINGLE DIAGONAL BLEND

              This gives the left side of the composition
              the same dark-to-image transition as ContactHero.
              ------------------------------------------------ */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #173f2b 0%, rgba(23,63,43,0.75) 14%, rgba(23,63,43,0.2) 32%, transparent 48%)",
            }}
          />
        </div>
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}
      <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-[1400px] flex-col px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        {/* Back navigation */}
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Back to services
          </Link>
        </div>

        {/* Hero content */}
        <div className="flex flex-1 items-end pb-6 pt-24 lg:pb-10">
          <div className="max-w-5xl lg:max-w-[62%]">
            <span className="mb-6 block font-mono text-sm text-[#b7924a]">
              {service.number}
            </span>

            {service.category && (
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#b7924a]">
                {service.category}
              </p>
            )}

            <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.88] tracking-[-0.07em]">
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

      {/* =====================================================
          MOBILE
          ===================================================== */}
      <div className="relative z-10 mx-6 mb-8 h-[420px] overflow-hidden rounded-3xl md:mx-10 lg:hidden">
        <div className="relative h-full w-full">
          {/* Upper left */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)",
            }}
          >
            <Image
              src={serviceImages[0]}
              alt=""
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          {/* Upper right */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)",
            }}
          >
            <Image
              src={serviceImages[1]}
              alt=""
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          {/* Lower left */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)",
            }}
          >
            <Image
              src={serviceImages[2]}
              alt=""
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          {/* Lower right */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
            }}
          >
            <Image
              src={serviceImages[3]}
              alt=""
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#173f2b]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
