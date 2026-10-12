"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";
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
    // Avoid running mouse tracking on touch devices.
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMove
      );
    };
  }, []);

  return (
    <section className="hero-background relative min-h-screen overflow-hidden">
      {/* =========================================
          BACKGROUND
          ========================================= */}

      <div
        className="hero-background-image"
        aria-hidden="true"
      >
        {content.image && (
          <Image
            src={urlFor(content.image)
              .width(2400)
              .quality(88)
              .url()}
            alt={content.title}
            fill
            priority
            sizes="100vw"
            className="hero-background-image-img"
          />
        )}
        <div className="hero-image-tint" />
        <div className="hero-image-vignette" />
        <div className="hero-image-grain" />
      </div>

      {/* Existing brand texture */}
      <div
        className="hero-diagonal-pattern"
        aria-hidden="true"
      />

      <div
        className="hero-grain"
        aria-hidden="true"
      />

      {/* =========================================
          MOUSE LIGHT
          ========================================= */}

      <div
        className="mouse-glow"
        aria-hidden="true"
        style={{
          transform: `translate3d(
            ${mouse.x - 180}px,
            ${mouse.y - 180}px,
            0
          )`,
        }}
      />

      {/* =========================================
          HERO
          ========================================= */}

      <div className="hero relative z-10">
        <div className="hero-copy">
          {/* Eyebrow */}

          <p className="eyebrow animate-fade-up">
            <span aria-hidden="true" />
            {content.eyebrow}
          </p>

          {/* Headline */}

          <h1 className="animate-fade-up delay-100">
            {content.title}
            <em>{content.titleAccent}</em>
            <br />
            {content.titleEnd}
          </h1>

          {/* Description */}

          <p className="hero-description animate-fade-up delay-200">
            {content.description}
          </p>

          {/* Credentials */}

          <div className="hero-credentials animate-fade-up delay-300">
            {CREDENTIALS.map((credential) => (
              <span
                key={credential}
                className="hero-credential"
              >
                <CircleCheck
                  size={13}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="hero-credential-icon"
                />

                <span>{credential}</span>
              </span>
            ))}
          </div>

          {/* CTAs */}

          <div className="hero-actions animate-fade-up delay-400">
            <Link
              href="/quote/request-quote"
              className="primary-button"
            >
              <span>Request Quotation</span>
              <span aria-hidden="true">↗</span>
            </Link>

            <a
              href={whatsappLink()}
              className="whatsapp-button"
            >
              <MessageCircle
                size={14}
                aria-hidden="true"
              />

              <span>WhatsApp Trade Desk</span>

              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* =========================================
            GPG BRAND SEAL
            ========================================= */}

        <div
          className="hero-brand-seal"
          aria-label="GPG Africa Global Trade"
        >
          <div className="hero-brand-seal-ring hero-brand-seal-ring-outer">
            <span className="hero-seal-marker hero-seal-marker-top">
              AFRICA
            </span>

            <span className="hero-seal-marker hero-seal-marker-bottom">
              GLOBAL TRADE
            </span>
          </div>

          <div className="hero-brand-seal-ring hero-brand-seal-ring-inner">
            <span className="hero-brand-seal-main">
              GPG
            </span>
          </div>
        </div>

        {/* =========================================
            TRADE LABEL
            ========================================= */}

        <div
          className="hero-trade-label"
          aria-hidden="true"
        >
          <span />
          <strong>GLOBAL COMMODITIES</strong>
        </div>

        {/* =========================================
            IMAGE ORIGIN LABEL
            ========================================= */}

        <div
          className="hero-origin-label"
          aria-hidden="true"
        >
          <span className="hero-origin-number">
            01
          </span>

          <span className="hero-origin-line" />

          <span>AFRICAN ORIGIN</span>
        </div>

        {/* =========================================
            SCROLL
            ========================================= */}

        <div className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <i aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
