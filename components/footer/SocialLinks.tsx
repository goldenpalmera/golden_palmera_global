import { SocialIcon } from "./SocialIcon";
import { FooterSocial } from "@/content/footer/types";

export function SocialLinks({
  links,
}: {
  links?: FooterSocial[];
}) {
  if (!links || !links.length) {
    return null;
  }

  return (
    <nav aria-label="Social media">
      <ul className="flex flex-wrap gap-2">
        {links.map((social, index) => (
          <li key={social._key ?? `${social.platform}-${index}`}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label ?? social.platform}
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-forest-700
                text-ivory-100/45
                transition-colors
                hover:border-gold-500/50
                hover:bg-forest-900
                hover:text-gold-500
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-gold-500
                focus-visible:ring-offset-2
                focus-visible:ring-offset-forest-950
              "
            >
              <SocialIcon platform={social.platform} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}