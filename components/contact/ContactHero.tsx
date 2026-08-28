"use client";

import { useEffect, useState } from "react";

export default function ContactHero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[68vh] overflow-hidden bg-[#171717] text-white">
      <div
        className="pointer-events-none fixed z-0 h-[450px] w-[450px] rounded-full bg-[#b7924a]/10 blur-[120px] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouse.x - 225}px, ${
            mouse.y - 225
          }px, 0)`,
        }}
      />

      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute left-[20%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[80%] top-0 h-full w-px bg-white" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-[1400px] flex-col justify-between px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.3em] text-white/45">
            Golden Palmera Global
          </span>

          <span className="font-mono text-xs text-[#b7924a]">
            CONTACT / 01
          </span>
        </div>

        <div className="pb-6">
          <p className="mb-7 text-xs uppercase tracking-[0.35em] text-[#b7924a]">
            Start a conversation
          </p>

          <h1 className="max-w-6xl text-[clamp(4rem,10vw,9.5rem)] font-medium leading-[0.84] tracking-[-0.07em]">
            Let&apos;s
            <br />
            <span className="text-white/35">connect.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}