import { FooterLinkItem } from "./FooterLinkItem";
import type { FooterColumn } from "@/content/footer/types";

export function FooterColumn({
  column,
  index,
}: {
  column: FooterColumn;
  index: number;
}) {
  const headingId = `footer-column-${index}`;

  return (
    <nav aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="
          mb-4
          text-[9px]
          font-medium
          uppercase
          tracking-[0.12em]
          text-ivory-100/40
        "
      >
        {column.heading}
      </h2>

      <ul className="space-y-2">
        {column.links.map((link, linkIndex) => (
          <li key={link._key ?? `${link.href}-${linkIndex}`}>
            <FooterLinkItem link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}