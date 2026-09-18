import type { 
  Product as SanityProduct,
  ProductsPage as SanityProductsPage,
  Product,
  ProductsPage,
  RelatedProduct,
} from "./types";
import { FALLBACK } from "./fallbacks";
import { mapLink } from "../shared/linkMapper";
import { SanityImage } from "@/sanity/lib/types";
import { getSanityClient } from "@/sanity/lib/client";
import {
  PRODUCT_QUERY,
  RELATED_PRODUCTS_QUERY,
} from "@/sanity/lib/queries/products/queries";

function mapImage(
  image: SanityProduct["image"]
): SanityImage | undefined {
  if (!image?.asset?.url) {
    return undefined;
  }

  return {
    asset: {
      _id: image.asset._id,
      url: image.asset.url,
    },
    hotspot: image.hotspot,
    crop: image.crop,
  };
}

export function mapProduct(
  product: SanityProduct
): Product {
  return {
    _id: product._id,
    name: product.name,
    slug:
      typeof product.slug === "string"
        ? product.slug
        : product.slug ?? "",

    botanicalName: product.botanicalName,
    category: product.category,
    shortDescription: product.shortDescription,
    description: product.description,

    image: mapImage(product.image),

    gallery: product.gallery
      ?.map(mapImage)
      .filter(
        (image): image is SanityImage =>
          Boolean(image)
      ),

    origin: product.origin,
    processing: product.processing,
    grade: product.grade,
    minimumOrder: product.minimumOrder,
    availability: product.availability,

    certifications: product.certifications,
    forms: product.forms,
    packaging: product.packaging,
    applications: product.applications,

    featured: product.featured,
    seo: product.seo,
  };
}

export function mapProductsPage(
  page: SanityProductsPage | null
): ProductsPage {
  return {
    title: page?.title ?? FALLBACK.title,

    hero: {
      eyebrow:
        page?.hero.eyebrow ??
        FALLBACK.hero.eyebrow,

      title:
        page?.hero.title ??
        FALLBACK.hero.title,

      description:
        page?.hero.description ??
        FALLBACK.hero.description,
    },

    portfolio: {
      eyebrow:
        page?.portfolio.eyebrow ??
        FALLBACK.portfolio.eyebrow,

      title:
        page?.portfolio.title ??
        FALLBACK.portfolio.title,

      description:
        page?.portfolio.description ??
        FALLBACK.portfolio.description,
    },

    supplyChain: {
      eyebrow:
        page?.supplyChain?.eyebrow ??
        FALLBACK.supplyChain.eyebrow,

      title:
        page?.supplyChain?.title ??
        FALLBACK.supplyChain.title,

      description:
        page?.supplyChain?.description ??
        FALLBACK.supplyChain.description,

      steps:
        page?.supplyChain?.steps?.length
          ? page.supplyChain.steps.map((step, index) => ({
              number:
                step.number ??
                String(index + 1).padStart(2, "0"),

              title:
                step.title ?? "",

              description:
                step.description ?? "",
            }))
          : FALLBACK.supplyChain.steps,
    },

    cta: {
      title:
        page?.cta?.title ??
        FALLBACK.cta.title,

      description:
        page?.cta?.description ??
        FALLBACK.cta.description,

      label:
        page?.cta?.label ??
        FALLBACK.cta.label,
        
      link:
        mapLink(page?.cta?.link),
    },
  };
}

export async function getProduct(
  slug: string,
): Promise<Product | null> {
  const client = getSanityClient();

  return client.fetch(
    PRODUCT_QUERY,
    { slug },
    {
      next: {
        revalidate: 60,
        tags: [`product:${slug}`],
      },
    },
  );
}

export async function getRelatedProducts(
  slug: string,
): Promise<RelatedProduct[]> {
  const client = getSanityClient();

  return client.fetch(
    RELATED_PRODUCTS_QUERY,
    { slug },
    {
      next: {
        revalidate: 60,
        tags: ["products"],
      },
    },
  );
}
