import {
  FooterData,
  FooterResponse,
} from "@/content/footer/types";

export function mapFooter(
  data: FooterResponse | null | undefined
): FooterData {
  return {
    companyName: data?.companyName,
    companyTagline: data?.companyTagline,

    description: data?.footerDescription,

    email: data?.email,

    location: data?.location
      ? {
          country: data.location.country,
          region: data.location.region,
        }
      : undefined,

    cacNumber: data?.cacNumber,
    copyrightYear: data?.copyrightYear,

    columns:
      data?.footerColumns?.map((column) => ({
        _key: column._key,
        heading: column.heading,
        links:
          column.links?.map((link) => ({
            _key: link._key,
            label: link.label,
            href: link.href,
            external: link.external,
          })) ?? [],
      })) ?? [],

    socialLinks:
      data?.socialLinks?.map((social) => ({
        _key: social._key,
        platform: social.platform,
        url: social.url,
        label: social.label,
      })) ?? [],

    trustBadges: data?.trustBadges ?? [],

    bottomMessage: data?.bottomMessage,
  };
}
