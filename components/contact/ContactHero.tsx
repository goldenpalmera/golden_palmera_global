
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ContactPageProps = {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  image?: string | null;
};

export default function ContactHero({
  eyebrow,
  titleLine1,
  titleLine2,
  image,
}: ContactPageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = glowCanvasRef.current;

    if (!section || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (reducedMotion.matches || coarsePointer.matches) return;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resizeCanvas = () => {
      const rect = section.getBoundingClientRect();

      width = rect.width;
      height = rect.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);

      context.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
      );
    };

    const clearGlow = () => {
      context.clearRect(0, 0, width, height);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      clearGlow();

      if (
        x < 0 ||
        y < 0 ||
        x > rect.width ||
        y > rect.height
      ) {
        return;
      }

      const radius = 225;
      const gradient = context.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        radius
      );

      gradient.addColorStop(0, "rgba(183, 146, 74, 0.10)");
      gradient.addColorStop(0.5, "rgba(183, 146, 74, 0.05)");
      gradient.addColorStop(1, "rgba(183, 146, 74, 0)");

      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    section.addEventListener("pointerleave", clearGlow);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", clearGlow);
      clearGlow();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[68vh] overflow-hidden bg-[#171717] text-white"
    >
      {/* Cursor glow — rendered on canvas to avoid inline styles */}
      <canvas
        ref={glowCanvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      {/* Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.07]">
        <div className="absolute left-[20%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[80%] top-0 h-full w-px bg-white" />
      </div>

      {/* Diagonal image */}
      {image && (
        <div
          className="
            contact-hero-image-clip
            pointer-events-none
            absolute inset-y-0 right-0 z-[1]
            hidden w-[58%] lg:block
          "
        >
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="58vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171717] via-[#171717]/45 to-transparent" />
          <div className="absolute inset-0 bg-[#173f2b]/20 mix-blend-multiply" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-[1400px] flex-col justify-between px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.3em] text-white/45">
            Golden Palmera Global
          </span>

          <span className="font-mono text-xs text-[#b7924a]">
            CONTACT / 01
          </span>
        </div>

        <div className="max-w-5xl pb-6 lg:max-w-[62%]">
          <p className="mb-7 text-xs uppercase tracking-[0.35em] text-[#b7924a]">
            {eyebrow}
          </p>

          <h1 className="text-[clamp(4rem,10vw,9.5rem)] font-medium leading-[0.84] tracking-[-0.07em]">
            {titleLine1}
            <br />
            <span className="text-white/35">{titleLine2}</span>
          </h1>
        </div>
      </div>

      {/* Mobile image */}
      {image && (
        <div className="relative z-10 mx-6 mb-8 aspect-[16/9] overflow-hidden rounded-3xl md:mx-10 lg:hidden">
          <Image
            src={image}
            alt="Golden Palmera Global"
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/50 to-transparent" />
        </div>
      )}
    </section>
  );
}
