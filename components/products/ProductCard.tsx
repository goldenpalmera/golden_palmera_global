import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/content/products/types";
import { urlFor } from "@/sanity/lib/image";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({
  product,
  index,
}: ProductCardProps) {
  const imageUrl = product.image
    ? urlFor(product.image)
        .width(800)
        .height(450)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="
        group
        block
        overflow-hidden
        rounded-2xl
        border border-black/[0.06]
        bg-white
        shadow-[0_4px_20px_rgba(23,63,43,0.04)]
        transition-[transform,box-shadow,border-color]
        duration-500
        ease-out
        hover:-translate-y-1
        hover:border-[#b78628]/20
        hover:shadow-[0_12px_30px_rgba(23,63,43,0.08)]
      "
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e3d5]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              25vw
            "
            className="
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.035]
            "
          />
        ) : (
          <ProductImagePlaceholder />
        )}

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/[0.04] transition-colors duration-500 group-hover:bg-transparent" />

        {/* Number */}
        {index !== undefined && (
          <div className="absolute left-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-black/10 backdrop-blur-sm">
            <span className="text-[9px] font-semibold text-white">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}

        {/* Featured */}
        {product.featured && (
          <div className="absolute bottom-3.5 left-3.5">
            <span className="rounded-full border border-white/20 bg-[#173f2b]/80 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}

        {/* Arrow */}
        <div
          className="
            absolute
            right-3.5
            top-3.5
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-[#173f2b]
            opacity-0
            translate-y-1
            shadow-sm
            transition-all
            duration-400
            ease-out
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <span className="text-xs">↗</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {product.botanicalName && (
          <p className="line-clamp-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#b78628]">
            {product.botanicalName}
          </p>
        )}

        <h3 className="mt-2 text-lg font-semibold leading-tight text-[#173f2b] transition-colors duration-300 ease-out group-hover:text-[#b78628]">
          {product.name}
        </h3>

        {product.shortDescription && (
          <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-slate-600">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#173f2b] transition-colors duration-300 group-hover:text-[#b78628]">
            Explore
          </span>

          <span className="text-sm text-[#b78628] transition-transform duration-500 ease-out group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function ProductImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#173f2b] via-[#2d6347] to-[#b78628]">
      <span className="text-4xl font-black tracking-[-0.08em] text-white/20">
        GPG
      </span>
    </div>
  );
}
