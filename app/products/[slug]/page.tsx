import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/sharedComponents/Footer";
import { getProductMetadata } from "@/content/products/metadata";
import { getProduct, getRelatedProducts } from "@/content/products/sanity";
import { ProductHero } from "@/components/products/ProductHero";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductAttributes } from "@/components/products/ProductAttributes";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { ProductCTA } from "@/components/products/ProductCTA";

import type { ProductPageProps } from "@/content/products/types";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  return getProductMetadata(params);
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const [product, relatedProducts] = await Promise.all([
    getProduct(slug),
    getRelatedProducts(slug),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <>
      <main>
        <ProductHero product={product} />
        <ProductDetails product={product} />
        <ProductAttributes product={product} />
        <RelatedProducts products={relatedProducts} />
        <ProductCTA product={product} />
      </main>
      <Footer />
    </>
  );
}
