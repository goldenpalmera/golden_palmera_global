"use client";

import { useEffect, useState } from "react";

export default function ServicesHero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-[#171717] text-white">
      {/* Ambient mouse light */}
      <div
        className="pointer-events-none fixed z-0 h-[500px] w-[500px] rounded-full bg-[#b7924a]/10 blur-[120px] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouse.x - 250}px, ${
            mouse.y - 250
          }px, 0)`,
        }}
      />

      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute left-[16%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[84%] top-0 h-full w-px bg-white" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-[1400px] flex-col justify-between px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.3em] text-white/45">
            Golden Palmera Global
          </span>

          <span className="font-mono text-xs text-[#b7924a]">
            SERVICES / 01
          </span>
        </div>

        <div className="max-w-6xl pb-8">
          <p className="mb-7 text-xs uppercase tracking-[0.35em] text-[#b7924a]">
            From source to global market
          </p>

          <h1 className="max-w-5xl text-[clamp(4rem,10vw,9.5rem)] font-medium leading-[0.84] tracking-[-0.07em]">
            Moving
            <br />
            <span className="text-white/35">agriculture</span>
            <br />
            forward.
          </h1>

          <div className="mt-10 flex max-w-2xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-base leading-7 text-white/55 md:text-lg">
              We connect agricultural producers, processors and international
              markets through reliable sourcing, value addition, quality
              management and export services.
            </p>

            <div className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-white/35">
              Scroll to explore
              <span className="ml-3 text-[#b7924a]">↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}