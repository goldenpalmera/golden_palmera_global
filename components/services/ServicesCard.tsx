"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

type ServiceCardProps = {
  number: string;
  category?: string;
  title?: string;
  description?: string;
  items?: string[];
  slug: string;
  image?: string;
};

export default function ServiceCard({
  number,
  category,
  title,
  description,
  items = [],
  slug,
  image,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const hasContent =
    Boolean(description?.trim()) || items.length > 0;

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -3;
    const rotateY = (x / rect.width - 0.5) * 3;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-4px)
    `;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <Link href={`/services/${slug}`} className="block h-full">
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative min-h-[520px] overflow-hidden border border-black/10 bg-[#f5f1e8] transition-transform duration-300 ease-out"
      >
        {/* Image */}
        {image ? (
          <div className="relative h-56 overflow-hidden bg-[#173f2b]">
            <Image
              src={image}
              alt={title || "Service"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#173f2b]/70 via-[#173f2b]/10 to-transparent" />

            {/* Number */}
            <span className="absolute left-7 top-6 font-mono text-xs tracking-[0.25em] text-white/80 md:left-9">
              {number}
            </span>

            {/* Category */}
            {category && (
              <span className="absolute right-7 top-6 text-xs uppercase tracking-[0.2em] text-white/80 md:right-9">
                {category}
              </span>
            )}
          </div>
        ) : (
          /* Fallback when there is no image */
          <div className="relative h-56 bg-[#173f2b]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#b7924a_0%,transparent_35%),linear-gradient(135deg,#173f2b,#102b1e)]" />

            <span className="absolute left-7 top-6 font-mono text-xs tracking-[0.25em] text-white/70 md:left-9">
              {number}
            </span>

            {category && (
              <span className="absolute right-7 top-6 text-xs uppercase tracking-[0.2em] text-[#d2b477] md:right-9">
                {category}
              </span>
            )}
          </div>
        )}

        {/* Mouse glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#b7924a]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex min-h-[264px] flex-col p-7 md:p-9">
          <div className="mt-auto">
            {/* Title */}
            <h2 className="max-w-xl text-3xl font-medium leading-tight tracking-[-0.03em] text-[#171717] md:text-4xl">
              {title || "Service"}
            </h2>

            {hasContent ? (
              <>
                {description?.trim() && (
                  <p className="mt-5 max-w-xl text-sm leading-7 text-black/60 md:text-base">
                    {description}
                  </p>
                )}

                {items.length > 0 && (
                  <div className="mt-8 border-t border-black/10 pt-6">
                    <ul className="space-y-3">
                      {items.map((item, index) => (
                        <li
                          key={`${item}-${index}`}
                          className="flex items-center gap-3 text-sm text-black/65"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b7924a]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-8 border-t border-black/10 pt-6">
                <p className="text-base font-medium text-[#173f2b]">
                  Service details are being prepared.
                </p>

                <p className="mt-2 max-w-md text-sm leading-7 text-black/50">
                  More information about this service will be
                  available shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
