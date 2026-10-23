import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

export function getServiceImageUrl(
  image?: SanityImageSource,
): string | null {
  if (!image) {
    return null;
  }

  return urlFor(image)
    .width(1200)
    .height(900)
    .fit("crop")
    .auto("format")
    .url();
}