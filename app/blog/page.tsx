import { client } from "@/sanity/lib/client";
import { blogPostsQuery } from "@/sanity/lib/queries";

type BlogPost = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  author?: string;
  category?: string;
  publishedAt?: string;
};

async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(blogPostsQuery);
}

function formatDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPage() {
  const articles = await getBlogPosts();

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">
      {/* Hero */}
      <section className="px-6 pb-20 pt-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-[#a07a3d]">
              GPG Insights
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              Agriculture.
              <br />
              Commodities.
              <br />
              <span className="text-[#a07a3d]">Global Trade.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5d655d] md:text-xl">
              Perspectives on agricultural commodities, African supply chains,
              export markets, sustainability, and international trade.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="px-6 pb-28 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {articles.length === 0 ? (
            <div className="rounded-3xl border border-[#ddd9cc] bg-white p-12 text-center">
              <p className="text-lg text-[#687068]">
                New insights are coming soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article._id}
                  className="group flex flex-col rounded-3xl border border-[#ddd9cc] bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#a07a3d]">
                      {article.category || "GPG Insights"}
                    </span>

                    <span className="text-xs text-[#858b85]">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>

                  <h2 className="mt-10 text-2xl font-semibold leading-tight transition-colors group-hover:text-[#a07a3d]">
                    {article.title}
                  </h2>

                  <p className="mt-5 flex-1 leading-7 text-[#687068]">
                    {article.excerpt}
                  </p>

                  <a
                    href={`/blogs/${article.slug.current}`}
                    className="mt-8 inline-flex items-center text-sm font-semibold"
                  >
                    Read article
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="bg-[#182018] px-6 py-24 text-white md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-[#d2b477]">
              Stay informed
            </p>

            <h2 className="mt-5 text-4xl font-semibold">
              Follow the markets with GPG.
            </h2>

            <p className="mt-5 leading-7 text-white/60">
              New insights covering agricultural commodities, sourcing,
              international trade, and African agricultural markets.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex rounded-full bg-[#d2b477] px-7 py-4 font-semibold text-[#182018] transition-transform duration-300 hover:-translate-y-1"
          >
            Talk to GPG
          </a>
        </div>
      </section>
    </main>
  );
}