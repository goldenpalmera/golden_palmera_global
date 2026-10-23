import { getRelatedProducts } from "./getProducts";

export async function getProductRecommendations(
  slug: string,
) {
  return getRelatedProducts(slug);
}
