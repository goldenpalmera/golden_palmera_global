import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { 
  commoditiesQuery, 
  featuredProductsQuery, 
  homeServicesQuery, 
  approachesQuery,
  homePageQuery,
} from "@/sanity/lib/queries";
import type { 
  Commodity, 
  HomeService, 
  Approach, 
  HomePageData,
} from "@/sanity/lib/types";

import HomeHero from "@/components/home/HomeHero";

type Product = {
  _id: string;
  name: string;
  slug: string;
  scientificName?: string;
  description: string;
  symbol?: string;
  image?: unknown;
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<HomePageData | null>(
    homePageQuery
  );

  const seo = page?.seo;

  return {
    title:
      seo?.metaTitle ||
      page?.title ||
      "Golden Palmera Global",

    description:
      seo?.metaDescription ||
      "Golden Palmera Global connects quality agricultural commodities from Africa with buyers and markets around the world.",

    keywords: seo?.keywords,

    robots: seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },

    openGraph: {
      title:
        seo?.metaTitle ||
        page?.title ||
        "Golden Palmera Global",

      description:
        seo?.metaDescription ||
        "Golden Palmera Global connects quality agricultural commodities from Africa with buyers and markets around the world.",

      images: seo?.ogImage?.asset?.url
        ? [
            {
              url: seo.ogImage.asset.url,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title:
        seo?.metaTitle ||
        page?.title ||
        "Golden Palmera Global",
      description:
        seo?.metaDescription ||
        "Golden Palmera Global connects quality agricultural commodities from Africa with buyers and markets around the world.",
      images: seo?.ogImage?.asset?.url
        ? [seo.ogImage.asset.url]
        : undefined,
    },
  };
}

async function getCommodities() {
  return client.fetch<Commodity[]>(commoditiesQuery);
}

async function getProducts() {
  return client.fetch<Product[]>(
    featuredProductsQuery
  );
}

async function getServices() {
  return client.fetch<HomeService[]>(
    homeServicesQuery
  );
}

async function getApproaches() {
  return client.fetch<Approach[]>(
    approachesQuery
  );
}

export default async function HomePage() {
  const [commodities, services, approaches] = await Promise.all([
    getCommodities(), 
    getServices(),
    getApproaches(),
  ]);
  const products = await getProducts();

  return (
    <main className="site-shell">
      <HomeHero 
      commodities={commodities} 
      services={services}
      approaches={approaches}
      />
    </main>
  );
}

