import Link from "next/link";
import { FooterLink } from "@/content/footer/types";

export function FooterLinkItem({ link }: { link: FooterLink }) {
  const external = link.external ?? isExternalUrl(link.href);

  const className =
    "text-[12px] text-ivory-100/55 hover:text-gold-500 " +
    "focus-visible:text-gold-500 focus-visible:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-gold-500/60 " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 " +
    "transition-colors inline-flex items-center rounded-sm leading-5";

  if (external) {
    return (
      <a
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={className}
      >
        {link.label}
        {link.href.startsWith("http") && (
          <>
            <ExternalIndicator />
            <span className="sr-only"> (opens in a new tab)</span>
          </>
        )}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

function isExternalUrl(href: string) {
  return /^(https?:\/\/|mailto:|tel:)/i.test(href);
}

function ExternalIndicator() {
  return (
    <span aria-hidden="true" className="ml-1">
      ↗
    </span>
  );
}