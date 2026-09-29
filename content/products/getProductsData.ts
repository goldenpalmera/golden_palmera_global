import { getProducts } from "./getProducts";
import type { Product } from "./types";
import { 
  FALLBACK_PRODUCTS,
} from "./fallbacks";


export async function getProductsData(): Promise<Product[]> {
  const products = await getProducts();

  if (!products?.length) {
    console.log("products>>")
    return FALLBACK_PRODUCTS;
  }

  console.log("products >>>", products)

  return products.map((product) => ({
    ...product
  }));
}