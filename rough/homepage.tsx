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


function SocialIcon({ social }: { social: SocialLink }) {
  const Icon = SOCIAL_ICONS[social.platform];

  if (!Icon) {
    return null;
  }

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label ?? social.platform}
      className="
        flex h-9 w-9 items-center justify-center rounded
        border border-forest-700
        text-ivory-100/45
        transition-colors
        hover:border-gold-500/40 hover:text-gold-500
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-gold-500/60
        focus-visible:ring-offset-2
        focus-visible:ring-offset-forest-950
      "
    >
      <Icon size={15} aria-hidden="true" />
    </a>
  );
}


app/error.tsx
"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em]">
          Something went wrong
        </p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          We couldn't load this page
        </h1>

        <p className="mt-4 text-base leading-7 text-muted-foreground">
          An unexpected error occurred while loading this page. Please try
          again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </main>
  );
}


loading.tsx
export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="flex min-h-[60vh] items-center justify-center px-6 py-20"
    >
      <div className="flex flex-col items-center text-center">
        <div
          aria-hidden="true"
          className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent"
        />

        <p className="mt-4 text-sm text-muted-foreground">
          Loading...
        </p>
      </div>
    </main>
  );
}



not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em]">
          404
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-4 text-base leading-7 text-muted-foreground">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}


app/admin/error.tsx



siteguard
│
├── code
├── dependencies
├── content
├── accessibility
├── performance
└── security


src/
├── analyzers/
│   ├── code/
│   ├── dependencies/
│   ├── content/
│   ├── accessibility/
│   ├── performance/
│   └── security/
│
├── ai/
│   ├── content-reviewer.ts
│   ├── code-reviewer.ts
│   ├── accessibility-reviewer.ts
│   └── claim-reviewer.ts
│
├── scanners/
│   ├── browser.ts
│   ├── routes.ts
│   ├── dom.ts
│   └── assets.ts
│
├── reporters/
│   ├── console.ts
│   ├── json.ts
│   ├── markdown.ts
│   └── github.ts
│
├── policy/
│   ├── rules.ts
│   └── thresholds.ts
│
└── cli.ts

category:
  grammar
  clarity
  tone
  readability
  cta
  consistency
  seo
  claim
  accessibility

add:
heading
navigation
terminology
duplication
factual-risk
conversion

together:
axe-core
+
Playwright

axe → objective accessibility violations
AI  → contextual accessibility reasoning

const viewports = [
  {
    name: "mobile-small",
    width: 320,
    height: 800
  },
  {
    name: "mobile",
    width: 390,
    height: 844
  },
  {
    name: "tablet",
    width: 768,
    height: 1024
  },
  {
    name: "desktop",
    width: 1440,
    height: 900
  }
];

horizontal overflow
elements outside viewport
text clipping
button size
navigation overflow
form usability
images overflowing
sticky/fixed elements
unexpected scrollbars

performance:
Lighthouse / browser measurements
             +
AI interpretation

LCP
CLS
INP
TTFB
total JS
unused JS
image sizes
image formats
render-blocking resources
font loading
network requests

Then AI can explain:
The hero image is approximately X MB and is the
largest contributor to initial page transfer.

Security:
I'd make security two layers.

Static security
npm audit
OSV
Semgrep
Gitleaks
dependency analysis
secret detection
Runtime/browser

Check:

security headers
HTTPS
mixed content
unsafe external resources
cookie attributes
CSP
X-Frame-Options / frame-ancestors
referrer policy
permissions policy

And AI can help classify findings.

The unified finding model

I would make everything conform to one schema.

Something like:

const FindingSchema = z.object({
  id: z.string(),

  engine: z.enum([
    "code",
    "dependency",
    "content",
    "accessibility",
    "performance",
    "security"
  ]),

  source: z.string(),

  rule: z.string(),

  severity: z.enum([
    "info",
    "low",
    "medium",
    "high",
    "critical"
  ]),

  confidence: z.enum([
    "confirmed",
    "high",
    "medium",
    "low"
  ]),

  action: z.enum([
    "safe",
    "review",
    "block"
  ]),

  file: z.string().optional(),

  line: z.number().optional(),

  page: z.string().optional(),

  message: z.string(),

  evidence: z.string().optional(),

  suggestion: z.string().optional(),

  aiGenerated: z.boolean(),

  humanDecision: z.enum([
    "pending",
    "accepted",
    "rejected",
    "deferred"
  ]).default("pending")
});

