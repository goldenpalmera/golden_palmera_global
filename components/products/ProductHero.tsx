import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";

import type { Product } from "@/content/products/types";
import { formatCategory } from "@/content/products/formatters";

type Props = {
  product: Product;
};

export function ProductHero({ product }: Props) {
  return (
    <section className="bg-[#f5f2e9] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative overflow-hidden rounded-3xl bg-[#e8e3d5]">
            <div className="relative aspect-[4/3]">
              {product.image ? (
                <Image
                  src={urlFor(product.image)
                    .width(1200)
                    .height(900)
                    .fit("crop")
                    .auto("format")
                    .url()}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <ProductPlaceholder />
              )}
            </div>

            {product.featured && (
              <div className="absolute left-6 top-6">
                <span className="rounded-full border border-white/20 bg-[#173f2b]/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  Featured
                </span>
              </div>
            )}
          </div>

          <div>
            {product.category && (
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
                {formatCategory(product.category)}
              </p>
            )}

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#173f2b] sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            {product.botanicalName && (
              <p className="mt-4 text-sm italic text-slate-500">
                {product.botanicalName}
              </p>
            )}

            {product.shortDescription && (
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                {product.shortDescription}
              </p>
            )}

            <div className="mt-9 flex flex-wrap gap-3">
              {product.origin && (
                <ProductTag
                  label="Origin"
                  value={product.origin}
                />
              )}

              {product.availability && (
                <ProductTag
                  label="Availability"
                  value={product.availability}
                />
              )}
            </div>

            <div className="mt-10">
              <Link
                href={`/quote/request-quote?product=${product.slug}`}
                className="inline-flex rounded-full bg-[#173f2b] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#b78628]"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductTag({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-full border border-[#173f2b]/10 bg-white px-4 py-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#b78628]">
        {label}
      </span>

      <span className="ml-2 text-xs text-[#173f2b]">
        {value}
      </span>
    </div>
  );
}

function ProductPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#173f2b] via-[#2d6347] to-[#b78628]">
      <span className="text-6xl font-black tracking-[-0.08em] text-white/20">
        GPG
      </span>
    </div>
  );
}
