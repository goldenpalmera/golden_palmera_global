import type {
  HomeService,
  HomeApproach,
  HomeCaseStudy,
  HomeTestimonial,
  SanityHomeData,
} from "./types";

export function mapSanityHomeContent(
  data: SanityHomeData
) {
  const services: HomeService[] =
    data?.services?.map((item) => ({
      _id: item._id,
      number: item.number,
      title: item.title,
      shortDescription: item.shortDescription,
      slug: item.slug,
    })) ?? [];

  const approach: HomeApproach[] =
    data?.approach?.map((item) => ({
      _id: item._id,
      number: item.number,
      title: item.title,
      shortDescription: item.shortDescription,
      slug: item.slug,
    })) ?? [];

  const caseStudies: HomeCaseStudy[] =
    data?.caseStudies?.map((item) => ({
      id: item._id,
      title: item.title,
      country: item.country ?? "",
      volume: item.volume ?? "",
      product: item.product ?? "",
      summary: item.summary ?? "",
    })) ?? [];

  const testimonials: HomeTestimonial[] =
    data?.testimonials?.map((item) => ({
      id: item._id,
      quote: item.quote,
      companyType: item.companyType,
      country: item.country,
      isNamed: item.isNamed,
      name: item.name,
      title: item.title,
    })) ?? [];

  return {
    services,
    approach,
    caseStudies,
    testimonials,
  };
}
