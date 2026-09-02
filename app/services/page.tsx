import Link from "next/link";
import type { Metadata } from "next";

import ServiceCard from "@/components/services/ServicesCard";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesProcess from "@/components/services/ServicesProcess";
import { buildMetadata } from "@/sanity/lib/seo";
import { client } from "@/sanity/lib/client";
import { SERVICES_QUERY, SERVICES_SEO_QUERY } from "@/sanity/lib/queries";
// import next from "next";
// import { revalidatePath } from "next/cache";
import { ServicesSeoData } from "@/sanity/lib/types";

type Service = {
  _id: string;
  number: string;
  category: string;
  title: string;
  slug?: string;
  description?: string;
  items?: string[];
  image?: unknown;
  featured?: boolean;
  order?: number
};

async function getService(): Promise<Service[]> {
  return client.fetch(
    SERVICES_QUERY,
    {},
    {
      next: {
        revalidate: 60,
      },
    }
  );
}

async function getServicesPage() {
  return client.fetch<ServicesSeoData | null>(
    SERVICES_SEO_QUERY,
    {},
    {
      next: {
        revalidate: 60,
      },
    }
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesPage();

  return buildMetadata({
    seo: page?.seo,

    fallbackTitle:
      "Services | Golden Palmera Global",

    fallbackDescription:
      page?.intro ||
      "Golden Palmera Global provides sourcing, processing, packaging, quality control, and export services for agricultural commodities.",

    canonical: "/services",
  });
}

export default async function ServicesPage() {
  const services = await getService();
  return (
    <main className="bg-[#f8f6f0] text-[#171717]">
      <ServicesHero />

      {/* Intro */}
      <section className="px-6 py-24 md:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
              What we do
            </p>
          </div>

          <div>
            <p className="max-w-5xl text-3xl font-medium leading-tight tracking-[-0.04em] md:text-5xl lg:text-6xl">
              Golden Palmera Global provides an integrated platform for
              sourcing, processing and exporting agricultural commodities from
              Africa to markets around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 pb-24 md:px-10 lg:px-16 lg:pb-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex items-end justify-between border-b border-black/10 pb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-black/40">
              Our capabilities
            </p>

            <span className="font-mono text-xs text-black/30">
              08 SERVICES
            </span>
          </div>

          {services.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {services.map((service) => (
                <ServiceCard 
                  key={service._id} 
                  number={service.number} 
                  category={service.category}
                  title={service.title}
                  description={service.description ?? ""}
                  items={service.items ?? []}
                />
              ))}
            </div>
            ) : (
            <div className="rounded-3xl border border-[#173f2b]/10 bg-white px-8 py-16 text-center">
              <p className="text-lg font-semibold text-[#173f2b]">
                Our services are being prepared.
              </p>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
                Details about our services will be updated shortly.
              </p>
            </div>
          )}
        </div>
      </section>

      <ServicesProcess />

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#b7924a] px-6 py-28 md:px-10 lg:px-16 lg:py-40">
        <div className="absolute right-[-10%] top-[-40%] h-[600px] w-[600px] rounded-full border border-black/10" />
        <div className="absolute right-[-5%] top-[-25%] h-[450px] w-[450px] rounded-full border border-black/10" />

        <div className="relative mx-auto max-w-[1400px]">
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-black/50">
            Let&apos;s work together
          </p>

          <h2 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
            Building better
            <br />
            agricultural supply chains.
          </h2>

          <div className="mt-12">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-5 border-b border-black/40 pb-3 text-sm uppercase tracking-[0.2em]"
            >
              Start a conversation

              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}