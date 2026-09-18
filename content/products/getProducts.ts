import { getSanityClient } from "@/sanity/lib/client";
import {
  PRODUCTS_QUERY,
  PRODUCT_QUERY,
} from "@/sanity/lib/queries";

import type { Product } from "./types";
import { mapProduct } from "./sanity";

export async function getProducts(): Promise<Product[]> {
  const client = getSanityClient();

  const products = await client.fetch(
    PRODUCTS_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["products"],
      },
    }
  );

  return products.map(mapProduct);
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
