import { getSanityClient } from "@/sanity/lib/client";
import { 
  PRODUCTS_PAGE_QUERY,
  PRODUCTS_PAGE_SEO_QUERY 
} from "@/sanity/lib/queries/products/queries";
import { 
  ProductsSeoData,
  ProductsPage
} from "./types";

export async function getProductsPage() {
  const client = getSanityClient();

  return client.fetch<ProductsPage | null>(
    PRODUCTS_PAGE_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["products-page"],
      },
    }
  );
}

export async function getProductsPageSEO() {
  const client = getSanityClient();

  return client.fetch<ProductsSeoData | null>(
    PRODUCTS_PAGE_SEO_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["products-page-seo"],
      },
    }
  );
}
