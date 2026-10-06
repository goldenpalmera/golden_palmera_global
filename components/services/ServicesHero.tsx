"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import { getHeroImageUrl } from "@/content/shared/getHeroImageUrl";

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
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
    <section className="relative min-h-[78vh] overflow-hidden bg-[#171717] text-white">
      {/* Ambient mouse light */}
      <div
        className="pointer-events-none fixed z-0 h-[500px] w-[500px] rounded-full bg-[#b7924a]/10 blur-[120px] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouse.x - 250}px, ${
            mouse.y - 250
          }px, 0)`,
        }}
      />

      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute left-[16%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[84%] top-0 h-full w-px bg-white" />
      </div>

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

          {/* Upper Left */}
          {image1 && (
            <div
              className="absolute inset-0"
              style={{
                clipPath:
                  "polygon(32% 0%, 50% 0%, 50% 50%, 0% 50%)",
              }}
            >
              <Image
                src={image1.src}
                alt={image1.alt}
                fill
                priority
                sizes="31vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 bg-[#171717]/15 mix-blend-multiply" />
            </div>
          )}

          {/* Upper Right */}
          {image2 && (
            <div
              className="absolute inset-0"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%)",
              }}
            >
              <Image
                src={image2.src}
                alt={image2.alt}
                fill
                sizes="31vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 bg-[#171717]/15 mix-blend-multiply" />
            </div>
          )}

          {/* Lower Left */}
          {image3 && (
            <div
              className="absolute inset-0"
              style={{
                clipPath:
                  "polygon(0% 50%, 50% 50%, 50% 100%, 0% 100%)",
              }}
            >
              <Image
                src={image3.src}
                alt={image3.alt}
                fill
                sizes="31vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 bg-[#171717]/15 mix-blend-multiply" />
            </div>
          )}

          {/* Lower Right */}
          {image4 && (
            <div
              className="absolute inset-0"
              style={{
                clipPath:
                  "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
              }}
            >
              <Image
                src={image4.src}
                alt={image4.alt}
                fill
                sizes="31vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 bg-[#171717]/15 mix-blend-multiply" />
            </div>
          )}

          {/* Image → content blend */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #171717 0%, rgba(23,23,23,0.75) 14%, rgba(23,23,23,0.2) 32%, transparent 48%)",
            }}
          />
        </div>
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}
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
            <>
              {title1 || `Moving`}
              <br />
              <span className="text-white/35">
                {title2 || `agriculture`}
              </span>
              <br />
              {title3 || `forward.`}
            </>
          </h1>

          <div className="mt-10 flex max-w-2xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-base leading-7 text-white/55 md:text-lg">
              {description ??
                "We connect agricultural producers, processors and international markets through reliable sourcing, value addition, quality management and export services."}
            </p>

            <div className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-white/35">
              Scroll to explore
              <span className="ml-3 text-[#b7924a]">
                ↓
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE
          ===================================================== */}
      {heroImages.length > 0 && (
        <div className="relative z-10 mx-6 mb-8 h-[420px] overflow-hidden rounded-3xl md:mx-10 lg:hidden">
          <div className="relative h-full w-full">

            {/* Upper Left */}
            {image1 && (
              <div
                className="absolute inset-0"
                style={{
                  clipPath:
                    "polygon(0 0, 50% 0, 50% 50%, 0 50%)",
                }}
              >
                <Image
                  src={image1.src}
                  alt={image1.alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            )}

            {/* Upper Right */}
            {image2 && (
              <div
                className="absolute inset-0"
                style={{
                  clipPath:
                    "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)",
                }}
              >
                <Image
                  src={image2.src}
                  alt={image2.alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            )}

            {/* Lower Left */}
            {image3 && (
              <div
                className="absolute inset-0"
                style={{
                  clipPath:
                    "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)",
                }}
              >
                <Image
                  src={image3.src}
                  alt={image3.alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            )}

            {/* Lower Right */}
            {image4 && (
              <div
                className="absolute inset-0"
                style={{
                  clipPath:
                    "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
                }}
              >
                <Image
                  src={image4.src}
                  alt={image4.alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/40 to-transparent" />
          </div>
        </div>
      )}
    </section>
  );
}