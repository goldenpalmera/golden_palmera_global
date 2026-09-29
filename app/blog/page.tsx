import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { 
  FALLBACK_BLOG_POSTS,
  FALLBACK_IMAGE_BY_SLUG,
} from "@/content/blog/fallbacks";
import { getArticleImageUrl } from "@/content/blog/images";
import type { BlogPageProps } from "@/content/blog/types";
import {
  getBlogPosts,
  PAGE_SIZE,
} from "@/content/blog/sanity";
import { getBlogsMetadata } from "@/content/blog/metadata";
import { formatDate } from "@/content/blog/utils";

export async function generateMetadata(): Promise<Metadata> {
  return getBlogsMetadata();
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  const params = await searchParams;

  const pageParam = Number.parseInt(params.page ?? "1", 10);

  const page = Number.isFinite(pageParam)
    ? Math.max(1, pageParam)
    : 1;

  const search = params.q?.trim() ?? "";

  const result = await getBlogPosts(page, search);

  const hasSanityPosts = result.posts.length > 0;

  const fallbackPosts = search
    ? FALLBACK_BLOG_POSTS.filter((post) => {
        const query = search.toLowerCase();

        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query) ||
          post.category?.toLowerCase().includes(query) ||
          post.tags?.some((tag) =>
            tag.toLowerCase().includes(query),
          )
        );
      })
    : FALLBACK_BLOG_POSTS;

  const posts = hasSanityPosts
    ? result.posts
    : fallbackPosts;

  const total = hasSanityPosts
    ? result.total
    : fallbackPosts.length;

  const totalPages = Math.ceil(
    total / PAGE_SIZE,
  );

  console.log("BLOG DEBUG", {
  search,
  page,
  posts: result.posts.length,
  total: result.total,
  postsData: result.posts,
});


  if (totalPages > 0 && page > totalPages) {
    const query = new URLSearchParams();

    if (search) {
      query.set("q", search);
    }

    query.set("page", String(totalPages));
    redirect(`/blog?${query.toString()}`);
  }

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f7f6f1]">
        <div className="relative min-h-[680px]">
          {/* Decorative background */}
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#a07a3d]/10 blur-3xl" />

          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
            <div className="relative z-10 flex min-h-[680px] items-center">
              {/* Content */}
              <div className="w-full max-w-3xl py-32 lg:w-[58%] lg:py-36">
                <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-[#a07a3d]">
                  GPG Insights
                </p>

                <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight text-[#182018] md:text-6xl lg:text-7xl">
                  Agriculture.
                  <br />
                  Commodities.
                  <br />
                  <span className="text-[#a07a3d]">
                    Global Trade.
                  </span>
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5d655d] md:text-xl">
                  Perspectives on agricultural commodities,
                  African supply chains, export markets,
                  sustainability, and international trade.
                </p>

                {/* Search */}
                <form
                  action="/blog"
                  method="GET"
                  className="mt-12 flex w-full max-w-2xl gap-3"
                >
                  <label
                    htmlFor="blog-search"
                    className="sr-only"
                  >
                    Search insights
                  </label>

                  <input
                    id="blog-search"
                    type="search"
                    name="q"
                    defaultValue={search}
                    placeholder="Search insights..."
                    autoComplete="off"
                    className="min-w-0 flex-1 rounded-full border border-[#d9d5c9] bg-white px-6 py-4 text-sm text-[#182018] outline-none transition focus:border-[#a07a3d] focus:ring-2 focus:ring-[#a07a3d]/20"
                  />

                  <button
                    type="submit"
                    className="rounded-full bg-[#182018] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#a07a3d]"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Desktop diagonal image */}
          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              hidden
              h-full
              w-[52%]
              lg:block
            "
            style={{
              clipPath:
                "polygon(38% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            <Image
              src={
                FALLBACK_IMAGE_BY_SLUG["future-of-agricultural-trade"] ??
                Object.values(FALLBACK_IMAGE_BY_SLUG)[0]
              }
              alt="Agricultural commodities and global trade"
              fill
              priority
              sizes="52vw"
              className="object-cover"
            />

            {/* Image colour treatment */}
            <div className="absolute inset-0 bg-[#182018]/15" />

            {/* Fade image into page */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f7f6f1]/95 via-[#f7f6f1]/20 to-transparent" />

            {/* Subtle green overlay */}
            <div className="absolute inset-0 bg-[#173f2b]/10 mix-blend-multiply" />
          </div>

          {/* Mobile image */}
          <div className="relative mx-6 mb-12 aspect-[16/9] overflow-hidden rounded-3xl md:mx-12 lg:hidden">
            <Image
              src={
                FALLBACK_IMAGE_BY_SLUG["future-of-agricultural-trade"] ??
                Object.values(FALLBACK_IMAGE_BY_SLUG)[0]
              }
              alt="Agricultural commodities and global trade"
              fill
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#182018]/40 to-transparent" />
          </div>
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
            <EmptyState search={search} />
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {posts.map((article) => (
                <article
                  key={article._id}
                  className="group flex flex-col rounded-3xl border border-[#ddd9cc] bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative -mx-8 -mt-8 mb-8 aspect-[16/9] overflow-hidden rounded-t-3xl bg-[#182018]">
                    {(() => {
                      const image = 
                        getArticleImageUrl(article.coverImage) ??
                        FALLBACK_IMAGE_BY_SLUG[article.slug];

                      return image ? (
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#a07a3d,transparent_35%),linear-gradient(135deg,#182018,#293329)]" />
                      );
                    })()}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#182018]/60 via-transparent to-transparent" />
                    
                    <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6">
                      <span className="text-xs font-medium uppercase tracking-[0.18em] text-white">
                        {article.category || "GPG Insights"}
                      </span>

                      {article.publishedAt && (
                        <time
                          dateTime={article.publishedAt}
                          className="text-xs text-white/70"
                        >
                          {formatDate(article.publishedAt)}
                        </time>
                      )}
                    </div>
                  </div>

                  <h2 className="mt-10 text-2xl font-semibold leading-tight transition-colors group-hover:text-[#a07a3d]">
                    <Link
                      href={`/blog/${encodeURIComponent(
                        article.slug,
                      )}`}
                      className="focus:outline-none focus:ring-2 focus:ring-[#a07a3d] focus:ring-offset-4"
                    >
                      {article.title}
                    </Link>
                  </h2>

                  {article.excerpt && (
                    <p className="mt-5 flex-1 leading-7 text-[#687068]">
                      {article.excerpt}
                    </p>
                  )}

                  <Link
                    href={`/blog/${encodeURIComponent(
                      article.slug,
                    )}`}
                    className="mt-8 inline-flex items-center text-sm font-semibold"
                  >
                    Read article

                    <span
                      aria-hidden="true"
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}

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
              New insights covering agricultural
              commodities, sourcing, international trade,
              and African agricultural markets.
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

function EmptyState({
  search,
}: {
  search: string;
}) {
  return (
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
          className="mt-6 inline-flex rounded-full bg-[#182018] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a07a3d]"
        >
          View all insights
        </Link>
      )}
    </div>
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
  function getUrl(page: number): string {
    const params = new URLSearchParams();

    if (search) {
      params.set("q", search);
    }

    if (page > 1) {
      params.set("page", String(page));
    }

    const query = params.toString();

    return query
      ? `/blog?${query}`
      : "/blog";
  }

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-16 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 && (
        <Link
          href={getUrl(currentPage - 1)}
          rel="prev"
          className="rounded-full border border-[#ddd9cc] bg-white px-5 py-3 text-sm font-semibold transition hover:border-[#a07a3d] hover:text-[#a07a3d]"
        >
          ← Previous
        </Link>
      )}

      <div className="flex items-center gap-2">
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1,
        ).map((page) => {
          const isCurrent = page === currentPage;

          return (
            <Link
              key={page}
              href={getUrl(page)}
              aria-current={
                isCurrent ? "page" : undefined
              }
              aria-label={`Page ${page}`}
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition ${
                isCurrent
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
          rel="next"
          className="rounded-full border border-[#ddd9cc] bg-white px-5 py-3 text-sm font-semibold transition hover:border-[#a07a3d] hover:text-[#a07a3d]"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}