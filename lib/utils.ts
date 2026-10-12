import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

export const WHATSAPP_NUMBER  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER  ?? "2348000000000";
export const CALENDLY_URL     = process.env.NEXT_PUBLIC_CALENDLY_URL     ?? "https://calendly.com/goldenpalmera";
export const SITE_URL         = process.env.NEXT_PUBLIC_SITE_URL         ?? "https://goldenpalmera.com";

export function whatsappLink(message?: string): string {
  const encoded = encodeURIComponent(message ?? "Hello, I'd like to enquire about your commodity export services.");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
