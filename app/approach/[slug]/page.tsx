import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getApproach } from "@/content/approach/sanity";
import { Props } from "@/content/approach/types";
import { getApproachMetadata } from "@/content/approach/metadata";
import { getApproachStaticParams } from "@/content/approach/staticParams";
import { FALLBACK_APPROACHES } from "@/content/approach/fallback";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const sanityParams =
    await getApproachStaticParams();

  const fallbackParams =
    FALLBACK_APPROACHES.map((approach) => ({
      slug: approach.slug,
    }));

    const params = [
      ...sanityParams,
      ...fallbackParams,
    ];

  return Array.from(
    new Map(
      params.map(
        (item) => [item.slug, item],
      ),
    ).values(),
  );
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  return getApproachMetadata(params);
}

export default async function ApproachDetailPage({
  params,
}: Props) {
  const { slug } = await params;
  const sanityApproach =
    await getApproach(slug);

  const approach =
    sanityApproach ??
    FALLBACK_APPROACHES.find(
      (item) => item.slug === slug,
    );

  if (!approach) {
    notFound();
  }

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">
      <section className="px-6 pb-20 pt-32 md:px-12 lg:px-20">
        <Link
          href="/#approach"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#8a8b83] transition-colors hover:text-[#6f716a]"

        >
          <ArrowLeft size={17} strokeWidth={2} />
          Back to Home
        </Link>
        <div className="mx-auto max-w-5xl">
          <span className="text-sm font-medium text-[#a07a3d]">
            {approach.number}
          </span>

          <p className="mt-6 text-sm uppercase tracking-[0.25em] text-[#a07a3d]">
            Our Approach
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
            {approach.title}
          </h1>

          {approach.shortDescription && (
            <p className="mt-8 max-w-3xl text-xl leading-8 text-[#5d655d]">
              {approach.shortDescription}
            </p>
          )}
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-12 lg:px-20">
        <article className="mx-auto max-w-3xl">
          {approach.description ? (
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
                prose-p:mb-8
                prose-p:leading-8
                prose-p:text-[#5f675f]
                prose-strong:text-[#182018]
                prose-a:text-[#a07a3d]
                prose-a:no-underline
                hover:prose-a:underline
                prose-ul:my-8
                prose-ol:my-8
                prose-li:text-[#5f675f]
                prose-li:leading-8
                prose-blockquote:border-[#a07a3d]
                prose-blockquote:text-[#687068]
              "
            >
              <PortableText value={approach.description} />
            </div>
          ) : (
            <p className="text-[#687068]">
              More information about this approach will be
              available soon.
            </p>
          )}
        </article>
      </section>

    </main>
  );
}