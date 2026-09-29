import Image from "next/image";

type ComplianceHeroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
};

export function ComplianceHero({
  eyebrow,
  title,
  description,
  image,
}: ComplianceHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-900 px-6 pb-28 pt-32 text-ivory-100 md:px-12 lg:min-h-[560px] lg:px-20 lg:pb-36">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-gold-500/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/5 blur-3xl"
      />

      {/* Diagonal image */}
      {image && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
        >
          <div
            className="
              absolute
              -right-[7%]
              -top-[10%]
              h-[125%]
              w-[58%]
              overflow-hidden
            "
            style={{
              clipPath:
                "polygon(32% 0%, 100% 0%, 70% 100%, 0% 100%)",
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

            {/* Forest tint */}
            <div className="absolute inset-0 bg-forest-900/30" />

            {/* Fade into content */}
            <div className="absolute inset-0 bg-gradient-to-r from-forest-900/90 via-forest-900/35 to-transparent" />

            {/* Subtle gold atmosphere */}
            <div className="absolute inset-0 bg-gold-500/5 mix-blend-screen" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-4xl lg:min-h-[390px] lg:flex lg:flex-col lg:justify-center">
          {eyebrow && (
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-[#a07a3d]">
              {eyebrow}
            </p>
          )}

          {title && (
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              {title}
            </h1>
          )}

          {description && (
            <p className="mt-8 max-w-3xl text-lg leading-8 text-ivory-100/60 md:text-xl">
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

            <div className="absolute inset-0 bg-forest-900/20" />

            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 to-transparent" />
          </div>
        )}
      </div>
    </section>
  );
}
