import Link from "next/link";
import Image from "next/image";

import type { RelatedPost } from "@/content/blog/types";
import { getRelatedImageUrl } from "@/content/blog/images";

type RelatedArticlesProps = {
  articles: RelatedPost[];
};

export function RelatedArticles({
  articles,
}: RelatedArticlesProps) {
  if (!articles.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-articles-heading"
      className="bg-[#f7f6f1] px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#a07a3d]">
            Continue reading
          </p>

          <h2
            id="related-articles-heading"
            className="mt-3 text-3xl font-semibold md:text-4xl"
          >
            Related insights
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const imageUrl = getRelatedImageUrl(
              article.coverImage,
            );

            return (
              <article
                key={article._id}
                className="group overflow-hidden rounded-3xl border border-[#ddd9cc] bg-white"
              >
                {imageUrl && (
                  <Link
                    href={`/blog/${article.slug}`}
                    aria-label={`Read ${article.title}`}
                    className="relative block aspect-[7/4] overflow-hidden"
                  >
                    <Image
                      src={imageUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                )}

                <div className="p-7">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#a07a3d]">
                    {article.category || "GPG Insights"}
                  </p>

                  <h3 className="mt-4 text-xl font-semibold leading-tight">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="transition-colors hover:text-[#a07a3d] focus:outline-none focus:ring-2 focus:ring-[#a07a3d] focus:ring-offset-4"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  {article.excerpt && (
                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#687068]">
                      {article.excerpt}
                    </p>
                  )}

                  <Link
                    href={`/blog/${article.slug}`}
                    className="mt-6 inline-flex text-sm font-semibold hover:text-[#a07a3d] focus:outline-none focus:ring-2 focus:ring-[#a07a3d] focus:ring-offset-4"
                  >
                    Read article →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}