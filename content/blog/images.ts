import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

export function getArticleImageUrl(
  image?: SanityImageSource,
): string | null {
  if (!image) {
    return null;
  }

  return urlFor(image)
    .width(1400)
    .height(800)
    .fit("crop")
    .auto("format")
    .url();
}

export function getRelatedImageUrl(
  image?: SanityImageSource,
): string | null {
  if (!image) {
    return null;
  }

  return urlFor(image)
    .width(700)
    .height(460)
    .fit("crop")
    .auto("format")
    .url();
}

export function getAuthorImageUrl(
  image?: SanityImageSource,
): string | null {
  if (!image) {
    return null;
  }

  return urlFor(image)
    .width(100)
    .height(100)
    .fit("crop")
    .auto("format")
    .url();
}