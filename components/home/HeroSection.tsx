"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { urlFor } from "@/sanity/lib/image";
import {
  CircleCheck,
  MessageCircle,
} from "lucide-react";
import type { HomeHeroContent } from "@/content/home/types";
import { whatsappLink } from "@/lib/utils";
import { BrandSeal } from "@/components/sharedComponents/BrandSeal";

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

  const glowCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = glowCanvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const coarsePointer = window.matchMedia(
      "(pointer: coarse)"
    );

    if (reducedMotion.matches || coarsePointer.matches) {
      return;
    }

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let visible = false;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      target.x = event.clientX;
      target.y = event.clientY;
      visible = true;

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const handlePointerLeave = () => {
      visible = false;

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const draw = () => {
      animationFrame = 0;

      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;

      context.clearRect(0, 0, width, height);

      if (visible) {
        const radius = 240;
        const gradient = context.createRadialGradient(
          current.x,
          current.y,
          0,
          current.x,
          current.y,
          radius
        );

        gradient.addColorStop(0, "rgba(201, 168, 76, 0.18)");
        gradient.addColorStop(0.3, "rgba(201, 168, 76, 0.09)");
        gradient.addColorStop(0.65, "rgba(201, 168, 76, 0.025)");
        gradient.addColorStop(1, "rgba(201, 168, 76, 0)");

        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      }

      const distance = Math.hypot(
        target.x - current.x,
        target.y - current.y
      );

      if (visible && distance > 0.5) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      context.clearRect(0, 0, width, height);
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

      <canvas
        ref={glowCanvasRef}
        className="mouse-glow"
        aria-hidden="true"
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
          <BrandSeal
            size="md"
            float
            ripple
            className="hero-brand-seal"
          />
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
