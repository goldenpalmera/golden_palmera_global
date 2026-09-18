import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getApproach } from "@/content/approach/sanity";
import { Props } from "@/content/approach/types";
import { getApproachMetadata } from "@/content/approach/metadata";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  return getApproachMetadata(params);
}


export default async function ApproachDetailPage({
  params,
}: Props) {
  const { slug } = await params;
  const approach = await getApproach(slug);

  if (!approach) {
    notFound();
  }

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">
      <section className="px-6 pb-20 pt-32 md:px-12 lg:px-20">
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
        <article className="prose prose-lg mx-auto max-w-4xl">
          {approach.description && (
            <PortableText value={approach.description} />
          )}
        </article>
      </section>
    </main>
  );
}