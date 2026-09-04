import { getSanityClient } from "./client";

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  const client = getSanityClient();
  return client.fetch<T>(query, params);
}