import { getCompliancePage } from "./sanity";
import { COMPLIANCE_FALLBACKS } from "./fallbacks";

export async function getComplianceData() {
  const page = await getCompliancePage();

  if (!page) {
    return {
      ...COMPLIANCE_FALLBACKS,

      quality: COMPLIANCE_FALLBACKS.qualitySection,

      dossier: {
        title: COMPLIANCE_FALLBACKS.dossierSection?.title,
        description: COMPLIANCE_FALLBACKS.dossierSection?.description,
        downloadLabel:
          COMPLIANCE_FALLBACKS.dossierSection?.downloadLabel,
        downloadUrl:
          COMPLIANCE_FALLBACKS.dossierSection?.downloadFile?.asset?.url,
        contactLabel:
          COMPLIANCE_FALLBACKS.dossierSection?.contactLabel,
      },
    };
  }

  return {
    ...COMPLIANCE_FALLBACKS,
    ...page,

    hero: {
      ...COMPLIANCE_FALLBACKS.hero,
      ...page.hero,
    },

    certificationsSection: {
      ...COMPLIANCE_FALLBACKS.certificationsSection,
      ...page.certificationsSection,
    },

    certifications:
      page.certifications?.length
        ? page.certifications
        : COMPLIANCE_FALLBACKS.certifications,

    quality: {
      ...COMPLIANCE_FALLBACKS.qualitySection,
      ...page.qualitySection,

      tests:
        page.qualitySection?.tests?.length
          ? page.qualitySection.tests
          : COMPLIANCE_FALLBACKS.qualitySection?.tests ?? [],

      partners:
        page.qualitySection?.partners?.length
          ? page.qualitySection.partners
          : COMPLIANCE_FALLBACKS.qualitySection?.partners ?? [],

      documents:
        page.qualitySection?.documents?.length
          ? page.qualitySection.documents
          : COMPLIANCE_FALLBACKS.qualitySection?.documents ?? [],
    },

    eudrSection: {
      ...COMPLIANCE_FALLBACKS.eudrSection,
      ...page.eudrSection,

      stats:
        page.eudrSection?.stats?.length
          ? page.eudrSection.stats
          : COMPLIANCE_FALLBACKS.eudrSection?.stats ?? [],
    },

    milestones:
      page.milestones?.length
        ? page.milestones
        : COMPLIANCE_FALLBACKS.milestones,

    dossierSection: {
      ...COMPLIANCE_FALLBACKS.dossierSection,
      ...page.dossierSection,
    },

    dossier: {
      title:
        page.dossierSection?.title ??
        COMPLIANCE_FALLBACKS.dossierSection?.title,

      description:
        page.dossierSection?.description ??
        COMPLIANCE_FALLBACKS.dossierSection?.description,

      downloadLabel:
        page.dossierSection?.downloadLabel ??
        COMPLIANCE_FALLBACKS.dossierSection?.downloadLabel,

      downloadUrl:
        page.dossierSection?.downloadFile?.asset?.url ??
        COMPLIANCE_FALLBACKS.dossierSection?.downloadFile?.asset?.url,

      contactLabel:
        page.dossierSection?.contactLabel ??
        COMPLIANCE_FALLBACKS.dossierSection?.contactLabel,
    },

    commitment: {
      ...COMPLIANCE_FALLBACKS.commitment,
      ...page.commitment,
    },
  };
}
