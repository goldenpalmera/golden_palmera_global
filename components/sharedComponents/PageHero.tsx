import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { getHeroImageUrl } from "@/content/shared/getHeroImageUrl";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  image?: SanityImageSource | null;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
}: PageHeroProps) {
  const imageUrl = getHeroImageUrl(image ?? null, 1920, 1080);

  return (
    <section className="relative isolate overflow-hidden bg-[#173f2b] pt-36 pb-24 text-white lg:min-h-[560px]">

      {/* Background image */}
      {imageUrl && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={imageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Dark brand overlay */}
          <div className="absolute inset-0 bg-[#173f2b]/65" />

          {/* Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#173f2b]/90 via-[#173f2b]/65 to-[#173f2b]/35" />

          {/* Subtle gold tone */}
          <div className="absolute inset-0 bg-[#b78628]/5 mix-blend-screen" />
        </div>
      )}

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#b78628]/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-white/5 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex min-h-[410px] max-w-3xl flex-col justify-center">

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#d6b45c]">
            {eyebrow}
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {description && (
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              {description}
            </p>
          )}

        </div>
      </div>
    </section>
  );
}
