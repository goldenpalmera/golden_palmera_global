import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Product } from "@/content/products/types";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({
  product,
}: ProductGalleryProps) {
  const images = product.gallery ?? [];

  if (!images.length) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => {
            const imageUrl = urlFor(image)
              .width(1000)
              .height(750)
              .fit("crop")
              .auto("format")
              .url();

            return (
              <div
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f5f2e9]"
              >
                <Image
                  src={imageUrl}
                  alt={`${product.name} — image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
