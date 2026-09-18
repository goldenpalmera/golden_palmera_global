import type { PortableTextBlock } from "@portabletext/types";

export function formatDate(date?: string): string {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

export function calculateReadingTime(
  body?: PortableTextBlock[],
): number {
  if (!body?.length) {
    return 1;
  }

  const text = body
    .map((block) => {
      if (block?._type !== "block") {
        return "";
      }

      return (
        block.children
          ?.map((child) => child.text ?? "")
          .join(" ") ?? ""
      );
    })
    .join(" ");

  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}