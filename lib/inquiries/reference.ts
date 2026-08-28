import crypto from "crypto";

export function generateInquiryReference() {
  const year = new Date().getFullYear();

  const random = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();

  return `GPG-${year}-${random}`;
}
