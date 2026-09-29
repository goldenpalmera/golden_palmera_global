"use client";

import Image from "next/image";
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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-[68vh] overflow-hidden bg-[#171717] text-white">
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed z-0 h-[450px] w-[450px] rounded-full bg-[#b7924a]/10 blur-[120px] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouse.x - 225}px, ${
            mouse.y - 225
          }px, 0)`,
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.07]">
        <div className="absolute left-[20%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[80%] top-0 h-full w-px bg-white" />
      </div>

      {/* Diagonal image */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          z-[1]
          hidden
          w-[58%]
          lg:block
        "
        style={{
          clipPath:
            "polygon(42% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <Image
          src="/images/agriculture/contact.jpg"
          alt=""
          fill
          priority
          sizes="58vw"
          className="object-cover"
        />

        {/* Dark treatment */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Blend image into dark hero */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#171717] via-[#171717]/45 to-transparent" />

        {/* Subtle brand colour */}
        <div className="absolute inset-0 bg-[#173f2b]/20 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-[1400px] flex-col justify-between px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        {/* Top navigation */}
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.3em] text-white/45">
            Golden Palmera Global
          </span>

          <span className="font-mono text-xs text-[#b7924a]">
            CONTACT / 01
          </span>
        </div>

        {/* Heading */}
        <div className="max-w-5xl pb-6 lg:max-w-[62%]">
          <p className="mb-7 text-xs uppercase tracking-[0.35em] text-[#b7924a]">
            Start a conversation
          </p>

          <h1 className="text-[clamp(4rem,10vw,9.5rem)] font-medium leading-[0.84] tracking-[-0.07em]">
            Let&apos;s
            <br />
            <span className="text-white/35">connect.</span>
          </h1>
        </div>
      </div>

      {/* Mobile image */}
      <div className="relative z-10 mx-6 mb-8 aspect-[16/9] overflow-hidden rounded-3xl md:mx-10 lg:hidden">
        <Image
          src="/images/agriculture/contact.jpg"
          alt="Golden Palmera Global"
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/50 to-transparent" />
      </div>
    </section>
  );
}