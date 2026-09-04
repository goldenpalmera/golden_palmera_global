import type { Metadata } from "next";

import { getSanityClient } from "@/sanity/lib/client";
import { advisoryBoardPageQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type BoardMember = {
  name: string;
  role: string;
  description?: string;
  image?: unknown;
  linkedin?: string;
  active?: boolean;
};

type SEO = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  noIndex?: boolean;
  canonicalUrl?: string;
  ogImage?: unknown;
};

type AdvisoryBoardPageData = {
  title?: string;

  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;

  members?: BoardMember[];

  philosophyEyebrow?: string;
  philosophyTitle?: string;
  philosophyParagraphs?: string[];

  seo?: SEO;
};

const client = getSanityClient();
async function getAdvisoryBoardPage() {
  return client.fetch<AdvisoryBoardPageData | null>(
    advisoryBoardPageQuery
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAdvisoryBoardPage();

  const title =
    page?.seo?.metaTitle ||
    page?.heroTitle ||
    "Advisory Board";

  const description =
    page?.seo?.metaDescription ||
    page?.heroDescription ||
    "Meet the advisory team helping Golden Palmera Global build resilient agricultural supply chains and international trade relationships.";

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
        "/advisory-board",
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
      url: page?.seo?.canonicalUrl || "/advisory-board",
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

export default async function AdvisoryBoardPage() {
  const page = await getAdvisoryBoardPage();

  const members =
    page?.members?.filter((member) => member.active !== false) ?? [];

  const philosophyParagraphs =
    page?.philosophyParagraphs?.length
      ? page.philosophyParagraphs
      : [
          "Our advisory approach brings together knowledge from agriculture, international trade, supply-chain management, quality assurance, and market development.",
          "Together, these perspectives help Golden Palmera Global make informed decisions while building long-term relationships with farmers, suppliers, buyers, and international partners.",
        ];

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-24 pt-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-[#a07a3d]">
              {page?.heroEyebrow || "Governance & Expertise"}
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              {page?.heroTitle || (
                <>
                  Advisory
                  <span className="text-[#a07a3d]"> Board</span>
                </>
              )}
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5d655d] md:text-xl">
              {page?.heroDescription ||
                "Experienced perspectives helping Golden Palmera Global build resilient agricultural supply chains, meet international standards, and create sustainable value across global markets."}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#d7c49a]/20 blur-3xl" />
      </section>

      {/* BOARD */}
      <section className="px-6 pb-28 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {members.length === 0 ? (
            <div className="rounded-3xl border border-[#ddd9cc] bg-white px-8 py-16 text-center">
              <p className="text-lg font-medium text-[#182018]">
                Our advisory board is being prepared.
              </p>

              <p className="mx-auto mt-3 max-w-xl leading-7 text-[#687068]">
                Information about our advisory board and its members will be
                updated shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {members.map((member) => (
                <article
                  key={`${member.name}-${member.role}`}
                  className="group rounded-3xl border border-[#ddd9cc] bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#182018] text-xl font-semibold text-white">
                    GPG
                  </div>

                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#a07a3d]">
                    {member.role}
                  </p>

                  <h2 className="text-2xl font-semibold">
                    {member.name}
                  </h2>

                  {member.description && (
                    <p className="mt-5 leading-7 text-[#687068]">
                      {member.description}
                    </p>
                  )}

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-block text-sm font-semibold text-[#a07a3d]"
                    >
                      LinkedIn →
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-[#182018] px-6 py-28 text-white md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#d2b477]">
              {page?.philosophyEyebrow || "Our Approach"}
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              {page?.philosophyTitle ||
                "Experience that strengthens every link in the chain."}
            </h2>
          </div>

          <div className="text-lg leading-8 text-white/65">
            {philosophyParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index > 0 ? "mt-6" : undefined}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}