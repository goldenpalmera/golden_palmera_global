import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

import { client } from "../../sanity/lib/client";
import { ABOUT_PAGE_QUERY } from "../../sanity/lib/queries";
import { buildMetadata } from "../../sanity/lib/seo";
import type { AboutPageData } from "../../sanity/lib/types";

const fallbackValues = [
  {
    number: "01",
    title: "Quality",
    text: "We focus on consistent quality, careful handling, and standards that meet the expectations of international buyers.",
  },
  {
    number: "02",
    title: "Reliability",
    text: "We build dependable supply chains that connect producers, processors, and global markets efficiently.",
  },
  {
    number: "03",
    title: "Integrity",
    text: "We believe in transparent relationships and responsible business practices across every stage of our operations.",
  },
  {
    number: "04",
    title: "Global Reach",
    text: "We connect African agricultural commodities with opportunities across international markets.",
  },
];

async function getAboutPage() {
  return client.fetch<AboutPageData | null>(
    ABOUT_PAGE_QUERY,
    {},
    {
      next: {
        revalidate: 60,
      },
    }
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();

  return buildMetadata({
    seo: page?.seo,

    fallbackTitle:
      "About Golden Palmera Global",

    fallbackDescription:
      page?.heroDescription ||
      "Golden Palmera Global is an agricultural commodities and international trade company focused on sourcing, processing, packaging, and exporting quality products to markets around the world.",

    canonical: "/about",
  });
}

export default async function AboutPage() {
  const page = await getAboutPage();

  const values =
    page?.values?.length
      ? page.values
      : fallbackValues;

  const whoWeAreParagraphs =
    page?.whoWeAreParagraphs?.length
      ? page.whoWeAreParagraphs
      : [
          "Golden Palmera Global operates across the agricultural commodity value chain, from procurement and aggregation to processing, packaging, export, and international distribution.",

          "We work with farmers, cooperatives, suppliers, processors, logistics partners, and international buyers to create efficient and dependable trade relationships.",

          "Our focus is simple: quality products, responsible sourcing, strong supply chains, and long-term global partnerships.",
        ];

  return (
    <>
      <Navbar />

      <main>
        <PageHero
          eyebrow={
            page?.heroEyebrow ||
            "About Golden Palmera Global"
          }
          title={
            page?.heroTitle ||
            "From African agriculture to global markets."
          }
          description={
            page?.heroDescription ||
            "Golden Palmera Global is an agricultural commodities and international trade company focused on sourcing, processing, packaging, and exporting quality products to markets around the world."
          }
        />

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
                  {page?.whoWeAreEyebrow ||
                    "Who we are"}
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl">
                  {page?.whoWeAreTitle ||
                    "Building a trusted bridge between producers and the world."}
                </h2>
              </div>

              <div className="space-y-5 text-base leading-8 text-slate-600">
                {whoWeAreParagraphs.map(
                  (paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f2e9] py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
                {page?.foundationEyebrow ||
                  "Our foundation"}
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl">
                {page?.foundationTitle ||
                  "What guides our work"}
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div
                  key={
                    value.number ||
                    String(index)
                  }
                  className="rounded-2xl bg-white p-7 shadow-sm"
                >
                  <span className="text-sm font-bold text-[#b78628]">
                    {value.number ||
                      String(index + 1).padStart(
                        2,
                        "0"
                      )}
                  </span>

                  <h3 className="mt-8 text-xl font-semibold text-[#173f2b]">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#173f2b] py-24 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6b45c]">
              {page?.missionEyebrow ||
                "Our mission"}
            </p>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {page?.missionTitle ||
                "Creating value from farm to international market."}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65">
              {page?.missionDescription ||
                "We aim to strengthen agricultural value chains while delivering quality commodities and professional export solutions to buyers around the world."}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}