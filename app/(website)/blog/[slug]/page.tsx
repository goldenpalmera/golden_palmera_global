import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getBlogPostMetadata } from "@/content/blog/metadata";
import { getRelatedBlogPosts } from "@/content/blog/related";
import { getPost } from "@/content/blog/sanity";
import { buildBlogArticleJsonLd } from "@/content/blog/seo";
import {
  calculateReadingTime,
  formatDate,
} from "@/content/blog/utils";
import {
  getArticleImageUrl,
  getAuthorImageUrl,
} from "@/content/blog/images";
import { 
  FALLBACK_ARTICLE,
  FALLBACK_BLOG_POSTS,
  FALLBACK_IMAGE_BY_SLUG,
} from "@/content/blog/fallbacks";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { getBlogStaticParams } from "@/content/blog/staticParams";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const sanityParams = await getBlogStaticParams();

  const fallbackParams = FALLBACK_BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));

  const params = [
    ...sanityParams,
    ...fallbackParams,
  ];

  return Array.from(
    new Map(
      params.map((item) => [item.slug, item])
    ).values()
  );
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  return getBlogPostMetadata(params);
}

export default async function BlogArticlePage({
  params,
}: Props) {
  const { slug } = await params;

  const sanityArticle = await getPost(slug);

  const article =
    sanityArticle ??
    (slug === FALLBACK_ARTICLE.slug
      ? FALLBACK_ARTICLE
      : undefined
    );

  if (!article) {
    notFound();
  }


  const [sanityRelatedArticles] =
  await Promise.all([
    getRelatedBlogPosts(article),
  ]);

  const relatedArticles =
    sanityRelatedArticles.length > 0
      ? sanityRelatedArticles
      : FALLBACK_BLOG_POSTS.filter(
          (post) => post.slug !== article.slug,
        ).slice(0, 3);

  const readingTime = calculateReadingTime(
    article.body,
  );

  const articleImage = 
    getArticleImageUrl(article.coverImage) ??
    FALLBACK_IMAGE_BY_SLUG[article.slug];
    
  const authorImage = getAuthorImageUrl(
    article.author?.image,
  );

  const jsonLd = buildBlogArticleJsonLd(article);

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
                {article.category ||
                  "GPG Insights"}
              </span>

              {article.publishedAt && (
                <>
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-[#b8b4a8]"
                  />

                  <time
                    dateTime={article.publishedAt}
                    className="text-[#858b85]"
                  >
                    {formatDate(
                      article.publishedAt,
                    )}
                  </time>
                </>
              )}

              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-[#b8b4a8]"
              />

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
                {authorImage ? (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={authorImage}
                      alt=""
                      fill
                      sizes="48px"
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

      {/* Cover */}
      <section className="px-6 pb-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem]">
          <div className="relative aspect-[16/8] overflow-hidden bg-[#182018]">
            {articleImage ? (
              <Image
                src={articleImage}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1400px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#a07a3d_0%,transparent_35%),linear-gradient(135deg,#182018_0%,#293329_50%,#182018_100%)]">
                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />

                <div className="absolute bottom-10 left-10 max-w-lg md:bottom-14 md:left-14">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#d2b477]">
                    Golden Palmera Global
                  </p>

                  <p className="mt-4 text-2xl font-semibold text-white md:text-4xl">
                    Agriculture. Commodities. Global Trade.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="border-y border-[#ddd9cc] bg-white px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl text-justify">
          {article.body?.length ? (
            <div
              className="
                prose
                prose-lg
                max-w-none
                prose-headings:font-semibold
                prose-headings:tracking-tight
                prose-headings:text-[#182018]
                prose-h2:mt-14
                prose-h2:mb-5
                prose-h2:text-3xl
                prose-h3:mt-10
                prose-h3:mb-4
                prose-h3:text-2xl
                prose-p:text-[#5f675f]
                prose-p:leading-8
                prose-p:mb-7
                prose-a:text-[#a07a3d]
                prose-strong:text-[#182018]
              "
            >
              <PortableText value={article.body} />
            </div>
          ) : (
            <p className="text-[#687068]">
              This article has no published content yet.
            </p>
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

      {/* Related */}
      <RelatedArticles
        articles={relatedArticles}
      />

      {/* CTA */}
      <section className="bg-[#182018] px-6 py-24 text-white md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-[#d2b477]">
              Work with GPG
            </p>

            <h2 className="mt-5 text-4xl font-semibold">
              Building stronger agricultural trade
              together.
            </h2>

            <p className="mt-5 leading-7 text-white/60">
              Connect with Golden Palmera Global for
              sourcing, export, commodity supply, and
              international trade opportunities.
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