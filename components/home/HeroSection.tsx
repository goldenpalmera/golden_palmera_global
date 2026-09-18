"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CircleCheck,
  MessageCircle,
} from "lucide-react";

import type { HomeHeroContent } from "@/content/home/types";
import { whatsappLink } from "@/lib/utils";

type HeroSectionProps = {
  content: HomeHeroContent;
};

const CREDENTIALS = [
  "SGS Inspected",
  "Bureau Veritas",
  "ISO 9001",
  "RSPO Certified",
];

export function HeroSection({
  content,
}: HeroSectionProps) {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      handleMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMove
      );
    };
  }, []);

  return (
    <section className="hero-background relative min-h-screen overflow-hidden">
      <div className="hero-diagonal-pattern" />
      <div className="hero-grain" />

      <div
        className="mouse-glow"
        style={{
          transform: `translate3d(
            ${mouse.x - 180}px,
            ${mouse.y - 180}px,
            0
          )`,
        }}
      />

      <section className="hero relative z-10">
        <div className="hero-copy">
          <p className="eyebrow animate-fade-up">
            <span />
            {content.eyebrow}
          </p>

          <h1 className="animate-fade-up delay-100">
            {content.title}
            <em> {content.titleAccent}</em>
            <br />
            {content.titleEnd}
          </h1>

          <p className="hero-description text-ivory-100/60 animate-fade-up delay-200">
            {content.description}
          </p>

          <div className="hero-credentials animate-fade-up delay-400">
            {CREDENTIALS.map((credential) => (
              <span
                key={credential}
                className="hero-credential"
              >
                <CircleCheck
                  size={13}
                  strokeWidth={1.8}
                  className="hero-credential-icon"
                />
                <span>{credential}</span>
              </span>
            ))}
          </div>

          <div className="hero-actions">
            <Link
              href="/quote/request-quote"
              className="primary-button inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-forest-950 text-[11px] font-medium tracking-[0.06em] uppercase px-7 py-4 rounded transition-colors"
            >
              Request Quotation
              <span>↗</span>
            </Link>

            <a
              href={whatsappLink()}
              className="inline-flex items-center gap-2 border border-[#25D366]/40 hover:border-[#25D366] text-[#25D366] text-[11px] font-medium tracking-[0.06em] uppercase px-7 py-4 rounded transition-colors"
            >
              <MessageCircle size={14} />
              WhatsApp Trade Desk
              <span>↓</span>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="hero-circle">
            <div className="circle-inner">
              <span className="circle-label">
                AFRICA
              </span>
              <span className="circle-main">
                GPG
              </span>
              <span className="circle-label">
                GLOBAL TRADE
              </span>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>
      </section>
    </section>
  );
}
