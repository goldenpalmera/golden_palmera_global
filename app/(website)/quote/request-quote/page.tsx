import QuoteForm from "@/components/quote/QuoteForm";
import type { Metadata } from "next";
import Image from "next/image";
import { getHeroImageUrl } from "@/content/shared/getHeroImageUrl";
import { getRequestQuotePage } from "@/content/contact/getRequestQuotePage";
import { mapRequestQuotePage } from "@/content/contact/mappers";
import { getContactMetadata } from "@/content/contact/metadata";

type RequestQuotePageProps = {
  searchParams: Promise<{
    product?: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const sanityPage = await getRequestQuotePage();
  const page = mapRequestQuotePage(sanityPage);

  return getContactMetadata(page.seo);
};

export default async function RequestQuotePage({
  searchParams,
}: RequestQuotePageProps) {
  const [params, sanityPage] = await Promise.all([
    searchParams,
    getRequestQuotePage(),
  ]);

  const page = mapRequestQuotePage(sanityPage);

  const product = params.product
    ? params.product
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  const heroImage = getHeroImageUrl(
    page?.heroImage ?? null,
    1920,
    1080,
  );

  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-900/20 blur-3xl" />

        <div className="relative min-h-[680px]">

          {/* Desktop diagonal image */}
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
                alt=""
                fill
                priority
                sizes="56vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/35 to-transparent" />

              <div className="absolute inset-0 bg-[#173f2b]/20 mix-blend-multiply" />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 mx-auto flex min-h-[680px] max-w-[1400px] items-center px-6 md:px-10 lg:px-16">
            <div className="max-w-3xl py-28 lg:w-[58%]">

              <p className="text-xs uppercase tracking-[0.3em] text-[#d6b45c]">
                {page?.heroEyebrow}
              </p>

              <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.92] tracking-[-0.06em] md:text-7xl lg:text-8xl">
                {page?.heroTitle}
                <br />
                <span className="text-emerald-400">
                  {page?.heroTitleAccent}
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60 md:text-xl">
                {page?.heroDescription}
              </p>

            </div>
          </div>

          {/* Mobile image */}
          {heroImage && (
            <div className="relative mx-6 mb-10 aspect-[16/9] overflow-hidden rounded-3xl md:mx-10 lg:hidden">
              <Image
                src={heroImage}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent" />
            </div>
          )}
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <aside className="lg:pt-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {page?.sectionEyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              {page?.sectionTitle}
            </h2>

            <p className="mt-5 max-w-md leading-7 text-zinc-600">
              {page?.sectionDescription}
            </p>

            {product && (
              <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  {page?.productInterestLabel}
                </p>

                <p className="mt-2 text-lg font-semibold text-zinc-900">
                  {product}
                </p>
              </div>
            )}

            <div className="mt-10 space-y-5">
              {page?.infoPoints?.map((point) => (
                <Info
                  key={point.title}
                  title={point.title}
                  text={point.text}
                />
              ))}
            </div>
          </aside>

          <div className="w-full rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10 xl:p-12">
            <QuoteForm product={product} />
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
        ✓
      </div>

      <div>
        <h3 className="font-semibold text-zinc-900">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-zinc-600">{text}</p>
      </div>
    </div>
  );
}