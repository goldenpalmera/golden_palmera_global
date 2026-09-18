import { Download } from "lucide-react";
import Link from "next/link";

type ComplianceDossierCtaProps = {
  title?: string;
  description?: string;
  downloadLabel?: string;
  contactLabel?: string;
  downloadUrl?: string;
  contactUrl?: string;
};

export function ComplianceDossierCta({
  title,
  description,
  downloadLabel,
  contactLabel,
  downloadUrl,
  contactUrl = "/contact",
}: ComplianceDossierCtaProps) {
  return (
    <section
      id="documents"
      className="border-t border-gold-500/10 bg-forest-800 py-16"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:px-8">
        <div>
          {title && (
            <h2 className="mb-2 font-serif text-xl text-ivory-100 lg:text-2xl">
              {title}
            </h2>
          )}

          {description && (
            <p className="text-sm text-ivory-100/50">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
          {downloadUrl && downloadLabel && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded bg-gold-500 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.06em] text-forest-950 transition-colors hover:bg-gold-400"
            >
              <Download size={14} />
              {downloadLabel}
            </a>
          )}

          {contactLabel && (
            <Link
              href={contactUrl}
              className="inline-flex items-center gap-2 rounded border border-ivory-100/25 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.06em] text-ivory-100 transition-colors hover:border-ivory-100/50"
            >
              {contactLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
