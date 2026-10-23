import { getSanityClient } from "@/sanity/lib/client";
import {
  PRODUCTS_QUERY,
  PRODUCT_QUERY,
  RELATED_PRODUCTS_QUERY,
} from "@/sanity/lib/queries/products/queries";
import type { 
  Product,
  RelatedProduct,
 } from "./types";
import { mapProduct } from "./sanity";

export async function getProducts(): Promise<Product[]> {
  const client = getSanityClient();

  return await client.fetch(
    PRODUCTS_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["products"],
      },
    }
  );
}

export async function getProduct(
  slug: string
): Promise<Product | null> {
  const client = getSanityClient();

  const product = await client.fetch(
    PRODUCT_QUERY,
    { slug },
    {
      next: {
        revalidate: 60,
        tags: [`product:${slug}`],
      },
    }
  );

  return product ? mapProduct(product) : null;
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