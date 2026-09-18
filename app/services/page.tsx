import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesProcess from "@/components/services/ServicesProcess";
import {
  ServicesIntro,
  ServicesList,
  ServicesCTA,
} from "@/components/services";
import {
  getServices,
  getServicesPage,
} from "@/content/services/sanity";
import { getServicesMetadata } from "@/content/services/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return getServicesMetadata();
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([
    getServicesPage(),
    getServices(),
  ]);

  return (
    <main className="bg-[#f8f6f0] text-[#171717]">
      <ServicesHero
        eyebrow={page?.heroEyebrow}
        title={page?.heroTitle}
        description={page?.heroDescription}
      />

      <ServicesIntro
        eyebrow={page?.heroEyebrow}
        description={page?.intro}
      />

      <ServicesList services={services} />

      <ServicesProcess />

      <ServicesCTA />
    </main>
  );
}
