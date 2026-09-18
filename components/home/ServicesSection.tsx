import Link from "next/link";
import type { HomeService } from "@/content/home/types";

type ServicesSectionProps = {
  services: HomeService[];
};

export function ServicesSection({
  services,
}: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="services section"
    >
      <div className="section-label">
        03 — WHAT WE DO
      </div>

      <div className="services-header">
        <h2>
          One supply chain.
          <br />
          <span>Many possibilities.</span>
        </h2>

        <p>
          From the first point of sourcing to the
          final international destination, we focus
          on creating efficient, transparent and
          dependable trade relationships.
        </p>
      </div>

      <div className="service-list">
        {services.map((service) => (
          <Link
            href={service.href}
            className="service-row"
            key={service.id}
          >
            <span className="service-number">
              {service.number}
            </span>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

            <span className="service-arrow">
              ↗
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
