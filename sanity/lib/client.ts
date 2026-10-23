import "server-only";

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

let client: ReturnType<typeof createClient> | null = null;

function getToken() {
  const token = process.env.SANITY_API_TOKEN;

  if (!token) {
    throw new Error(
      "Missing SANITY_API_TOKEN environment variable."
    );
  }

  return token;
}

export function getSanityClient() { 
  if (!client) {
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
      token: getToken(),
    });
  }
  return client;
}
