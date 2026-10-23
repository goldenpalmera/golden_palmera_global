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
        tests={content.quality?.tests}
        partners={content.quality?.partners}
        documents={content.quality?.documents}
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

      <HomeFooter />
    </main>
  );
}
