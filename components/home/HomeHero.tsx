"use client";

import { useEffect, useState } from "react";
import type { Commodity, HomeService, Approach } from "@/sanity/lib/types";
import Link from "next/link";

type HomeHeroProps = {
  commodities: Commodity[];
  services: HomeService[];
  approaches: Approach[];
};


const fallbackSymbols = [
  "◉",
  "✿",
  "◌",
  "✦",
  "◈",
  "◍",
  "✺",
  "◆",
];

export default function HomeHero({
  commodities,
  services,
  approaches,
}: HomeHeroProps) {
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

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <>
      <div
        className="mouse-glow pointer-events-none fixed z-0"
        style={{
          transform: `translate3d(${mouse.x - 180}px, ${
            mouse.y - 180
          }px, 0)`,
        }}
      />

      {/* NAVIGATION */}
      <header className="nav relative z-10">
        <Link href="/" className="brand">
          <span className="brand-mark">GP</span>

          <span>
            <strong>GOLDEN PALMERA</strong>
            <small>GLOBAL</small>
          </span>
        </Link>

        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="nav-button">
          Get in touch
          <span>↗</span>
        </a>
      </header>

      {/* HERO */}
      <section className="hero relative z-10">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            AGRICULTURAL COMMODITIES · GLOBAL TRADE
          </p>

          <h1>
            From trusted
            <em> origins</em>
            <br />
            to global markets.
          </h1>

          <p className="hero-description">
            Golden Palmera Global connects quality agricultural
            commodities from Africa with buyers and markets around
            the world.
          </p>

          <div className="hero-actions">
            <a href="#products" className="primary-button">
              Explore commodities <span>↗</span>
            </a>

            <a href="#about" className="text-button">
              Discover our company <span>↓</span>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="hero-circle">
            <div className="circle-inner">
              <span className="circle-label">AFRICA</span>
              <span className="circle-main">GPG</span>
              <span className="circle-label">GLOBAL TRADE</span>
            </div>
          </div>

          <div className="floating-card card-top">
            <span>01</span>
            <strong>Source</strong>
          </div>

          <div className="floating-card card-bottom">
            <span>02</span>
            <strong>Connect</strong>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>
      </section>

      {/* INTRO */}
      <section id="about" className="intro section">
        <div className="section-label">
          01 — THE COMPANY
        </div>

        <div className="intro-grid">
          <h2>
            Building bridges between
            <span> agriculture and opportunity.</span>
          </h2>

          <div>
            <p className="large-copy">
              Golden Palmera Global is an agricultural commodities
              and international trade company focused on sourcing,
              processing, packaging and exporting quality products
              to global markets.
            </p>

            <p>
              We work across the agricultural value chain, building
              dependable relationships with farmers, cooperatives,
              suppliers, logistics partners and international
              buyers.
            </p>

            <a href="#contact" className="arrow-link">
              Work with us <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCTS FROM SANITY */}
      <section id="products" className="products section">
        <div className="section-heading">
          <div className="section-label">
            02 — OUR COMMODITIES
          </div>

          <h2>
            Nature&apos;s resources.
            <br />
            Prepared for the world.
          </h2>
        </div>

        {commodities.length > 0 ? (
          <div className="product-grid">
            {commodities.map((product, index) => (
              <article
                className="product-card"
                key={product._id}
              >
                <span className="product-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="product-symbol">
                  {product.symbol ||
                    fallbackSymbols[
                      index % fallbackSymbols.length
                    ]}
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>

                  {product.scientific && (
                    <i>{product.scientific}</i>
                  )}

                  <p>{product.description}</p>
                </div>

                <span className="product-arrow">
                  ↗
                </span>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#ddd9cc] bg-white p-12 text-center">
            <p className="mx-auto mt-3 max-w-xl leading-7 text-[#687068]">
              Our commodity portfolio is currently being
              updated.
            </p>
          </div>
        )}
      </section>

      {/* SERVICES */}
      <section id="services" className="services section">
         <div className="section-label">03 — WHAT WE DO</div>

        <div className="services-header">
          <h2>
            One supply chain.
            <br />
            <span>Many possibilities.</span>
          </h2>

          <p>
            From the first point of sourcing to the final international
            destination, we focus on creating efficient, transparent and
            dependable trade relationships.
          </p>
        </div>

        {services.length > 0 ? (
          <div className="service-list">
            {services.map((service) => (
              <Link href={`/services/${service.slug}`}
                className="service-row"
                key={service._id}
              >
      
                <span className="service-number">{service.number}</span>

                <h3>{service.title}</h3>

                <p>{service.shortDescription}</p>

                <span className="service-arrow">↗</span>
              </Link>
            ))}
          </div>
        ):(
          <div className="rounded-3xl border border-[#ddd9cc] bg-white p-12 text-center">
            <p className="text-lg font-medium">
              Our services are being prepared.
            </p>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-[#687068]">
              Details about our services will be updated shortly.
            </p>
          </div>
        )}
      </section>

      {/* SUPPLY CHAIN */}
      <section className="supply section">
        {/* Keep your existing supply chain layout here */}
        <div className="supply-content">
          <div className="section-label">04 — OUR APPROACH</div>
            <h2>
              Connecting <br />
              <span>origin to destination.</span>
            </h2>
        
            <p>
              We believe global agricultural trade starts with strong local
              relationships. Our approach combines responsible sourcing,
              quality-focused operations and international market access.
            </p>
        </div>
        
        {approaches.length > 0 ? (
          <div className="supply-path">
            {approaches.map((item, index) => (
              <Link
                key={item._id}
                href={`/approach/${item.slug}`}
                className="path-step"
              >
                <span>
                  {item.number ||
                    String(index + 1).padStart(2, "0")}
                </span>

                <strong>{item.title}</strong>

                {index < approaches.length - 1 && (
                  <i>→</i>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#ddd9cc] bg-white p-12 text-center">
            <p className="text-lg font-medium">
              Our approach is being prepared.
            </p>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-[#687068]">
              More information about how we work will be
              available shortly.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section id="contact" className="contact section">
        {/* Keep your existing CTA */}
        <div className="contact-circle">
          <span>GPG</span>
        </div>

        <div className="contact-content">
          <div className="section-label">05 — LET&apos;S CONNECT</div>

          <h2>
            Let&spos;s take your
            <br />
            <em>commodity further.</em>
          </h2>

          <p>
            Whether you are an international buyer, agricultural supplier,
            cooperative or strategic partner, we would like to hear from you.
          </p>

          <a href="mailto:info@goldenpalmera.com" className="primary-button light">
            Start a conversation <span>↗</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        {/* Keep your existing footer */}
        <div className="footer-brand">
          <span className="brand-mark">GP</span>
          <div>
            <strong>GOLDEN PALMERA</strong>
            <small>GLOBAL</small>
          </div>
        </div>

        <p>© {new Date().getFullYear()} Golden Palmera Global. All rights reserved.</p>

        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}