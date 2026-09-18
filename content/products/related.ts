import { getRelatedProducts } from "./sanity";

export async function getProductRecommendations(
  slug: string,
) {
  return getRelatedProducts(slug);
}
