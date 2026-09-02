import { buildMetadata } from "@/sanity/lib/seo";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { client } from "@/sanity/lib/client";
import {
  POST_QUERY,
  RELATED_BLOG_POSTS_QUERY,
  RECENT_BLOG_POSTS_QUERY,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url";

type Params = {
  slug: string;
};

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: SanityImageSource;

  author?: {
    _id?: string;
    name?: string;
    role?: string;
    bio?: string;
    image?: SanityImageSource;
  };

  publishedAt?: string;
  category?: string;
  tags?: string[];
  body?: PortableTextBlock[];
  featured?: boolean;

  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: SanityImageSource;
  };
};

type RelatedPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: SanityImageSource;
  category?: string;
  publishedAt?: string;
  author?: {
    name?: string;
  };
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://goldenpalmeraglobal.com";

async function getPost(slug: string): Promise<BlogPost | null> {
  return client.fetch(
    POST_QUERY,
    { slug },
    {
      next: {
        revalidate: 60,
      },
    },
  );
}

function formatDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function calculateReadingTime(body?: PortableTextBlock[]) {
  if (!body?.length) return 1;

  const text = body
    .map((block) => {
      if (block?._type !== "block") return "";

      return (
        block.children
          ?.map((child) => child.text || "")
          .join(" ") || ""
      );
    })
    .join(" ");

  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const article = await getPost(slug);

  if (!article) {
    return buildMetadata({
      fallbackTitle:
        "Article Not Found | Golden Palmera Global",
      fallbackDescription:
        "The requested GPG Insights article could not be found.",
    });
  }

  return buildMetadata({
    fallbackTitle:
      `${article.title} | Golden Palmera Global`,
    fallbackDescription: article.excerpt,
    canonical: `/blog/${article.slug}`,
  });
}


export default async function BlogArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const article = await getPost(slug);

  if (!article) {
    notFound();
  }

  const readingTime = calculateReadingTime(article.body);

  let relatedArticles: RelatedPost[] = [];

  if (article.category || article.tags?.length) {
    relatedArticles = await client.fetch(
      RELATED_BLOG_POSTS_QUERY,
      {
        slug: article.slug,
        category: article.category,
        tags: article.tags || [],
      },
      {
        next: {
          revalidate: 60,
        },
      },
    );
  }

  if (relatedArticles.length < 3) {
    const fallback = await client.fetch(
      RECENT_BLOG_POSTS_QUERY,
      {
        slug: article.slug,
        category: article.category,
        tags: article.tags || [],
      },
      {
        next: {
          revalidate: 60,
        },
      },
    );

    const existingIds = new Set(
      relatedArticles.map((item) => item._id),
    );

    for (const article of fallback) {
      if (
        relatedArticles.length >= 3 ||
        existingIds.has(article._id)
      ) {
        continue;
      }

      relatedArticles.push(article);
      existingIds.add(article._id);
    }
  }

  relatedArticles = relatedArticles.slice(0, 3);

  const articleImage = article.coverImage
    ? urlFor(article.coverImage)
        .width(1400)
        .height(800)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  const ogImage = article.seo?.ogImage || article.coverImage;

  const ogImageUrl = ogImage
    ? urlFor(ogImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .url()
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: article.title,

    description: article.excerpt,

    image: ogImageUrl
      ? [ogImageUrl]
      : undefined,

    datePublished: article.publishedAt,

    dateModified: article.publishedAt,

    author: {
      "@type": "Person",
      name:
        article.author?.name ||
        "Golden Palmera Global",
    },

    publisher: {
      "@type": "Organization",
      name: "Golden Palmera Global",
      url: SITE_URL,
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
  };

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Hero */}
      <section className="px-6 pb-16 pt-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-[#6d756d] transition-colors hover:text-[#a07a3d]"
          >
            ← Back to Insights
          </Link>

          <div className="mt-16">
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em]">
              <span className="text-[#a07a3d]">
                {article.category || "GPG Insights"}
              </span>

              <span className="h-1 w-1 rounded-full bg-[#b8b4a8]" />

              <span className="text-[#858b85]">
                {formatDate(article.publishedAt)}
              </span>

              <span className="h-1 w-1 rounded-full bg-[#b8b4a8]" />

              <span className="text-[#858b85]">
                {readingTime} min read
              </span>
            </div>

            <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="mt-8 max-w-3xl text-xl leading-9 text-[#687068]">
                {article.excerpt}
              </p>
            )}

            {article.author?.name && (
              <div className="mt-10 flex items-center gap-4">
                {article.author.image ? (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={urlFor(article.author.image)
                        .width(100)
                        .height(100)
                        .fit("crop")
                        .url()}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}

                <div>
                  <p className="text-sm font-semibold">
                    {article.author.name}
                  </p>

                  {article.author.role && (
                    <p className="mt-1 text-xs text-[#858b85]">
                      {article.author.role}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {articleImage && (
        <section className="px-6 pb-20 md:px-12 lg:px-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem]">
            <div className="relative aspect-[16/8]">
              <Image
                src={articleImage}
                alt={article.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article */}
      <article className="border-y border-[#ddd9cc] bg-white px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl">
          {article.body && (
            <div className="prose prose-lg max-w-none prose-headings:text-[#182018] prose-p:text-[#5f675f] prose-p:leading-9 prose-a:text-[#a07a3d]">
              <PortableText value={article.body} />
            </div>
          )}
        </div>
      </article>

      {/* Tags */}
      {article.tags?.length ? (
        <section className="bg-white px-6 pb-12 md:px-12 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#f7f6f1] px-4 py-2 text-xs font-medium text-[#687068]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
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

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {relatedArticles.map((related) => (
                <Link
                  key={related._id}
                  href={`/blog/${related.slug}`}
                  className="group overflow-hidden rounded-3xl border border-[#ddd9cc] bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                  {related.coverImage && (
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={urlFor(related.coverImage)
                          .width(700)
                          .height(460)
                          .fit("crop")
                          .auto("format")
                          .url()}
                        alt={related.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-7">
                    <span className="text-xs uppercase tracking-[0.18em] text-[#a07a3d]">
                      {related.category || "GPG Insights"}
                    </span>

                    <h3 className="mt-6 text-2xl font-semibold leading-tight transition-colors group-hover:text-[#a07a3d]">
                      {related.title}
                    </h3>

                    {related.excerpt && (
                      <p className="mt-4 leading-7 text-[#687068]">
                        {related.excerpt}
                      </p>
                    )}

                    <div className="mt-7 text-sm font-semibold">
                      Read article
                      <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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