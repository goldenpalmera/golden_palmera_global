import { getApproaches } from "./sanity";

export async function getApproachStaticParams() {
  const approaches = await getApproaches();

  return approaches
    .filter((approach) => approach.slug)
    .map((approach) => ({
      slug: approach.slug,
    }));
}
