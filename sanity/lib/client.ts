import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

function getToken() {
  const token = process.env.SANITY_API_TOKEN;

  if (!token) {
    throw new Error(
      "Missing SANITY_API_TOKEN environment variable."
    );
  }

  return token;
}

const sanityToken = getToken()

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: sanityToken,
})
