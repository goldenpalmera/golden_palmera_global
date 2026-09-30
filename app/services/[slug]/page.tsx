import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getService,
} from "@/content/services/sanity";
import {
  getServiceMetadata,
} from "@/content/services/metadata";
import {
  getServiceStaticParams,
} from "@/content/services/staticParams";
import {
  ServiceHero,
  ServiceCoverImage,
  ServiceContent,
  ServiceCTA,
} from "@/components/services";
import { FALLBACK_SERVICES } from "@/content/services/fallbacks";


type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const sanityParams =
    await getServiceStaticParams();

  const fallbackParams =
    FALLBACK_SERVICES.map((service) => ({
      slug: service.slug,
    }));

  const params = [
    ...sanityParams,
    ...fallbackParams,
  ];

  return Array.from(
    new Map(
      params.map((item) => [
        item.slug,
         item,
      ]),
    ).values(),
  );
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  return getServiceMetadata(slug);
}

export default async function ServicePage({
  params,
}: Props) {
  const { slug } = await params;

  const sanityService =
    await getService(slug);

  const service =
    sanityService ??
    FALLBACK_SERVICES.find(
      (item) => item.slug === slug,
    );

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-[#f8f6f0] text-[#171717]">
      <ServiceHero service={service} />
      <ServiceCoverImage service={service} />
      <ServiceContent service={service} />
      <ServiceCTA />
    </main>
  );
}
