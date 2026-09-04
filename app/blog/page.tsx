import Link from "next/link";

import { getSanityClient } from "@/sanity/lib/client";
// import { blogPostsQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/sanity/lib/seo";
import { Metadata } from "next";

const PAGE_SIZE = 9;

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  author?: string;
  category?: string;
  publishedAt?: string;
  featured?: boolean;
};

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
};

async function getBlogPosts(page: number, search?: string) {
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const query = `
    {
      "posts": *[
        _type == "post"
        && defined(slug.current)
        && defined(publishedAt)
        && publishedAt <= now()
        && (
          !defined($search)
          || $search == ""
          || title match $search
          || excerpt match $search
          || category match $search
          || $search in tags
        )
      ]
      | order(publishedAt desc)
      [${start}...${end}] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        author,
        category,
        publishedAt,
        featured
      },

      "total": count(*[
        _type == "post"
        && defined(slug.current)
        && defined(publishedAt)
        && publishedAt <= now()
        && (
          !defined($search)
          || $search == ""
          || title match $search
          || excerpt match $search
          || category match $search
          || $search in tags
        )
      ])
    }
  `;

  const client = getSanityClient();
  return client.fetch<{
    posts: BlogPost[];
    total: number;
  }>(query, {
    search: search?.trim() || "",
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    fallbackTitle:
      "GPG Insights | Golden Palmera Global",
    fallbackDescription:
      "Perspectives on agricultural commodities, African supply chains, sustainability, export markets, and international trade.",
    canonical: "/blog",
  });
}

function formatDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  const params = await searchParams;

  const page = Math.max(1, Number(params.page) || 1);
  const search = params.q?.trim() || "";

  const { posts, total } = await getBlogPosts(page, search);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">
      {/* Hero */}
      <section className="px-6 pb-16 pt-32 md:px-12 lg:px-20">
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

          {/* Search */}
          <form
            action="/blog"
            method="GET"
            className="mt-12 flex max-w-2xl gap-3"
          >
            <input
              type="search"
              name="q"
              defaultValue={search}
              placeholder="Search insights..."
              className="min-w-0 flex-1 rounded-full border border-[#d9d5c9] bg-white px-6 py-4 text-sm outline-none transition focus:border-[#a07a3d]"
            />

            <button
              type="submit"
              className="rounded-full bg-[#182018] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#a07a3d]"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Articles */}
      <section className="px-6 pb-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {search && (
            <div className="mb-8">
              <p className="text-sm text-[#687068]">
                {total} result{total === 1 ? "" : "s"} for{" "}
                <span className="font-semibold text-[#182018]">
                  &quot;{search}&quot;
                </span>
              </p>
            </div>
          )}

          {posts.length === 0 ? (
            <div className="rounded-3xl border border-[#ddd9cc] bg-white p-12 text-center">
              <p className="text-lg font-semibold">
                No insights found.
              </p>

              <p className="mt-3 text-sm text-[#687068]">
                Try searching for another topic.
              </p>

              {search && (
                <Link
                  href="/blog"
                  className="mt-6 inline-flex rounded-full bg-[#182018] px-6 py-3 text-sm font-semibold text-white"
                >
                  View all insights
                </Link>
              )}
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {posts.map((article) => (
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

                  {article.excerpt && (
                    <p className="mt-5 flex-1 leading-7 text-[#687068]">
                      {article.excerpt}
                    </p>
                  )}

                  <Link
                    href={`/blog/${article.slug}`}
                    className="mt-8 inline-flex items-center text-sm font-semibold"
                  >
                    Read article
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              search={search}
            />
          )}
        </div>
      </section>

      {/* CTA */}
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

function Pagination({
  currentPage,
  totalPages,
  search,
}: {
  currentPage: number;
  totalPages: number;
  search: string;
}) {
  function getUrl(page: number) {
    const params = new URLSearchParams();

    if (search) {
      params.set("q", search);
    }

    if (page > 1) {
      params.set("page", String(page));
    }

    const query = params.toString();

    return query ? `/blog?${query}` : "/blog";
  }

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-16 flex items-center justify-center gap-2"
    >
      {currentPage > 1 && (
        <Link
          href={getUrl(currentPage - 1)}
          className="rounded-full border border-[#ddd9cc] bg-white px-5 py-3 text-sm font-semibold transition hover:border-[#a07a3d] hover:text-[#a07a3d]"
        >
          ← Previous
        </Link>
      )}

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <Link
              key={page}
              href={getUrl(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition ${
                page === currentPage
                  ? "bg-[#182018] text-white"
                  : "border border-[#ddd9cc] bg-white hover:border-[#a07a3d] hover:text-[#a07a3d]"
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages && (
        <Link
          href={getUrl(currentPage + 1)}
          className="rounded-full border border-[#ddd9cc] bg-white px-5 py-3 text-sm font-semibold transition hover:border-[#a07a3d] hover:text-[#a07a3d]"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}