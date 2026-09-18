import { 
    CompliancePageData,
    CompliancePageViewData
} from "./types";

export function normalizeCompliancePage(
  page: CompliancePageData,
): CompliancePageViewData {
  return {
    hero: {
      eyebrow: page.hero?.eyebrow ?? "Compliance & Quality",
      title:
        page.hero?.title ??
        "Quality, compliance, and responsible trade.",
      description:
        page.hero?.description ??
        "Our approach to quality assurance, certification, traceability, and responsible agricultural trade.",
    },

    certifications: {
      eyebrow:
        page.certificationsSection?.eyebrow ??
        "Certifications",
      title:
        page.certificationsSection?.title ??
        "Standards we work to.",
      items: page.certifications ?? [],
    },

    quality: {
      eyebrow:
        page.qualitySection?.eyebrow ??
        "Quality Assurance",
      title:
        page.qualitySection?.title ??
        "Quality at every stage.",
      description:
        page.qualitySection?.description ??
        "",
      tests: page.qualitySection?.tests ?? [],
      partners: page.qualitySection?.partners ?? [],
      documents: page.qualitySection?.documents ?? [],
      sampleDocumentUrl:
        page.qualitySection?.sampleDocumentUrl,
      sampleDocumentLabel:
        page.qualitySection?.sampleDocumentLabel ??
        "View sample document",
    },

    eudr: {
      eyebrow:
        page.eudrSection?.eyebrow ??
        "EUDR Readiness",
      title:
        page.eudrSection?.title ??
        "Traceability and responsible sourcing.",
      description:
        page.eudrSection?.description ??
        "",
      stats: page.eudrSection?.stats ?? [],
      roadmapTitle:
        page.eudrSection?.roadmapTitle ??
        "Our roadmap",
      milestones: page.milestones ?? [],
    },

    dossier: {
      title:
        page.dossierSection?.title ??
        "Request our compliance dossier.",
      description:
        page.dossierSection?.description ??
        "Contact our team for detailed documentation on our quality, compliance, sourcing, and traceability practices.",
      downloadLabel:
        page.dossierSection?.downloadLabel ??
        "Download dossier",
      downloadUrl:
        page.dossierSection?.downloadFile?.asset?.url,
      contactLabel:
        page.dossierSection?.contactLabel ??
        "Contact our team",
    },

    commitment: {
      eyebrow:
        page.commitment?.eyebrow ??
        "Our Commitment",
      title:
        page.commitment?.title ??
        "Building trust through responsible trade.",
      text:
        page.commitment?.text ??
        "",
    },
  };
}
