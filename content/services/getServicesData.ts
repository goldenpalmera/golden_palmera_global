import { getServices } from "./sanity";
import { FALLBACK_SERVICES, FALLBACK_SERVICE_IMAGES } from "./fallbacks";
import type { Service } from "./types";

export async function getServicesData(): Promise<Service[]> {
  const services = await getServices();

  if (!services?.length) {
    return FALLBACK_SERVICES;
  }

  return services.map((service) => ({
    ...service,
    image:
      service.coverImage ??
      FALLBACK_SERVICE_IMAGES[service.slug] ??
      undefined,
  }));
}
