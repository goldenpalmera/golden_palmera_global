import { ComplianceHero } from "@/components/compliance/ComplianceHero";
import { CertificationGrid } from "@/components/compliance/CertificationGrid";
import { EudrSection } from "@/components/compliance/EudrSection";
import { ComplianceDossierCta } from "@/components/compliance/ComplianceDossierCta";
import { ComplianceCommitment } from "@/components/compliance/ComplianceCommitment";
import { QualitySection } from "@/components/quality/QualitySection";
import { normalizeCompliancePage } from "@/content/compliance/normalizeCompliancePage";
import {
  type CompliancePageData,
} from "@/content/compliance/types";

type Props = {
  page: CompliancePageData;
};

export function CompliancePageView({ page }: Props) {
  const data = normalizeCompliancePage(page);

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">
      <ComplianceHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        description={data.hero.description}
      />

      <CertificationGrid
        certifications={data.certifications.items}
        eyebrow={data.certifications.eyebrow}
        title={data.certifications.title}
      />

      <QualitySection
        eyebrow={data.quality.eyebrow}
        title={data.quality.title}
        description={data.quality.description}
        tests={data.quality.tests}
        partners={data.quality.partners}
        documents={data.quality.documents}
        sampleDocumentUrl={data.quality.sampleDocumentUrl}
        sampleDocumentLabel={data.quality.sampleDocumentLabel}
      />

      <EudrSection
        eyebrow={data.eudr.eyebrow}
        title={data.eudr.title}
        description={data.eudr.description}
        stats={data.eudr.stats}
        roadmapTitle={data.eudr.roadmapTitle}
        milestones={data.eudr.milestones}
      />

      <ComplianceDossierCta
        title={data.dossier.title}
        description={data.dossier.description}
        downloadLabel={data.dossier.downloadLabel}
        downloadUrl={data.dossier.downloadUrl}
        contactLabel={data.dossier.contactLabel}
      />

      <ComplianceCommitment
        eyebrow={data.commitment.eyebrow}
        title={data.commitment.title}
        text={data.commitment.text}
      />
    </main>
  );
}
