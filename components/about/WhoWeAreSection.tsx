type WhoWeAreSectionProps = {
  eyebrow: string;
  title: string;
  paragraphs?: string[];
};

const DEFAULT_PARAGRAPHS = [
  "Golden Palmera Global operates across the agricultural commodity value chain, from procurement and aggregation to processing, packaging, export, and international distribution.",

  "We work with farmers, cooperatives, suppliers, processors, logistics partners, and international buyers to create efficient and dependable trade relationships.",

  "Our focus is simple: quality products, responsible sourcing, strong supply chains, and long-term global partnerships.",
];

export default function WhoWeAreSection({
  eyebrow,
  title,
  paragraphs = DEFAULT_PARAGRAPHS,
}: WhoWeAreSectionProps) {
  return (
    <section className="bg-white py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
              {eyebrow}
            </p>

            <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl">
              {title}
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-slate-600">
            {paragraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 20)}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
