import type { Metadata } from "next";
import InquiryForm from "@/components/inquiry/InquiryForm";
import Image from "next/image";
import { getHeroImageUrl } from "@/content/shared/getHeroImageUrl";
import { getExportBuyerPage } from "@/content/contact/getExportBuyerPage";
import { getContactMetadata } from "@/content/contact/metadata";
import { mapExportBuyerPage } from "@/content/contact/mappers";

export async function generateMetadata(): Promise<Metadata> {
  const sanityPage = await getExportBuyerPage();
  const page = mapExportBuyerPage(sanityPage);

  return getContactMetadata(page.seo);
};

export default async function ExportBuyerPage() {
  const sanityPage = await getExportBuyerPage();
  const page = mapExportBuyerPage(sanityPage);

  const heroImage = getHeroImageUrl(
    page?.heroImage ?? null,
    1920,
    1080,
  );

  return (
    <main className="bg-[#f8f6f0] text-[#171717]">
    
      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        {/* Ambient glow */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-900/20 blur-3xl" />

        <div className="relative min-h-[680px]">
          {/* Diagonal hero image */}
          {heroImage && (
            <div
              className="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                hidden
                w-[56%]
                lg:block
              "
              style={{
                clipPath:
                  "polygon(38% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            >
              <Image
                src={heroImage}
                alt="Agricultural commodities prepared for international export"
                fill
                priority
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Dark image treatment */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Fade image into the text */}
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/35 to-transparent" />

              {/* Subtle green tone */}
              <div className="absolute inset-0 bg-[#173f2b]/20 mix-blend-multiply" />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 mx-auto flex min-h-[680px] max-w-[1400px] items-center px-6 md:px-10 lg:px-16">
            <div className="max-w-3xl py-28 lg:w-[58%]">
              <p className="text-xs uppercase tracking-[0.3em] text-[#d6b45c]">
                { page?.heroEyebrow }
              </p>

              <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.92] tracking-[-0.06em] md:text-7xl lg:text-8xl">
                { page?.heroTitleLine1 }
                <br />
                { page?.heroTitleLine2 }
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
                { page?.heroDescription }
              </p>
            </div>
          </div>

          {/* Mobile image */}
          {heroImage && (
            <div className="relative mx-6 mb-10 aspect-[16/9] overflow-hidden rounded-3xl md:mx-10 lg:hidden">
              <Image
                src={heroImage}
                alt="Agricultural commodities prepared for international export"
                fill
                sizes="100vw"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent" />
            </div>
          )}
        </div>
      </section>

      {/* Main */}
      <section className="px-6 py-20 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          {/* Left */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
              { page?.sourceEyebrow }
            </p>

            <h2 className="mt-7 max-w-lg text-4xl font-medium leading-[0.98] tracking-[-0.05em] md:text-5xl">
              { page?.sourceTitle }
            </h2>

            <p className="mt-7 max-w-md text-sm leading-7 text-black/55">
              { page?.sourceDescription }
            </p>

            <div className="mt-12 border-t border-black/10 pt-8">
            {page?.buyerSteps?.map((step) => (
              <BuyerStep key={step.number}
                number={step.number}
                title={step.title}
                text={step.text}
              />
            ))}
            </div>

            <div className="mt-12 border-l-2 border-[#b7924a] pl-5">
              <p className="text-sm font-medium">
                { page?.availabilityTitle }
              </p>

              <p className="mt-2 text-xs leading-5 text-black/45">
                { page?.availabilityDescription }
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <InquiryForm type="export_buyer" />
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className="bg-[#173f2b] px-6 py-24 text-white md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d6b45c]">
            { page?.bottomEyebrow }
          </p>

          <h2 className="mt-7 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">
            { page?.bottomTitleLine1 }
            <br />
            { page?.bottomTitleLine2 }
          </h2>
        </div>
      </section>
    </main>
  );
}

function BuyerStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-5 border-b border-black/10 py-6 first:pt-0">
      <span className="font-mono text-xs text-[#8c6d35]">
        {number}
      </span>

      <div>
        <h3 className="text-sm font-semibold">
          {title}
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-black/50">
          {text}
        </p>
      </div>
    </div>
  );
}