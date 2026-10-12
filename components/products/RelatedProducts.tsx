import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { RelatedProduct } from "@/content/products/types";

type Props = {
  products: RelatedProduct[];
};

export function RelatedProducts({
  products,
}: Props) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between gap-8 border-b border-black/5 pb-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
              Continue exploring
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl">
              You may also be interested in
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-[#173f2b] hover:text-[#b78628] sm:block"
          >
            View all products →
          </Link>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {products.map((product) => (
            <RelatedProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedProductCard({
  product,
}: {
  product: RelatedProduct;
}) {
  const imageUrl = product.image
    ? urlFor(product.image)
        .width(900)
        .height(675)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e3d5]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#173f2b] to-[#b78628]">
            <span className="text-5xl font-black text-white/20">
              GPG
            </span>
          </div>
        )}
      </div>

      <div className="p-7">
        {product.botanicalName && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b78628]">
            {product.botanicalName}
          </p>
        )}

        <h3 className="mt-3 text-xl font-semibold text-[#173f2b]">
          {product.name}
        </h3>

        {product.shortDescription && (
          <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-600">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-6 border-t border-black/5 pt-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#173f2b] group-hover:text-[#b78628]">
            Explore Product →
          </span>
        </div>
      </div>
    </Link>
  );
}
