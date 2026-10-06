import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesProcess from "@/components/services/ServicesProcess";
import {
  ServicesIntro,
  ServicesList,
  ServicesCTA,
} from "@/components/services";
import { getServicesPage } from "@/content/services/sanity";
import { getServicesMetadata } from "@/content/services/metadata";
import { getServicesData } from "@/content/services/getServicesData";

export async function generateMetadata(): Promise<Metadata> {
  return getServicesMetadata();
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([
    getServicesPage(),
    getServicesData(),
  ]);

  return (
    <main className="bg-[#f8f6f0] text-[#171717]">
      <ServicesHero
        eyebrow={page?.heroEyebrow}
        title1={page?.heroTitle1}
        title2={page?.heroTitle2}
        title3={page?.heroTitle3}
        description={page?.heroDescription}
        images={page?.heroImages}
      />

      <ServicesIntro
        eyebrow={ page?.servicesIntroEyebrow }
        description={ page?.servicesIntroDescription }
      />

      <ServicesList services={services} />

      <ServicesProcess />

      <ServicesCTA />
    </main>
  );
}
