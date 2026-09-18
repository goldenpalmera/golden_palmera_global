import Image from "next/image";

import type { ServicePageData } from "@/content/services/types";

type Props = {
  service: ServicePageData;
};

export function ServiceCoverImage({ service }: Props) {
  const imageUrl = service.coverImage?.asset?.url;

  if (!imageUrl) return null;

  return (
    <section className="px-6 py-8 md:px-10 lg:px-16 lg:py-12">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-2xl">
        <Image
          src={imageUrl}
          alt={service.title}
          width={1400}
          height={700}
          priority
          className="h-auto w-full object-cover"
        />
      </div>
    </section>
  );
}
