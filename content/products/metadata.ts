import type { Metadata } from "next";
import { buildMetadata } from "@/sanity/lib/seo";
import { getProduct } from "./sanity";
import type { ProductPageProps } from "./types";
import { getProductsPageSEO } from "./getProductsPage";

export async function getProductsPageMetadata(): Promise<Metadata> {
  const page = await getProductsPageSEO();

  return buildMetadata({
    seo: page?.seo,

    fallbackTitle:
      "Our Commodities | Golden Palmera Global",

    fallbackDescription:
      page?.heroDescription ||
      "Quality agricultural commodities sourced from Africa for local and international markets.",

    canonical: "/products",
  });
}


export async function getProductMetadata(
  params: ProductPageProps["params"],
): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | Golden Palmera Global",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildMetadata({
    seo: product.seo,

    fallbackTitle:
      `${product.name} | Golden Palmera Global`,

    fallbackDescription:
      product.shortDescription ||
      `Learn more about ${product.name} from Golden Palmera Global.`,

    canonical: `/products/${product.slug}`,
  });
}
