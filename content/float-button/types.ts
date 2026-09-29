export type WhatsApp = {
  enabled?: boolean;
  number: string;
  message?: string;
  label?: string;
};

export type PhoneCall = {
  enabled?: boolean;
  calendlyUrl: string;
  label?: string;
  title?: string;
  description?: string;
  fallbackLabel?: string;
};

export type FloatingButtonsData = {
  enabled?: boolean;
  whatsapp: WhatsApp;
  phoneCall: PhoneCall;
  toggleLabel?: string;
  closeLabel?: string;
};
