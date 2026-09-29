"use client";

import { useState } from "react";
import { Download, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

type ComplianceDossierCtaProps = {
  title?: string;
  description?: string;
  downloadLabel?: string;
  contactLabel?: string;
  downloadUrl?: string;
  contactUrl?: string;
  whatsappUrl?: string;
  emailUrl?: string;
};

export function ComplianceDossierCta({
  title,
  description,
  downloadLabel = "Download Dossier",
  contactLabel,
  downloadUrl,
  contactUrl = "/contact",
  whatsappUrl,
  emailUrl,
}: ComplianceDossierCtaProps) {
  const [showFallback, setShowFallback] = useState(false);

  const handleDownload = () => {
    if (!downloadUrl) {
      setShowFallback(true);
      return;
    }

    window.open(downloadUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="documents"
      className="border-t border-gold-500/10 bg-forest-800 py-16"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:px-8">
        <div className="max-w-2xl">
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

          {showFallback && (
            <div
              role="alert"
              className="mt-6 overflow-hidden rounded-xl border border-gold-400/40 bg-gradient-to-r from-gold-500/15 via-gold-500/10 to-transparent shadow-[0_0_30px_rgba(210,180,119,0.08)] animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <div className="flex gap-4 p-5 sm:p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold-500 text-forest-950">
                  <Download size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
                    Compliance Dossier
                  </p>

                  <h3 className="mt-1.5 text-base font-semibold text-ivory-100 sm:text-lg">
                    Our compliance dossier is currently being updated.
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-ivory-100/65">
                    The latest documentation is available directly from
                    our representatives. Please contact us for the specific
                    dossier or compliance documents you require.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-white transition-all hover:bg-[#20bd5a] hover:-translate-y-0.5"
                      >
                        <MessageCircle size={14} />
                        WhatsApp Representative
                      </a>
                    )}

                    {emailUrl && (
                      <a
                        href={emailUrl}
                        className="inline-flex items-center gap-2 rounded-md border border-ivory-100/25 bg-ivory-100/5 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ivory-100 transition-all hover:border-ivory-100/50 hover:bg-ivory-100/10"
                      >
                        <Mail size={14} />
                        Email Representative
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 rounded bg-gold-500 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.06em] text-forest-950 transition-colors hover:bg-gold-400"
          >
            <Download size={14} />
            {downloadLabel}
          </button>

          {contactLabel && (
            <Link
              href={contactUrl}
              className="inline-flex items-center justify-center gap-2 rounded border border-ivory-100/25 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.06em] text-ivory-100 transition-colors hover:border-ivory-100/50"
            >
              {contactLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
