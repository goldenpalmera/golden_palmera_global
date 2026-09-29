import { FloatingButtonsData } from "@/content/float-button/types";

export const FALLBACK_FLOATING_BUTTONS: FloatingButtonsData = {
  enabled: true,

  whatsapp: {
    enabled: true,
    number: "2348012345678",
    message:
      "Hello, I'd like to enquire about your commodity export services.",
    label: "WhatsApp Trade Desk",
  },

  phoneCall: {
    enabled: true,
    calendlyUrl: "https://calendly.com/your-demo-account/30min",
    label: "Book a Phone Call",
    title: "Book a Trade Consultation",
    description:
      "Schedule a phone call with our trade desk.",
    fallbackLabel:
      "Open booking page in a new tab →",
  },

  toggleLabel: "Contact options",
  closeLabel: "Close contact options",
};
