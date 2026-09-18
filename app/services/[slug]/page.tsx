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

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getServiceStaticParams();
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

  const service = await getService(slug);

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
