import {
  Download,
  FileText,
  FlaskConical,
  Shield,
} from "lucide-react";

import { SectionHeading } from "@/components/sharedComponents/index";

import type {
  QualitySectionProps,
} from "@/content/compliance/types";

export function QualitySection({
  eyebrow,
  title,
  description,
  tests,
  partners,
  documents,
  sampleDocumentLabel,
  sampleDocumentUrl,
}: QualitySectionProps) {

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow ?? "Quality Assurance"}
          heading={title ?? "Every Shipment. Independently Verified."}
          subheading={description ?? "Third-party inspection on every lot. No exceptions, no shortcuts."}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-forest-800/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-forest-800 rounded-lg flex items-center justify-center">
                <FlaskConical
                  size={16}
                  className="text-gold-500"
                />
              </div>

              <h3 className="font-medium text-forest-800 text-sm">
                Lab Testing
              </h3>
            </div>

            <ul className="space-y-2.5">
              {tests?.map((test) => (
                <li
                  key={test._id}
                  className="flex items-center gap-2 text-[12px] text-forest-800/65"
                >
                  <span className="w-1 h-1 rounded-full bg-gold-500 flex-shrink-0" />
                  {test.name}
                </li>
              ))}
            </ul>

            <p className="text-[10px] text-forest-800/40 italic mt-4">
              Per-commodity testing matrix available
              on request.
            </p>
          </div>

          <div className="border border-forest-800/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-forest-800 rounded-lg flex items-center justify-center">
                <Shield
                  size={16}
                  className="text-gold-500"
                />
              </div>

              <h3 className="font-medium text-forest-800 text-sm">
                Inspection Partners
              </h3>
            </div>

            <div className="space-y-5">
              {partners?.map((partner) => (
                <div
                  key={partner._id}
                  className="flex gap-3"
                >
                  <div className="w-10 h-7 bg-forest-800/8 border border-forest-800/10 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-mono font-medium text-forest-800/70">
                      {partner.name
                        .slice(0, 3)
                        .toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <div className="text-[12px] font-medium text-forest-800">
                      {partner.name}
                    </div>

                    <div className="text-[11px] text-forest-800/55 leading-relaxed">
                      {partner.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-forest-800/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-forest-800 rounded-lg flex items-center justify-center">
                <FileText
                  size={16}
                  className="text-gold-500"
                />
              </div>

              <h3 className="font-medium text-forest-800 text-sm">
                Documentation Package
              </h3>
            </div>

            <ul className="space-y-3">
              {documents?.map((document) => (
                <li
                  key={document._id}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-forest-800 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText
                      size={12}
                      className="text-gold-500"
                    />
                  </div>

                  <div>
                    <div className="text-[12px] font-medium text-forest-800">
                      {document.name}
                    </div>

                    <div className="text-[10px] text-forest-800/50">
                      {document.description}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {sampleDocumentUrl && (
              <a
                href={sampleDocumentUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-[11px] text-gold-500 hover:text-gold-600 transition-colors"
              >
                <Download size={12} />
                {sampleDocumentLabel ?? "Download sample doc set" }
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
