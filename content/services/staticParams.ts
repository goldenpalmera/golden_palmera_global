import { getServices } from "./sanity";

export async function getServiceStaticParams() {
  const services = await getServices();

  return services.map((service) => ({
    slug: service.slug,
  }));
}
