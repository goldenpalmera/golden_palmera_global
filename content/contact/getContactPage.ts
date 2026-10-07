import { getSanityClient } from "@/sanity/lib/client";
import {
  CONTACT_PAGE_QUERY,
} from "@/sanity/lib/queries/contact/queries";
import type { ContactPage } from "./types";

const SANITY_OPTIONS = {
  next: {
    revalidate: 60,
  },
};

export async function getContactPage(): Promise<ContactPage | null> {
  const client = getSanityClient();

  return client.fetch<ContactPage | null>(
    CONTACT_PAGE_QUERY,
    {},
    SANITY_OPTIONS,
  );
}