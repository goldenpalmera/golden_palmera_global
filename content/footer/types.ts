export type FooterLink = {
  _key?: string;
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  _key?: string;
  heading: string;
  links: FooterLink[];
};

export type FooterSocial = {
  _key?: string;
  platform:
    | "linkedin"
    | "facebook"
    | "instagram"
    | "x"
    | "youtube";
  url: string;
  label?: string;
};

type FooterLocation = {
  country?: string;
  region?: string;
};

export type FooterData = {
  description?: string;
  companyName?: string;
  companyTagline?: string;
  email?: string;
  location?: FooterLocation;
  cacNumber?: string;
  copyrightYear?: number;
  socialLinks?: FooterSocial[];
  columns?: FooterColumn[];
  legalLinks?: FooterLink[];
  trustBadges?: string[];
  bottomMessage?: string;
};

export type FooterResponse = {
  companyName?: string;
  companyTagline?: string;
  footerDescription?: string;
  email?: string;
  location?: FooterLocation;
  cacNumber?: string;
  copyrightYear?: number;
  footerColumns?: Array<FooterColumn>;
  socialLinks?: FooterSocial[];
  trustBadges?: string[];
  bottomMessage?: string;
};
