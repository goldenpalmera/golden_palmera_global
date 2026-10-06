import { getProducts } from "./getProducts";
import type { Product } from "./types";
import { 
  FALLBACK_PRODUCTS,
} from "./fallbacks";


export async function getProductsData(): Promise<Product[]> {
  const products = await getProducts();

  if (!products?.length) {
    return FALLBACK_PRODUCTS;
  }

  return products.map((product) => ({
    ...product
  }));
}