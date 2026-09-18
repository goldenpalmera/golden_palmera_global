import type { HomePageContent } from "@/content/home/types";

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
  HomeFooter,
} from ".";

type HomePageProps = {
  content: HomePageContent;
};

export function HomePage({
  content,
}: HomePageProps) {
  return (
    <main>
      <HeroSection content={content.hero} />

      <IntroSection content={content.intro} />

      <CommoditiesSection
        commodities={content.commodities}
      />

      <ServicesSection
        services={content.services}
      />

      <ApproachSection
        approaches={content.approach}
      />

      <SupplyChainSection
        steps={content.supplyChain}
      />

      <QualitySection
        tests={content.qualityTests}
        partners={content.inspectionPartners}
        documents={content.documents}
      />

      <CaseStudiesSection
        caseStudies={content.caseStudies}
      />

      <TestimonialsSection
        testimonials={content.testimonials}
      />

      <ContactSection
        content={content.contact}
      />

      <HomeFooter />
    </main>
  );
}
