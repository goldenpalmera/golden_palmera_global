import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { getHeroImageUrl } from "@/content/shared/getHeroImageUrl";
import { MouseGlowCanvas } from "../sharedComponents/MouseGlowCanvas";

type HeroImage = SanityImageSource & {
  alt?: string;
};

type ServicesHeroProps = {
  eyebrow?: string;
  title1?: string;
  title2?: string;
  title3?: string;
  description?: string;
  images?: HeroImage[];
};

export default function ServicesHero({
  eyebrow,
  title1,
  title2,
  title3,
  description,
  images = [],
}: ServicesHeroProps) {
  const heroImages = (images ?? [])
    .slice(0, 4)
    .map((image) => ({
      src: getHeroImageUrl(image ?? null, 1920, 1080),
      alt: image?.alt ?? "",
    }))
    .filter(
      (image): image is { src: string; alt: string } =>
        Boolean(image.src),
    );

  const [image1, image2, image3, image4] = heroImages;

  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-[#171717] text-white">

      {/* Four-image background collage */}
      {heroImages.length > 0 && (
        <div className="absolute inset-0 -z-10">
          <div className="grid h-full w-full grid-cols-2 grid-rows-2">
            {image1 && (
              <div className="relative overflow-hidden">
                <Image
                  src={image1.src}
                  alt={image1.alt}
                  fill
                  priority
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            )}

            {image2 && (
              <div className="relative overflow-hidden">
                <Image
                  src={image2.src}
                  alt={image2.alt}
                  fill
                  priority
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            )}

            {image3 && (
              <div className="relative overflow-hidden">
                <Image
                  src={image3.src}
                  alt={image3.alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            )}

            {image4 && (
              <div className="relative overflow-hidden">
                <Image
                  src={image4.src}
                  alt={image4.alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Dark image treatment */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/95 via-[#171717]/75 to-[#171717]/50" />

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/65 via-transparent to-[#171717]/25" />

          {/* Subtle green brand tone */}
          <div className="absolute inset-0 bg-[#173f2b]/15 mix-blend-multiply" />
        </div>
      )}

      {/* Ambient mouse light */}
      <MouseGlowCanvas />

      {/* Decorative lines */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.08]">
        <div className="absolute left-[16%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[84%] top-0 h-full w-px bg-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-[1400px] flex-col justify-between px-6 py-10 md:px-10 lg:px-16 lg:py-14">

        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.3em] text-white/45">
            Golden Palmera Global
          </span>

          <span className="font-mono text-xs text-[#b7924a]">
            SERVICES / 01
          </span>
        </div>

        <div className="max-w-6xl pb-8">
          <p className="mb-7 text-xs uppercase tracking-[0.35em] text-[#b7924a]">
            {eyebrow ?? "From source to global market"}
          </p>

          <h1 className="max-w-5xl text-[clamp(4rem,10vw,9.5rem)] font-medium leading-[0.84] tracking-[-0.07em]">
            {title1 || "Moving"}
            <br />
            <span className="text-white/35">
              {title2 || "agriculture"}
            </span>
            <br />
            {title3 || "forward."}
          </h1>

          <div className="mt-10 flex max-w-2xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-base leading-7 text-white/70 md:text-lg">
              {description ??
                "We connect agricultural producers, processors and international markets through reliable sourcing, value addition, quality management and export services."}
            </p>

            <div className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
              Scroll to explore
              <span className="ml-3 text-[#b7924a]">
                ↓
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}