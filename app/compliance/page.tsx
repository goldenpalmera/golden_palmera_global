import type { Metadata } from "next";
import { buildMetadata } from "@/sanity/lib/seo";

import { client } from "@/sanity/lib/client";
import { compliancePageQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type ComplianceArea = {
  number: string;
  title: string;
  text: string;
};

type SEO = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  noIndex?: boolean;
  canonicalUrl?: string;
  ogImage?: unknown;
};

type CompliancePageData = {
  title?: string;

  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;

  complianceAreas?: ComplianceArea[];

  commitmentEyebrow?: string;
  commitmentTitle?: string;
  commitmentText?: string;

  seo?: SEO;
};

async function getCompliancePage() {
  return client.fetch<CompliancePageData | null>(
    compliancePageQuery
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompliancePage();

  const title =
    page?.seo?.metaTitle ||
    page?.heroTitle ||
    "Compliance | Golden Palmera Global";

  const description =
    page?.seo?.metaDescription ||
    page?.heroDescription ||
    "Golden Palmera Global's approach to quality assurance, traceability, export documentation, responsible sourcing, and international trade standards.";

  const ogImage = page?.seo?.ogImage
    ? urlFor(page.seo.ogImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .url()
    : undefined;

  return {
    title,
    description,
    keywords: page?.seo?.keywords,

    alternates: {
      canonical:
        page?.seo?.canonicalUrl ||
        "/compliance",
    },

    robots: page?.seo?.noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },

    openGraph: {
      title,
      description,
      url: page?.seo?.canonicalUrl || "/compliance",
      siteName: "Golden Palmera Global",
      type: "website",
      ...(ogImage ? { images: [ogImage] } : {}),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function CompliancePage() {
  const page = await getCompliancePage();

  const areas = page?.complianceAreas ?? [];

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">
      {/* HERO */}
      <section className="px-6 pb-24 pt-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-[#a07a3d]">
              {page?.heroEyebrow ||
                "Trust • Standards • Accountability"}
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              {page?.heroTitle || (
                <>
                  Compliance is part of
                  <span className="text-[#a07a3d]">
                    {" "}
                    the product.
                  </span>
                </>
              )}
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5d655d] md:text-xl">
              {page?.heroDescription ||
                "Golden Palmera Global is committed to building transparent, reliable, and responsible agricultural supply chains that meet applicable regulatory and international trade requirements."}
            </p>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="px-6 pb-28 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {areas.length === 0 ? (
            <div className="rounded-3xl border border-[#ddd9cc] bg-white px-8 py-16 text-center">
              <p className="text-lg font-medium text-[#182018]">
                Our compliance information is being prepared.
              </p>

              <p className="mx-auto mt-3 max-w-xl leading-7 text-[#687068]">
                Details about our quality, traceability, export,
                and responsible sourcing standards will be updated
                shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-px overflow-hidden rounded-3xl border border-[#dcd8ca] bg-[#dcd8ca] md:grid-cols-2 lg:grid-cols-3">
              {areas.map((item) => (
                <article
                  key={`${item.number}-${item.title}`}
                  className="bg-white p-8 transition-colors duration-300 hover:bg-[#182018] hover:text-white md:p-10"
                >
                  <span className="text-sm font-medium text-[#a07a3d]">
                    {item.number}
                  </span>

                  <h2 className="mt-10 text-2xl font-semibold">
                    {item.title}
                  </h2>

                  <p className="mt-5 leading-7 text-[#697169]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* COMMITMENT */}
      <section className="bg-[#182018] px-6 py-28 text-white md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.25em] text-[#d2b477]">
              {page?.commitmentEyebrow || "Our Commitment"}
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              {page?.commitmentTitle ||
                "Building confidence from origin to destination."}
            </h2>

            <p className="mt-8 text-lg leading-8 text-white/65">
              {page?.commitmentText ||
                "Our objective is to make every stage of the agricultural export journey more dependable — from responsible sourcing and quality control to documentation, logistics, and delivery."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}