import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#173f2b] pt-36 pb-24 text-white lg:min-h-[560px]">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#b78628]/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-white/5 blur-3xl"
      />

      {/* Desktop diagonal image */}
      {image && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
        >
          <div
            className="
              absolute
              -right-[8%]
              -top-[12%]
              h-[125%]
              w-[58%]
              overflow-hidden
            "
            style={{
              clipPath:
                "polygon(28% 0%, 100% 0%, 72% 100%, 0% 100%)",
            }}
          >
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="58vw"
              className="object-cover object-center"
            />

            {/* Brand tint */}
            <div className="absolute inset-0 bg-[#173f2b]/20" />

            {/* Left-side fade for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#173f2b]/70 via-[#173f2b]/20 to-transparent" />

            {/* Subtle gold tone */}
            <div className="absolute inset-0 bg-[#b78628]/5 mix-blend-screen" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl lg:min-h-[410px] lg:flex lg:flex-col lg:justify-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#d6b45c]">
            {eyebrow}
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {description && (
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              {description}
            </p>
          )}
        </div>

        {/* Mobile image */}
        {image && (
          <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 lg:hidden">
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-[#173f2b]/20" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#173f2b]/40 to-transparent" />
          </div>
        )}
      </div>
    </section>
  );
}
