import Link from "next/link";
import { notFound } from "next/navigation";

const articles = [
  {
    slug: "african-agricultural-commodities-global-markets",
    category: "Market Insights",
    date: "August 2026",
    title: "African Agricultural Commodities and the Global Market",
    excerpt:
      "Understanding the opportunities, challenges, and changing dynamics shaping Africa's agricultural commodity trade.",
    content: [
      {
        heading: "Africa's agricultural opportunity",
        paragraphs: [
          "Africa remains one of the world's most important agricultural regions, with significant production capacity across a wide range of commodities.",
          "From palm oil and sesame to hibiscus, ginger, cashew, shea butter, and other agricultural products, the continent has a growing opportunity to serve international markets with high-quality commodities.",
        ],
      },
      {
        heading: "From production to global markets",
        paragraphs: [
          "Access to international markets requires more than simply producing agricultural commodities. Buyers increasingly expect consistency, traceability, quality control, reliable documentation, and dependable logistics.",
          "Strong aggregation and supply-chain systems can help connect farmers and producers with international buyers while improving quality and reducing unnecessary inefficiencies.",
        ],
      },
      {
        heading: "The importance of quality",
        paragraphs: [
          "Quality is one of the foundations of successful agricultural exports. Proper handling, storage, grading, processing, packaging, and inspection can significantly influence the value and marketability of a commodity.",
          "For exporters, building quality into the supply chain from the point of sourcing creates stronger relationships with international buyers and supports long-term market access.",
        ],
      },
    ],
  },
  {
    slug: "hibiscus-export-market",
    category: "Commodity Insights",
    date: "August 2026",
    title: "Understanding the Global Hibiscus Export Market",
    excerpt:
      "An overview of hibiscus sourcing, quality considerations, applications, and international market opportunities.",
    content: [
      {
        heading: "A versatile agricultural commodity",
        paragraphs: [
          "Hibiscus sabdariffa is an increasingly important agricultural commodity with applications across food, beverage, wellness, and other consumer industries.",
          "Its growing international demand creates opportunities for African producers and exporters capable of delivering consistent quality and reliable supply.",
        ],
      },
      {
        heading: "Sourcing and quality considerations",
        paragraphs: [
          "Successful hibiscus exports depend heavily on sourcing practices, post-harvest handling, moisture control, cleanliness, grading, and appropriate packaging.",
          "Maintaining consistent specifications from one shipment to another is particularly important when serving international buyers.",
        ],
      },
      {
        heading: "Building international opportunities",
        paragraphs: [
          "As global consumers become increasingly interested in natural ingredients and plant-based products, African agricultural commodities can play an important role in international supply chains.",
          "Developing reliable sourcing networks and strong export processes is essential to converting this opportunity into sustainable trade relationships.",
        ],
      },
    ],
  },
  {
    slug: "building-resilient-agricultural-supply-chains",
    category: "Supply Chain",
    date: "August 2026",
    title: "Building More Resilient Agricultural Supply Chains",
    excerpt:
      "Why traceability, aggregation, quality control, and strong supplier relationships matter in agricultural exports.",
    content: [
      {
        heading: "Why supply chains matter",
        paragraphs: [
          "Agricultural commodities move through multiple stages before reaching an international buyer. Weakness at any point can affect quality, delivery schedules, and ultimately customer confidence.",
          "A resilient supply chain connects producers, aggregators, processors, logistics providers, inspectors, exporters, and buyers through a coordinated system.",
        ],
      },
      {
        heading: "Traceability and transparency",
        paragraphs: [
          "Traceability allows businesses to better understand where commodities originate and how they move through the supply chain.",
          "For international trade, transparent sourcing can strengthen buyer confidence while supporting better quality management and responsible procurement.",
        ],
      },
      {
        heading: "Long-term supplier relationships",
        paragraphs: [
          "Strong relationships with farmers, cooperatives, and suppliers are essential to building dependable agricultural supply networks.",
          "When suppliers understand quality requirements and buyers can rely on consistent sourcing, the entire supply chain becomes more efficient and resilient.",
        ],
      },
    ],
  },
];

function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | Golden Palmera Global",
    };
  }

  return {
    title: `${article.title} | Golden Palmera Global`,
    description: article.excerpt,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2);

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">
      {/* Article Hero */}
      <section className="px-6 pb-20 pt-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-[#6d756d] transition-colors hover:text-[#a07a3d]"
          >
            ← Back to Insights
          </Link>

          <div className="mt-16">
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em]">
              <span className="text-[#a07a3d]">{article.category}</span>

              <span className="h-1 w-1 rounded-full bg-[#b8b4a8]" />

              <span className="text-[#858b85]">{article.date}</span>
            </div>

            <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              {article.title}
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-[#687068]">
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="border-y border-[#ddd9cc] bg-white px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-16">
            {article.content.map((section) => (
              <section key={section.heading}>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {section.heading}
                </h2>

                <div className="mt-6 space-y-6 text-lg leading-9 text-[#5f675f]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#a07a3d]">
                Continue reading
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                More from GPG Insights
              </h2>
            </div>

            <Link
              href="/blog"
              className="text-sm font-semibold transition-colors hover:text-[#a07a3d]"
            >
              View all insights →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {relatedArticles.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group rounded-3xl border border-[#ddd9cc] bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <span className="text-xs uppercase tracking-[0.18em] text-[#a07a3d]">
                  {related.category}
                </span>

                <h3 className="mt-8 text-2xl font-semibold leading-tight transition-colors group-hover:text-[#a07a3d]">
                  {related.title}
                </h3>

                <p className="mt-4 leading-7 text-[#687068]">
                  {related.excerpt}
                </p>

                <div className="mt-8 text-sm font-semibold">
                  Read article
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#182018] px-6 py-24 text-white md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-[#d2b477]">
              Work with GPG
            </p>

            <h2 className="mt-5 text-4xl font-semibold">
              Building stronger agricultural trade together.
            </h2>

            <p className="mt-5 leading-7 text-white/60">
              Connect with Golden Palmera Global for sourcing, export,
              commodity supply, and international trade opportunities.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex rounded-full bg-[#d2b477] px-7 py-4 font-semibold text-[#182018] transition-transform duration-300 hover:-translate-y-1"
          >
            Talk to GPG
          </Link>
        </div>
      </section>
    </main>
  );
}