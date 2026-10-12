import type {
  CertificationStatus,
  EudrMilestoneStatus,
} from "@/content/compliance/types";

export const CERTIFICATION_STATUS = {
  Active: {
    label: "Active",
    color: "bg-emerald-100 text-emerald-700",
  },

  Pending: {
    label: "Pending",
    color: "bg-amber-100 text-amber-700",
  },

  Expired: {
    label: "Expired",
    color: "bg-red-100 text-red-700",
  },

  Suspended: {
    label: "Suspended",
    color: "bg-red-100 text-red-700",
  },
} satisfies Record<
  CertificationStatus,
  {
    label: string;
    color: string;
  }
>;

export const EUDR_STATUS = {
  Completed: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-400/10 text-emerald-300",
  },

  "In Progress": {
    dot: "bg-gold-500",
    badge: "bg-gold-500/10 text-gold-400",
  },

  Planned: {
    dot: "bg-white/30",
    badge: "bg-white/10 text-white/50",
  },
} satisfies Record<
  EudrMilestoneStatus,
  {
    dot: string;
    badge: string;
  }
>;
