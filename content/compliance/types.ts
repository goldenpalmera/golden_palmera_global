import type { SeoData, SanityImage } from "@/sanity/lib/types";

export type CertificationStatus =
  | "Active"
  | "Pending"
  | "Expired"
  | "Suspended";

export type EudrMilestoneStatus =
  | "Completed"
  | "In Progress"
  | "Planned";

export type ComplianceArea = {
  number: string;
  title: string;
  text: string;
};

export type QualityTest = {
  _id: string;
  name: string;
};

export type InspectionPartner = {
  _id: string;
  name: string;
  role: string;
};

export type QualityDocument = {
  _id: string;
  name: string;
  description: string;
  fileUrl?: string;
};

export type QualitySectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;

  tests?: QualityTest[];
  partners?: InspectionPartner[];
  documents?: QualityDocument[];

  sampleDocumentUrl?: string;
  sampleDocumentLabel?: string;
};

export type EudrSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: SanityImage;
  stats?: EudrStat[];
  roadmapTitle?: string;
  milestones: EudrMilestone[];
};

export type Certification = {
  _id: string;
  name: string;
  shortName?: string;
  description?: string;
  status: CertificationStatus;
  logo?: {
    asset?: {
      url?: string;
    };
  };
  certificateFile?: {
    asset?: {
      url?: string;
    };
  };
  verifyUrl?: string;
};

export type EudrMilestone = {
  _id: string;
  year: string;
  quarter?: "Q1" | "Q2" | "Q3" | "Q4";
  title: string;
  description?: string;
  status: EudrMilestoneStatus;
};

export type EudrStat = {
  _key: string;
  value: string;
  label: string;
};

export type CompliancePageData = {
  _id: string;
  title?: string;

  hero?: {
    eyebrow?: string;
    title?: string;
    description?: string;
  };

  certificationsSection?: {
    eyebrow?: string;
    title?: string;
  };

  certifications?: Certification[];

  qualitySection?: QualitySectionProps;

  eudrSection?: {
    eyebrow?: string;
    title?: string;
    description?: string;

    stats?: EudrStat[];

    roadmapTitle?: string;
  };

  milestones?: EudrMilestone[];

  dossierSection?: {
    title?: string;
    description?: string;
    downloadLabel?: string;

    downloadFile?: {
      asset?: {
        url?: string;
      };
    };

    contactLabel?: string;
  };

  commitment?: {
    eyebrow?: string;
    title?: string;
    text?: string;
  };

  seo?: SeoData;
};


export type CompliancePageViewData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };

  certifications: {
    eyebrow: string;
    title: string;
    items: Certification[];
  };

  quality: {
    eyebrow: string;
    title: string;
    description: string;
    tests: QualityTest[];
    partners: InspectionPartner[];
    documents: QualityDocument[];
    sampleDocumentUrl?: string;
    sampleDocumentLabel: string;
  };

  eudr: {
    eyebrow: string;
    title: string;
    description: string;
    stats: EudrStat[];
    roadmapTitle: string;
    milestones: EudrMilestone[];
  };

  dossier: {
    title: string;
    description: string;
    downloadLabel: string;
    downloadUrl?: string;
    contactLabel: string;
  };

  commitment: {
    eyebrow: string;
    title: string;
    text: string;
  };
};
