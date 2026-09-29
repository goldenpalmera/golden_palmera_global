import { getProducts } from "./getProducts";

export async function getProductStaticParams() {
  const products = await getProducts();

  return products
    .filter((product) => product.slug)
    .map((product) => ({
      slug: product.slug,
    }));
}
