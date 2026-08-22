import { notFound } from "next/navigation";

const articles = {
  "african-agricultural-commodities-global-markets": {
    category: "Market Insights",
    date: "August 2026",
    title: "African Agricultural Commodities and the Global Market",
    intro:
      "Africa's agricultural sector presents significant opportunities for global commodity markets, supported by diverse climates, productive agricultural regions, and growing international demand.",
    sections: [
      {
        heading: "A growing opportunity",
        body: "Agricultural commodities remain an important part of international trade. Across Africa, producers and supply-chain businesses are increasingly connecting local production with regional and international markets.",
      },
      {
        heading: "The importance of quality",
        body: "For exporters, market access depends on more than availability. Consistent quality, proper handling, traceability, packaging, documentation, and reliable logistics all contribute to successful international trade.",
      },
      {
        heading: "From origin to destination",
        body: "Building efficient agricultural supply chains requires strong relationships with farmers, cooperatives, aggregators, processors, logistics providers, inspection partners, and international buyers.",
      },
    ],
  },

  "hibiscus-export-market": {
    category: "Commodity Insights",
    date: "August 2026",
    title: "Understanding the Global Hibiscus Export Market",
    intro:
      "Hibiscus sabdariffa is an important agricultural commodity with applications across food, beverage, botanical, and ingredient markets.",
    sections: [
      {
        heading: "Understanding the commodity",
        body: "Hibiscus is valued in several international markets and its commercial potential depends heavily on quality, cleanliness, moisture management, sorting, storage, and appropriate packaging.",
      },
      {
        heading: "Quality begins at source",
        body: "Effective sourcing systems help exporters maintain consistency by working closely with farmers, suppliers, and aggregation networks.",
      },
      {
        heading: "Connecting African supply with global demand",
        body: "Well-organised supply chains can help transform agricultural production into dependable export opportunities while creating stronger connections between producers and international buyers.",
      },
    ],
  },

  "building-resilient-agricultural-supply-chains": {
    category: "Supply Chain",
    date: "August 2026",
    title: "Building More Resilient Agricultural Supply Chains",
    intro:
      "Reliable agricultural exports depend on supply chains that can maintain quality, visibility, and consistency from origin to destination.",
    sections: [
      {
        heading: "Why resilience matters",
        body: "Agricultural supply chains face seasonal production cycles, changing market conditions, logistics challenges, and evolving international requirements.",
      },
      {
        heading: "Aggregation and traceability",
        body: "Strong aggregation systems can improve consistency while traceability helps businesses understand where commodities originate and how they move through the supply chain.",
      },
      {
        heading: "Long-term relationships",
        body: "Sustainable agricultural trade is built through dependable relationships with farmers, cooperatives, suppliers, processors, logistics partners, and buyers.",
      },
    ],
  },
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | Golden Palmera Global`,
    description: article.intro,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">
      <article>
        {/* Article Hero */}
        <section className="px-6 pb-20 pt-32 md:px-12 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em]">
              <span className="text-[#a07a3d]">{article.category}</span>
              <span className="text-[#9a9f99]">•</span>
              <span className="text-[#737a73]">{article.date}</span>
            </div>

            <h1 className="mt-8 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              {article.title}
            </h1>

            <p className="mt-8 text-xl leading-9 text-[#626962]">
              {article.intro}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="border-t border-[#dedbd0] px-6 py-20 md:px-12 lg:px-20">
          <div className="mx-auto max-w-3xl">
            {article.sections.map((section) => (
              <section key={section.heading} className="mb-16">
                <h2 className="text-3xl font-semibold">
                  {section.heading}
                </h2>

                <p className="mt-6 text-lg leading-9 text-[#626962]">
                  {section.body}
                </p>
              </section>
            ))}

            <div className="mt-20 rounded-3xl bg-[#182018] p-8 text-white md:p-12">
              <p className="text-sm uppercase tracking-[0.2em] text-[#d2b477]">
                Golden Palmera Global
              </p>

              <h2 className="mt-5 text-3xl font-semibold">
                Connecting African agricultural supply with global markets.
              </h2>

              <a
                href="/contact"
                className="mt-8 inline-flex rounded-full bg-[#d2b477] px-6 py-3 font-semibold text-[#182018]"
              >
                Contact GPG
              </a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}