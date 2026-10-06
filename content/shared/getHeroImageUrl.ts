import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

export function getHeroImageUrl(
  image?: SanityImageSource | null,
  width = 1920,
  height = 1080,
): string | null {
  if (!image) {
    return null;
  }

  return urlFor(image)
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .url();
}
