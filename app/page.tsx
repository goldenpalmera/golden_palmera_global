import type { Metadata } from "next";
import { getHomeContent } from "@/content/home/getHomeContent";
import { getHomeMetadata } from "@/content/home/metadata";

import {
  HeroSection,
  IntroSection,
  CommoditiesSection,
  ServicesSection,
  ApproachSection,
  SupplyChainSection,
  QualitySection,
  CaseStudiesSection,
  TestimonialsSection,
  ContactSection,
} from "@/components/home";

export async function generateMetadata(): Promise<Metadata> {
  return getHomeMetadata();
}

export default async function HomePage() {
  const content= await getHomeContent();

  return (
    <main className="site-shell">
      <HeroSection
        content={content.hero}
      />

      <IntroSection
        content={content.intro}
      />

      <CommoditiesSection
        commodities={content.featuredProducts}
      />

      <ServicesSection
        services={content.featuredServices}
      />

      <ApproachSection
        approaches={content.featuredApproaches}
      />

      <SupplyChainSection
        steps={content.supplyChain}
      />

      <QualitySection
        eyebrow={content.quality?.eyebrow}
        title={content.quality?.title}
        description={content.quality?.description}
        tests={content.quality?.tests}
        partners={content.quality?.partners}
        documents={content.quality?.documents}
        sampleDocumentLabel={content.quality?.sampleDocumentLabel}
        sampleDocumentUrl={content.quality?.sampleDocumentUrl}
      />

      <CaseStudiesSection
        caseStudies={content.featuredCaseStudies}
      />

      <TestimonialsSection
        testimonials={content.featuredTestimonials}
      />

      <ContactSection
        content={content.contact}
      />
    </main>
  );
}

