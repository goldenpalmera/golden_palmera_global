import type { Metadata } from "next";
import InquiryForm from "@/components/inquiry/InquiryForm";
import Image from "next/image";
import { getPartnershipPage } from "@/content/contact/getPartnershipPage";
import { getHeroImageUrl } from "@/content/shared/getHeroImageUrl";
import { mapPartnershipPage } from "@/content/contact/mappers";
import { getContactMetadata } from "@/content/contact/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const sanityPage = await getPartnershipPage();
  const page = mapPartnershipPage(sanityPage);

  return getContactMetadata(page.seo);
};

export default async function PartnershipPage() {
  const sanityPage = await getPartnershipPage();

  const page = mapPartnershipPage(sanityPage)

  const heroImage = getHeroImageUrl(
    page?.heroImage ?? null,
    1920,
    1080,
  );
  return (
    <main className="bg-[#f8f6f0] text-[#171717]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#173f2b] px-6 py-24 text-white md:px-10 lg:min-h-[620px] lg:px-16 lg:py-14">
        {/* Background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
        >
          <div className="absolute left-[20%] top-0 h-full w-px bg-white" />
          <div className="absolute left-[50%] top-0 h-full w-px bg-white" />
          <div className="absolute left-[80%] top-0 h-full w-px bg-white" />
        </div>

        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#b78628]/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/5 blur-3xl"
        />

        {/* Diagonal image */}
        {heroImage && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            <div
              className="
                absolute
                -right-[6%]
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
                src={heroImage}
                alt="Partnership with Africans premium agriculture international trade house"
                fill
                priority
                sizes="58vw"
                className="object-cover object-center"
              />

              {/* Green brand tint */}
              <div className="absolute inset-0 bg-[#173f2b]/25" />

              {/* Fade image into the text */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#173f2b]/85 via-[#173f2b]/30 to-transparent" />

              {/* Very subtle gold tone */}
              <div className="absolute inset-0 bg-[#b78628]/5 mix-blend-screen" />
            </div>
          </div>
          )}

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="mt-10 max-w-6xl lg:min-h-[470px] lg:flex lg:flex-col lg:justify-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[#d6b45c]">
               { page?.heroEyebrow }
            </p>

            <h1 className="mt-7 max-w-5xl text-[clamp(4rem,9vw,8.5rem)] font-medium leading-[0.85] tracking-[-0.07em]">
              { page?.heroTitleLine1 }
              <br />
              <span className="text-gold-500">
                { page?.heroTitleAccent }
              </span>
            </h1>

            <p className="mt-10 max-w-2xl text-lg leading-8 text-white/60 md:text-xl">
              { page?.heroDescription }
            </p>
          </div>

          {/* Mobile image */}
          {heroImage && (
            <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 lg:hidden">
              <Image
                src={heroImage}
                alt="Partnership with Africans premium agriculture international trade house"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-[#173f2b]/20" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#173f2b]/50 to-transparent" />
            </div>
          )}
        </div>
      </section>


      {/* Partnership section */}
      <section className="px-6 py-24 md:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* Left content */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
              { page?.contentEyebrow }
            </p>

            <h2 className="mt-6 max-w-xl text-4xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl">
              { page?.contentTitleLine1 }
              <br />
              { page?.contentTitleLine2 }
            </h2>

            <p className="mt-8 max-w-lg text-sm leading-7 text-black/55">
              { page?.contentDescription }
            </p>

            <div className="mt-12 border-t border-black/10 pt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                { page?.partnershipTypesEyebrow }
              </p>

              <div className="mt-6 space-y-4">
                {page?.partnershipTypes?.map((item) => (
                  <PartnerPoint key={item}>
                    {item}
                  </PartnerPoint>
                ))}
              </div>
            </div>

            <div className="mt-12 border-l-2 border-[#b7924a] pl-5">
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                { page?.nextStepsEyebrow }
              </p>

              <p className="mt-4 text-sm leading-7 text-black/55">
                { page?.nextStepsDescription }
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.04)] sm:p-10 lg:p-12">
            <div className="mb-10 border-b border-black/10 pb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
                { page?.formEyebrow }
              </p>

              <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] md:text-4xl">
                { page?.formTitleLine1 }
                <br />
                { page?.formTitleLine2 }
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-black/50">
                { page?.formDescription }
              </p>
            </div>

            <InquiryForm type="partnership" />
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="bg-[#b7924a] px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            { page?.closingEyebrow }
          </p>

          <h2 className="mt-8 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">
            { page?.closingTitleLine1 }
            <br />
            { page?.closingTitleLine2 }
          </h2>
        </div>
      </section>
    </main>
  );
}

function PartnerPoint({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 text-sm text-black/65">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#b7924a]/40 text-xs text-[#8c6d35]">
        +
      </span>

      <span>{children}</span>
    </div>
  );
}