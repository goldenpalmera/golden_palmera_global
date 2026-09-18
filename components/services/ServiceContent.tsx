import { PortableText } from "@portabletext/react";

import type { ServicePageData } from "@/content/services/types";

type Props = {
  service: ServicePageData;
};

export function ServiceContent({ service }: Props) {
  return (
    <section className="px-6 py-24 md:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[0.3fr_0.7fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
            Our approach
          </p>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:leading-8">
          {service.description?.length ? (
            <PortableText value={service.description} />
          ) : (
            <p className="text-lg text-black/50">
              More information about this service will be available shortly.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
