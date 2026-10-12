import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductMetadata } from "@/content/products/metadata";
import { getProduct, getRelatedProducts } from "@/content/products/getProducts";
import { ProductHero } from "@/components/products/ProductHero";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductAttributes } from "@/components/products/ProductAttributes";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { ProductCTA } from "@/components/products/ProductCTA";
import { FALLBACK_PRODUCTS } from "@/content/products/fallbacks";
import { getProductStaticParams } from "@/content/products/staticParams";
import type { ProductPageProps } from "@/content/products/types";

export async function generateStaticParams() {
  const products = await getProductStaticParams();

  const fallbackParams = FALLBACK_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));

  const params = [
    ...products,
    ...fallbackParams,
  ];

  return Array.from(
    new Map(
      params.map((item) => [item.slug, item]),
    ).values(),
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  return getProductMetadata(params);
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const [ sanityProduct, sanityRelatedProducts ] = await Promise.all([
    getProduct(slug),
    getRelatedProducts(slug),
  ]);

  const product =
    sanityProduct ??
    FALLBACK_PRODUCTS.find(
      (item) => item.slug === slug,
    );

  if (!product) {
    notFound();
  }

  console.log("prod >>>")

  const relatedProducts =
    sanityRelatedProducts.length > 0
      ? sanityRelatedProducts
      : FALLBACK_PRODUCTS.filter(
          (item) => item.slug !== product.slug,
        ).slice(0, 3);


  return (
    <>
      <main>
        <ProductHero product={product} />
        <ProductGallery product={product} />
        <ProductDetails product={product} />
        <ProductAttributes product={product} />
        <RelatedProducts products={relatedProducts} />
        <ProductCTA product={product} />
      </main>
    </>
  );
}
