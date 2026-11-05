import Image from "next/image";
import { getHeroImageUrl } from "@/content/shared/getHeroImageUrl";
import { SanityImageSource } from "@sanity/image-url";

type ComplianceHeroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: SanityImageSource | null;
};

export function ComplianceHero({
  eyebrow,
  title,
  description,
  image,
}: ComplianceHeroProps) {

  const heroImageUrl = getHeroImageUrl(
    image ?? null,
    1920,
    1080,
  );

  return (
    <section className="relative isolate overflow-hidden bg-forest-900 px-6 pb-28 pt-32 text-ivory-100 md:px-12 lg:min-h-[560px] lg:px-20 lg:pb-36">

      {/* Full background image */}
      {heroImageUrl && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Subtle forest tint */}
          <div className="absolute inset-0 bg-forest-900/25" />

          {/* Gentle gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/65 via-forest-900/30 to-transparent" />

          {/* Soft vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
        </div>
      )}

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-gold-500/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/5 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex min-h-[390px] max-w-4xl flex-col justify-center">

          {eyebrow && (
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-[#d6b45c]">
              {eyebrow}
            </p>
          )}

          {title && (
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              {title}
            </h1>
          )}

          {description && (
            <p className="mt-8 max-w-3xl text-lg leading-8 text-ivory-100/85 md:text-xl">
              {description}
            </p>
          )}

        </div>
      </div>
    </section>
  );
}