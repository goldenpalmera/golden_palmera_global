import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { client } from "@/sanity/lib/client";
import { serviceBySlugQuery } from "@/sanity/lib/queries";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type ServicePage = {
  title: string;
  slug: string;
  number: string;
  shortDescription?: string;
  description?: PortableTextBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    noIndex?: boolean;
  };
};

async function getService(slug: string) {
  return client.fetch<ServicePage | null>(
    serviceBySlugQuery,
    { slug }
  );
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: "Service | Golden Palmera Global",
    };
  }

  return {
    title:
      service.seo?.metaTitle ||
      `${service.title} | Golden Palmera Global`,

    description:
      service.seo?.metaDescription ||
      service.shortDescription,

    robots: service.seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

export default async function ServicePage({
  params,
}: Props) {
  const { slug } = await params;

  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">
      <section className="px-6 pb-20 pt-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <span className="text-sm font-medium text-[#a07a3d]">
            {service.number}
          </span>

          <p className="mt-6 text-sm uppercase tracking-[0.25em] text-[#a07a3d]">
            What We Do
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
            {service.title}
          </h1>

          {service.shortDescription && (
            <p className="mt-8 max-w-3xl text-xl leading-8 text-[#5d655d]">
              {service.shortDescription}
            </p>
          )}
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-12 lg:px-20">
        <article className="prose prose-lg mx-auto max-w-4xl">
          {service.description && (
            <PortableText value={service.description} />
          )}
        </article>
      </section>
    </main>
  );
}