Now every engine produces the same object.

Configuration:
export default {
  project: {
    name: "Golden Palmera Global",
    framework: "nextjs"
  },

  server: {
    command: "npm run start",
    url: "http://localhost:3000"
  },

  routes: {
    include: [
      "/",
      "/about",
      "/services",
      "/contact",
      "/partnership",
      "/export-buyer"
    ]
  },

  content: {
    enabled: true,
    minimumScore: 85
  },

  accessibility: {
    enabled: true,
    failOn: ["critical", "serious"]
  },

  performance: {
    enabled: true,
    mobile: true,
    desktop: true
  },

  security: {
    enabled: true,
    failOn: ["critical", "high"]
  },

  code: {
    deadCode: true,
    dependencies: true,
    duplicateCode: true
  },

  policy: {
    failOn: [
      "critical"
    ],

    requireHumanApprovalFor: [
      "dead-code",
      "content",
      "ai-suggestion"
    ]
  },

  protectedPaths: [
    "app/**/page.tsx",
    "app/**/layout.tsx",
    "app/**/route.ts",
    "middleware.ts",
    "next.config.*"
  ]
};


Brand Configuration:

brand: {
  name: "Golden Palmera Global",

  spelling: "British English",

  tone: [
    "professional",
    "confident",
    "clear",
    "trustworthy"
  ],

  avoid: [
    "unnecessary jargon",
    "unsupported claims",
    "exaggerated guarantees",
    "generic AI wording"
  ],

  contentRules: {
    requireHumanReviewForClaims: true,
    prohibitUnverifiedStatistics: true,
    preserveProductNames: true
  }
}

Pipeline-example:
jobs:

  ci:
    ...

  quality-gate:
    needs: ci
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci

      - run: npx playwright install --with-deps chromium

      - run: npm run build

      - name: Start application
        run: npm run start &

      - name: Run SiteGuard
        run: npx siteguard audit --ci
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

      - name: Upload quality report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: siteguard-report
          path: |
            .siteguard/report.json
            .siteguard/report.md

  deploy-staging:
    needs: quality-gate
    if: needs.quality-gate.result == 'success'

    ...



But there is an important CI problem

You don't want the AI to randomly fail your deployment because an LLM changed its wording judgment.

Therefore divide checks into:

Hard gates:
TypeScript
ESLint
tests
build
critical security
serious accessibility

Soft gates:
content wording
tone
CTA suggestions
SEO wording
AI code observations

Human gates:
dead-code removal
claim changes
major copy changes
potentially breaking configuration

So:

AI suggestion ≠ CI failure

unless your policy explicitly makes that finding blocking.


Human approval can be integrated into GitHub:

Eventually, the tool can create a PR comment:


Phase 1 — Codebase cleanup:
TypeScript
ESLint
Knip
dependencies
duplicate code
protected files
unified findings
terminal report

No AI required yet except optional explanation.

Phase 2 — Website quality:
Playwright
route discovery
content extraction
axe
mobile viewport testing
link testing
form testing

Phase 3 — AI reasoning:
content review
CTA analysis
SEO reasoning
claim detection
contextual accessibility
code finding explanation
human review

Phase 4 — CI/CD:
quality-gate.yml
GitHub annotations
PR comments
artifacts
approval workflow
staging gate

ReadMe:
SiteGuard does not use AI to determine whether the codebase is correct. 
It uses deterministic analysis to establish evidence, AI to interpret ambiguous findings, 
and human approval for changes that cannot be safely determined automatically.

That is the engineering principle that makes your idea defensible and reusable.


MVP:
@siteguard/cli
│
├── TypeScript
├── ESLint
├── Knip
├── dependency audit
├── duplicate-code detection
├── Playwright route scanner
├── content extraction
├── axe accessibility
├── mobile overflow detection
├── AI content reasoning
├── unified Zod finding schema
├── human-review states
├── JSON + Markdown reports
└── --ci exit-code policy