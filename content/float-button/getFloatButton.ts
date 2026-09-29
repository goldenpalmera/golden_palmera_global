import { FLOAT_BUTTONS_QUERY } from "@/sanity/lib/queries";
import { getSanityClient } from "@/sanity/lib/client";                                             
import { FloatingButtonsData } from "@/content/float-button/types";

export async function getFloatButtons(): Promise<FloatingButtonsData> {
  const client = getSanityClient();

  return await client.fetch<FloatingButtonsData>(
    FLOAT_BUTTONS_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["floating-buttons"],
      },
    }
  );
}