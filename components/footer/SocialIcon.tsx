import type { FooterSocial } from "@/content/footer/types";

export function SocialIcon({
  platform,
}: {
  platform: FooterSocial["platform"];
}) {
  const commonProps = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (platform) {
    case "linkedin":
      return (
        <svg {...commonProps}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );

    case "facebook":
      return (
        <svg {...commonProps}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
        </svg>
      );

    case "instagram":
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r=".75"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );

    case "x":
      return (
        <svg {...commonProps}>
          <path d="M4 4l16 16M20 4 4 20" />
        </svg>
      );

    case "youtube":
      return (
        <svg {...commonProps}>
          <path d="M22.5 12s0-4-1-5-4-1-9.5-1-8.5 0-9.5 1-1 5-1 5 0 4 1 5 4 1 9.5 1 8.5 0 9.5-1 1-5 1-5Z" />
          <path d="m10 9 5 3-5 3V9Z" />
        </svg>
      );

    default:
      return null;
  }
}