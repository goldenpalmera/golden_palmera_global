import { client } from "@/sanity/lib/client";
import { commoditiesQuery } from "@/sanity/lib/queries";
import type { Commodity } from "@/sanity/lib/types";

import HomeHero from "./components/HomeHero";

async function getCommodities() {
  return client.fetch<Commodity[]>(commoditiesQuery);
}

export default async function HomePage() {
  const commodities = await getCommodities();

  return (
    <main className="site-shell">
      <HomeHero commodities={commodities} />
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

const products = [
  {
    name: "Palm Oil",
    scientific: "Elaeis guineensis",
    description: "Quality palm oil sourced through reliable agricultural supply networks.",
  },
  {
    name: "Hibiscus",
    scientific: "Hibiscus sabdariffa",
    description: "Carefully sourced dried hibiscus suitable for international markets.",
  },
  {
    name: "Sesame Seed",
    scientific: "Sesamum indicum",
    description: "Export-grade sesame sourced from trusted farming communities.",
  },
  {
    name: "Dried Ginger",
    scientific: "Zingiber officinale",
    description: "Selected dried ginger prepared for global food and ingredient markets.",
  },
  {
    name: "Cashew Nut",
    scientific: "Anacardium occidentale",
    description: "Quality cashew sourced through established agricultural networks.",
  },
  {
    name: "Shea Butter",
    scientific: "Vitellaria paradoxa",
    description: "Natural shea butter prepared for commercial and international applications.",
  },
  {
    name: "Bitter Kola",
    scientific: "Garcinia kola",
    description: "Traditionally valued agricultural produce prepared for international trade.",
  },
  {
    name: "Charcoal",
    scientific: "Agricultural & industrial supply",
    description: "Reliable charcoal sourcing and export coordination.",
  },
];

const services = [
  {
    number: "01",
    title: "Sourcing & Aggregation",
    text: "We connect international demand with reliable farmers, cooperatives and suppliers.",
  },
  {
    number: "02",
    title: "Processing & Packaging",
    text: "Value-added processing, preservation, grading and professional export packaging.",
  },
  {
    number: "03",
    title: "Quality Control",
    text: "Quality-focused systems designed to support consistency and international standards.",
  },
  {
    number: "04",
    title: "Export Facilitation",
    text: "Documentation, inspection, logistics coordination and international trade support.",
  },
];

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <main className="site-shell">
      <div
        className="mouse-glow"
        style={{
          transform: `translate3d(${mouse.x - 180}px, ${mouse.y - 180}px, 0)`,
        }}
      />

      {/* NAVIGATION */}
      <header className="nav">
        <a href="#" className="brand">
          <span className="brand-mark">GP</span>
          <span>
            <strong>GOLDEN PALMERA</strong>
            <small>GLOBAL</small>
          </span>
        </a>

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
      <section className="hero">
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
            Golden Palmera Global connects quality agricultural commodities
            from Africa with buyers and markets around the world.
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
        <div className="section-label">01 — THE COMPANY</div>

        <div className="intro-grid">
          <h2>
            Building bridges between
            <span> agriculture and opportunity.</span>
          </h2>

          <div>
            <p className="large-copy">
              Golden Palmera Global is an agricultural commodities and
              international trade company focused on sourcing, processing,
              packaging and exporting quality products to global markets.
            </p>

            <p>
              We work across the agricultural value chain, building dependable
              relationships with farmers, cooperatives, suppliers, logistics
              partners and international buyers.
            </p>

            <a href="#contact" className="arrow-link">
              Work with us <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="products section">
        <div className="section-heading">
          <div className="section-label">02 — OUR COMMODITIES</div>
          <h2>Nature's resources.<br />Prepared for the world.</h2>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-card" key={product.name}>
              <span className="product-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="product-symbol">
                {["◉", "✿", "◌", "✦", "◈", "◍", "✺", "◆"][index]}
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <i>{product.scientific}</i>
                <p>{product.description}</p>
              </div>

              <span className="product-arrow">↗</span>
            </article>
          ))}
        </div>
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

        <div className="service-list">
          {services.map((service) => (
            <article className="service-row" key={service.number}>
              <span className="service-number">{service.number}</span>

              <h3>{service.title}</h3>

              <p>{service.text}</p>

              <span className="service-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      {/* SUPPLY CHAIN */}
      <section className="supply section">
        <div className="supply-content">
          <div className="section-label">04 — OUR APPROACH</div>

          <h2>
            Connecting
            <br />
            <span>origin to destination.</span>
          </h2>

          <p>
            We believe global agricultural trade starts with strong local
            relationships. Our approach combines responsible sourcing,
            quality-focused operations and international market access.
          </p>
        </div>

        <div className="supply-path">
          {["Farmers", "Aggregation", "Processing", "Quality", "Export", "Global Market"].map(
            (item, index) => (
              <div className="path-step" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
                {index < 5 && <i>→</i>}
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="contact section">
        <div className="contact-circle">
          <span>GPG</span>
        </div>

        <div className="contact-content">
          <div className="section-label">05 — LET'S CONNECT</div>

          <h2>
            Let's take your
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
    </main>
  );
}