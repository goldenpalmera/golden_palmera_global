import Link from "next/link";

import ServiceCard from "@/components/services/ServicesCard";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesProcess from "@/components/services/ServicesProcess";

const services = [
  {
    number: "01",
    category: "SOURCE",
    title: "Agricultural Sourcing & Procurement",
    description:
      "We source agricultural commodities through relationships with farmers, cooperatives and trusted suppliers, creating dependable channels between producers and markets.",
    items: [
      "Farmer and cooperative sourcing",
      "Commodity aggregation",
      "Supplier coordination",
      "Supply planning",
    ],
  },
  {
    number: "02",
    category: "PROCESS",
    title: "Processing & Value Addition",
    description:
      "We prepare agricultural commodities for demanding markets through appropriate processing, grading, preservation and value-added handling.",
    items: [
      "Cleaning and grading",
      "Processing and refinement",
      "Preservation",
      "Export preparation",
    ],
  },
  {
    number: "03",
    category: "TRADE",
    title: "Export & International Trade",
    description:
      "We coordinate the requirements involved in moving agricultural products from origin to international buyers and distribution channels.",
    items: [
      "Export documentation",
      "Shipment coordination",
      "International logistics",
      "Trade compliance",
    ],
  },
  {
    number: "04",
    category: "QUALITY",
    title: "Quality Control & Inspection",
    description:
      "Quality is central to our operation. We support the assessment and preparation of commodities against applicable buyer and market requirements.",
    items: [
      "Quality assessment",
      "Pre-shipment inspection",
      "Standards verification",
      "Batch consistency",
    ],
  },
  {
    number: "05",
    category: "PACKAGING",
    title: "Packaging & Branding",
    description:
      "We help transform agricultural commodities into professionally presented, market-ready products suitable for local and international distribution.",
    items: [
      "Export-ready packaging",
      "Product presentation",
      "Branding support",
      "Market-specific preparation",
    ],
  },
  {
    number: "06",
    category: "ADVISORY",
    title: "Agribusiness Advisory & Training",
    description:
      "We support farmers, cooperatives and agribusiness stakeholders with practical knowledge around production quality, standards and export readiness.",
    items: [
      "Farmer support",
      "Cooperative development",
      "Quality standards",
      "Export readiness",
    ],
  },
  {
    number: "07",
    category: "SUPPLY CHAIN",
    title: "Supply Chain & Logistics Coordination",
    description:
      "We coordinate the movement and handling of commodities across collection, storage, preparation and distribution stages.",
    items: [
      "Collection coordination",
      "Storage planning",
      "Inventory coordination",
      "Distribution planning",
    ],
  },
  {
    number: "08",
    category: "PARTNERSHIPS",
    title: "Strategic Partnerships",
    description:
      "We build relationships with local and international organizations to strengthen our supply networks, capabilities and access to global markets.",
    items: [
      "Joint ventures",
      "International partnerships",
      "Supplier networks",
      "Market expansion",
    ],
  },
];

export default function ServicesPage() {
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

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.number} {...service} />
            ))}
          </div>
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