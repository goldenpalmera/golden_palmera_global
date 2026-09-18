import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageProps } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";

export function SanityImg({
  image, alt, width = 800, height = 600, fill, className, sizes, priority,
}: SanityImageProps) {
  if (!image) {
    return (
      <div className={cn("bg-forest-900 flex items-center justify-center", className)}>
        <span className="text-ivory-100/20 text-xs tracking-wider uppercase">Image</span>
      </div>
    );
  }

  const src = urlFor(image).width(width).height(height).format("webp").quality(85).url();

  if (fill) {
    return (
      <Image
        src={src} alt={alt} fill
        className={cn("object-cover", className)}
        sizes={sizes ?? "(max-width:768px) 100vw, 50vw"}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src} alt={alt}
      width={width} height={height}
      className={cn("object-cover", className)}
      sizes={sizes ?? "(max-width:768px) 100vw, 50vw"}
      priority={priority}
    />
  );
}