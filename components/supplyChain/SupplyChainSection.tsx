import { Download } from "lucide-react";
import type { SupplyChainStep } from "@/content/about/types";
import { SectionHeading } from "@/components/sharedComponents/index";

type SupplyChainSectionProps = {
  steps: SupplyChainStep[];
};

export function SupplyChainSection({
  steps,
}: SupplyChainSectionProps) {
  return (
    <section
      id="supply-chain"
      className="bg-ivory-100 py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="End-to-End Supply Chain"
          heading="We Own the Entire Chain."
          subheading="From cooperative farm to container seal — every step is documented, inspected, and traceable."
          centered
        />

        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-[22px] left-[5%] right-[5%] h-px bg-gold-500/30" />

            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
              }}
            >
              {steps.map((step) => (
                <div
                  key={step._id}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative z-10 w-11 h-11 rounded-full bg-forest-800 border-2 border-gold-500 flex items-center justify-center mb-4 group-hover:bg-gold-500 transition-colors">
                    <span className="font-mono text-[10px] text-gold-500 group-hover:text-forest-900">
                      {step.number}
                    </span>
                  </div>

                  <h4 className="text-[11px] font-medium text-forest-800 mb-2 leading-tight">
                    {step.title}
                  </h4>

                  <p className="text-[10px] text-forest-800/55 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          {steps.map((step, index) => (
            <div
              key={step._id}
              className="flex gap-4 relative"
            >
              {index < steps.length - 1 && (
                <div className="absolute left-[20px] top-[44px] bottom-0 w-px bg-gold-500/25" />
              )}

              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-forest-800 border-2 border-gold-500 flex items-center justify-center z-10">
                <span className="font-mono text-[9px] text-gold-500">
                  {step.number}
                </span>
              </div>

              <div className="pb-8">
                <h4 className="text-sm font-medium text-forest-800 mb-1">
                  {step.title}
                </h4>

                <p className="text-[11px] text-forest-800/55 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="my-10 h-px bg-gold-500/20" />

        <div className="text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-forest-800/60 hover:text-gold-500 text-[11px] tracking-wide transition-colors"
          >
            <Download size={14} />
            Download Full Process PDF
          </a>
        </div>
      </div>
    </section>
  );
}
