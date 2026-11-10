import Image from "next/image";
import Link from "next/link";
import type { ServicePageData } from "@/content/services/types";
import { getHeroImageUrl } from "@/content/shared/getHeroImageUrl";

type Props = {
  service: ServicePageData;
};

export function ServiceHero({ service }: Props) {
  const serviceImages = (service.heroImages ?? [])
    .slice(0, 4)
    .map((image) => ({
      src: getHeroImageUrl(image ?? null, 1920, 1080),
      alt: image?.alt ?? "",
    }))
    .filter(
      (image): image is { src: string; alt: string } =>
        Boolean(image.src),
    );

  const [image1, image2, image3, image4] = serviceImages;

  const imageSizes = "(min-width: 1024px) 31vw, 50vw";

  return (
    <section className="relative isolate min-h-[68svh] overflow-hidden bg-[#173f2b] text-[#f8f6f0]">

      {/* Decorative circle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[-30%] z-0 h-[600px] w-[600px] rounded-full border border-white/10"
      />

      {/* Background images */}
      {serviceImages.length > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {/* Image grid */}
          {image1 && (
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)",
              }}
            >
              <Image
                src={image1.src}
                alt=""
                fill
                priority
                sizes="50vw"
                className="object-cover"
              />
            </div>
          )}

          {image2 && (
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)",
              }}
            >
              <Image
                src={image2.src}
                alt=""
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          )}

          {image3 && (
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)",
              }}
            >
              <Image
                src={image3.src}
                alt=""
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          )}

          {image4 && (
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
              }}
            >
              <Image
                src={image4.src}
                alt=""
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          )}

          {/* Forest tint */}
          <div className="absolute inset-0 bg-[#173f2b]/25" />

          {/* Text readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#173f2b]/75 via-[#173f2b]/40 to-[#173f2b]/10" />

          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#173f2b]/50 via-transparent to-[#173f2b]/15" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[68svh] max-w-[1400px] flex-col px-6 py-10 md:px-10 lg:px-16 lg:py-14">

        {/* Navigation */}
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/85 transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Back to services
          </Link>
        </div>

        {/* Hero content */}
        <div className="flex flex-1 items-end pb-6 pt-24 lg:pb-10">
          <div className="max-w-5xl lg:max-w-[62%]">

            <span className="mb-6 block font-mono text-sm text-[#d6b45c]">
              {service.number}
            </span>

            {service.category && (
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#d6b45c]">
                {service.category}
              </p>
            )}

            <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.88] tracking-[-0.07em]">
              {service.title}
            </h1>

            {service.shortDescription && (
              <p className="mt-10 max-w-3xl text-xl leading-relaxed text-white/85 md:text-2xl">
                {service.shortDescription}
              </p>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}