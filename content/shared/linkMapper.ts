import { SanityLink, PageLink } from "@/sanity/lib/types";

export function mapLink( link?: SanityLink ): PageLink {
  if (!link) {
    return {
      href: "/quote/request-quote",
      newTab: false,
    };
  }

  if (link.type === "external") {
    return {
      href: link.externalUrl ?? "/",
      newTab: link.newTab ?? false,
    };
  }

  return {
    href: link.internalPath ?? "/",
    newTab: link.newTab ?? false,
  };
}
