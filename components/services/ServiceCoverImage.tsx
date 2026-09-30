import Image from "next/image";
import {
  FALLBACK_SERVICE_IMAGES,
} from "@/content/services/fallbacks";
import type { ServicePageData } from "@/content/services/types";
import { getServiceImageUrl } from "@/content/services/images";

type Props = {
  service: ServicePageData;
};

export function ServiceCoverImage({ service }: Props) {
  // const imageUrl = service.coverImage?.asset?.url ??
  const imageUrl = getServiceImageUrl(service.coverImage) ??
    FALLBACK_SERVICE_IMAGES[service.slug];

  return (
    <section className="px-6 py-8 md:px-10 lg:px-16 lg:py-12">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-2xl">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={service.title}
            width={1400}
            height={700}
            priority
            className="h-auto w-full object-cover"
          />
        ) : (
          <div 
            className="
            absolute 
            inset-0 
            bg-[radial-gradient(circle_at_70%_30%,#a07a3d,transparent_35%),linear-gradient(135deg,#182018,#293329)]
          " 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#182018]/50 via-transparent to-transparent" />
      </div>
    </section>
  );
}
