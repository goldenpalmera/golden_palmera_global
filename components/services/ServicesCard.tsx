"use client";

import { useRef } from "react";

type ServiceCardProps = {
  number: string;
  category?: string;
  title?: string;
  description?: string;
  items?: string[];
};

export default function ServiceCard({
  number,
  category,
  title,
  description,
  items = [],
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const hasContent =
    Boolean(description?.trim()) || items.length > 0;

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
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
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative min-h-[360px] overflow-hidden border border-black/10 bg-[#f5f1e8] p-7 transition-transform duration-300 ease-out md:p-9"
    >
      {/* Mouse glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#b7924a]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        {/* Header */}
        <div className="mb-14 flex items-start justify-between">
          <span className="font-mono text-xs tracking-[0.25em] text-black/45">
            {number}
          </span>

          {category && (
            <span className="text-xs uppercase tracking-[0.2em] text-[#8c6d35]">
              {category}
            </span>
          )}
        </div>

        <div className="mt-auto">
          {/* Title */}
          {title ? (
            <h2 className="max-w-xl text-3xl font-medium leading-tight tracking-[-0.03em] text-[#171717] md:text-4xl">
              {title}
            </h2>
          ) : (
            <h2 className="max-w-xl text-3xl font-medium leading-tight tracking-[-0.03em] text-[#171717] md:text-4xl">
              Service
            </h2>
          )}

          {hasContent ? (
            <>
              {/* Description */}
              {description?.trim() && (
                <p className="mt-5 max-w-xl text-sm leading-7 text-black/60 md:text-base">
                  {description}
                </p>
              )}

              {/* Items */}
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
            /* Empty state */
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
  );
}