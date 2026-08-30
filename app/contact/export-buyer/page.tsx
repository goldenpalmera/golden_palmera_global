import type { Metadata } from "next";
import InquiryForm from "@/components/inquiry/InquiryForm";

export const metadata: Metadata = {
  title:
    "Export & Buyer Inquiry | Golden Palmera Global",

  description:
    "Submit an export or international buyer inquiry for agricultural commodities from Golden Palmera Global.",
};

export default function ExportBuyerPage() {
  return (
    <main className="bg-[#f8f6f0] text-[#171717]">
      {/* Hero */}
      <section className="bg-zinc-950 px-6 py-24 text-white md:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d6b45c]">
            International buyers
          </p>

          <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.92] tracking-[-0.06em] md:text-7xl lg:text-8xl">
            Tell us what
            <br />
            you need.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
            Share your commodity, quantity, specifications,
            destination and packaging requirements. We&apos;ll
            review your request and respond with the next
            steps.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="px-6 py-20 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          {/* Left */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
              Source from Africa
            </p>

            <h2 className="mt-7 max-w-lg text-4xl font-medium leading-[0.98] tracking-[-0.05em] md:text-5xl">
              Reliable commodities. Clear requirements. Global delivery.
            </h2>

            <p className="mt-7 max-w-md text-sm leading-7 text-black/55">
              Tell us exactly what you are looking for and
              our team can assess the product, quantity,
              specifications and destination before moving
              forward.
            </p>

            <div className="mt-12 border-t border-black/10 pt-8">
              <BuyerStep
                number="01"
                title="Tell us what you need"
                text="Product, quantity, packaging and destination."
              />

              <BuyerStep
                number="02"
                title="We review your requirements"
                text="Our team assesses sourcing, specifications and availability."
              />

              <BuyerStep
                number="03"
                title="We come back with next steps"
                text="We discuss pricing, documentation, logistics and delivery."
              />
            </div>

            <div className="mt-12 border-l-2 border-[#b7924a] pl-5">
              <p className="text-sm font-medium">
                Agricultural commodities sourced from
                Nigeria and West Africa.
              </p>

              <p className="mt-2 text-xs leading-5 text-black/45">
                Subject to product availability,
                specifications and destination requirements.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <InquiryForm type="export_buyer" />
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className="bg-[#173f2b] px-6 py-24 text-white md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d6b45c]">
            Global trade
          </p>

          <h2 className="mt-7 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">
            From African origin
            <br />
            to global destination.
          </h2>
        </div>
      </section>
    </main>
  );
}

function BuyerStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-5 border-b border-black/10 py-6 first:pt-0">
      <span className="font-mono text-xs text-[#8c6d35]">
        {number}
      </span>

      <div>
        <h3 className="text-sm font-semibold">
          {title}
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-black/50">
          {text}
        </p>
      </div>
    </div>
  );
}