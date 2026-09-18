import ServiceCard from "@/components/services/ServicesCard";

import type { Service } from "@/content/services/types";

type Props = {
  services: Service[];
};

export function ServicesList({ services }: Props) {
  return (
    <section className="px-6 pb-24 md:px-10 lg:px-16 lg:pb-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-end justify-between border-b border-black/10 pb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40">
            Our capabilities
          </p>

          <span className="font-mono text-xs text-black/30">
            {String(services.length).padStart(2, "0")} SERVICES
          </span>
        </div>

        {services.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                number={service.number}
                category={service.category}
                title={service.title}
                description={service.shortDescription ?? ""}
                items={service.items ?? []}
                slug={service.slug}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#173f2b]/10 bg-white px-8 py-16 text-center">
            <p className="text-lg font-semibold text-[#173f2b]">
              Our services are being prepared.
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
              Details about our services will be updated shortly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
