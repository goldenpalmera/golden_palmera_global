import Link from "next/link";
import { SocialLinks } from "../footer/SocialLinks";
import { FooterColumn } from "../footer/FooterColumn";
import { TrustBadges } from "../footer/TrustBadges";
import { FooterData } from "@/content/footer/types";

type FooterProps = {
  settings?: FooterData | null;
};

export function Footer({ settings }: FooterProps) {
  const companyName = settings?.companyName;
  const description = settings?.description;
  const email = settings?.email;
  const location = settings?.location;
  const bottomMessage = settings?.bottomMessage;
  const columns = settings?.columns?.filter((column) =>
    column.heading?.trim() &&
    column.links?.length > 0
  );
  const socialLinks = settings?.socialLinks?.filter((social) => 
    social.url?.trim()
  );
  const trustBadges = settings?.trustBadges?.filter(Boolean);
  const copyrightYear = settings?.copyrightYear
  const cacReg = settings?.cacNumber 

  return (
    <footer
      className="border-t border-gold-500/10 bg-forest-950"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        {companyName} footer
      </h2>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-6 lg:gap-y-0">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              aria-label={`${companyName} home`}
              className="
                inline-block
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-gold-500/60
                focus-visible:ring-offset-2
                focus-visible:ring-offset-forest-950
              "
            >
              <div className="footer-brand">
                <span className="brand-mark">
                  GP
                </span>

                <div>
                  <strong>GOLDEN PALMERA</strong>
                  <small>GLOBAL</small>
                </div>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-[12px] leading-relaxed text-ivory-100/50">
              {description}
            </p>

            {/* Contact / registration information */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] tracking-wide text-ivory-100/30">
              {cacReg && (
                <span>
                  CAC Reg. {cacReg}
                </span>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="
                    transition-colors
                    hover:text-gold-500
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-gold-500
                  "
                >
                  Email: {email}
                </a>
              )}

            </div>

            {/* Location + social */}
            <div className="mt-6 flex flex-col items-start gap-5">
              <SocialLinks links={socialLinks} />

              {location && (
                <div className="text-[10px] leading-relaxed tracking-[0.08em] text-ivory-100/30">
                  {location.country && <p>{location.country}</p>}
                  {location.region && <p>{location.region}</p>}
                </div>
              )}

            </div>
          </div>

          {/* Sanity-controlled columns */}
          {columns?.map((column, index) => (
            <FooterColumn
              key={column._key ?? `${column.heading}-${index}`}
              column={column}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Back to top */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end pb-5">
          <a
            href="#top"
            className="
              z-[110]
              inline-flex items-center
              rounded-sm
              text-[10px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-gold-500/60
              transition-colors
              hover:text-gold-500
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-gold-500
              focus-visible:ring-offset-2
              focus-visible:ring-offset-forest-950
            "
          >
            Back to top
            <span className="ml-1 text-[12px]" aria-hidden="true">
              ↑
            </span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] tracking-wide text-ivory-100/30">
            <span>
              © {copyrightYear} {companyName}
              <span
                className="mx-2 text-ivory-100/50"
                aria-hidden="true"
              >
                •
              </span>
              All rights reserved
            </span>

            {cacReg && (
              <span>
                CAC Reg. {cacReg}
              </span>
            )}

            <TrustBadges badges={trustBadges} />
          </div>

          {bottomMessage && (
            <p className="max-w-sm text-center text-[10px] italic text-gold-500/50 lg:text-right">
              {bottomMessage}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
