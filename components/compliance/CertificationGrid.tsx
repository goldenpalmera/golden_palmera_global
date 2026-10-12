import Image from "next/image";
import { Download, ExternalLink } from "lucide-react";

import { SectionHeading } from "@/components/sharedComponents/index";
import { CERTIFICATION_STATUS } from "./compliance-config";

import type { Certification } from "@/content/compliance/types";

type CertificationGridProps = {
  certifications: Certification[];
  eyebrow?: string;
  title: string;
};

export function CertificationGrid({
  certifications,
  eyebrow,
  title,
}: CertificationGridProps) {
  return (
    <section className="bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          heading={title}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((certification) => {
            const status =
              CERTIFICATION_STATUS[certification.status];

            return (
              <article
                key={certification._id}
                className="rounded-xl border border-forest-800/10 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-500/30 hover:shadow-sm"
              >
                <div className="mb-4 flex h-10 items-center justify-center rounded-lg border border-forest-800/8 bg-ivory-100">
                  {certification.logo?.asset?.url ? (
                    <Image
                      src={certification.logo.asset.url}
                      alt={certification.name}
                      className="h-7 max-w-[100px] object-contain"
                    />
                  ) : (
                    <span className="font-mono text-[11px] font-medium tracking-wider text-forest-800/70">
                      {certification.shortName ??
                        certification.name}
                    </span>
                  )}
                </div>

                <h3 className="mb-2 text-[13px] font-medium leading-tight text-forest-800">
                  {certification.name}
                </h3>

                {certification.description && (
                  <p className="mb-4 text-[11px] leading-relaxed text-forest-800/55">
                    {certification.description}
                  </p>
                )}

                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${status?.color}`}
                  >
                    {status?.label}
                  </span>

                  <div className="flex items-center gap-3">
                    {certification.certificateFile?.asset?.url && (
                      <a
                        href={
                          certification.certificateFile.asset.url
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[10px] text-gold-500 transition-colors hover:text-gold-600"
                      >
                        <Download size={11} />
                        View
                      </a>
                    )}

                    {certification.verifyUrl && (
                      <a
                        href={certification.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[10px] text-gold-500 transition-colors hover:text-gold-600"
                      >
                        <ExternalLink size={11} />
                        Verify
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
