import { SectionHeading } from "@/components/sharedComponents/index";
import type { HomeCaseStudy } from "@/content/home/types";

type CaseStudiesSectionProps = {
  caseStudies: HomeCaseStudy[];
};

export function CaseStudiesSection({
  caseStudies,
}: CaseStudiesSectionProps) {
  return (
    <section className="bg-forest-900 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Global Markets"
          heading="Supply Stories"
          subheading="Real shipments. Verifiable volumes. The portfolio that builds trust."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((caseStudy) => (
            <article
              key={caseStudy.id}
              className="border border-gold-500/15 rounded-lg p-6 bg-forest-950/40 hover:border-gold-500/35 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-[9px] text-gold-500 tracking-[0.1em] uppercase font-mono">
                  {caseStudy.product}
                </span>

                <span className="text-[9px] text-ivory-100/40 tracking-wide">
                  {caseStudy.country}
                </span>
              </div>

              <h3 className="font-serif text-ivory-100 text-base mb-3">
                {caseStudy.title}
              </h3>

              <p className="text-ivory-100/55 text-[12px] leading-relaxed mb-4">
                {caseStudy.summary}
              </p>

              <div className="flex items-center gap-2 pt-3 border-t border-gold-500/10">
                <span className="font-mono text-gold-500 text-sm">
                  {caseStudy.volume}
                </span>

                <span className="text-ivory-100/30 text-[10px]">
                  exported
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
