"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  {label: "Compliance", href: "/compliance"},
  { label: "Insights", href: "/blog" },
  { label: "Partnership", href: "/contact/partnership" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-forest-950/95 backdrop-blur-md border-b border-gold-500/10 shadow-lg"
          : "bg-forest-950/80 backdrop-blur-sm"
      )}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12 lg:px-20">
        {/* GPG Mark */}
        <Link href="/" 
          className="brand"
          aria-label="Golden Palmera Global home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">GP</span>

          <span>
            <strong>GOLDEN PALMERA</strong>
            <small>GLOBAL</small>
          </span>
        </Link>


        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-[#4e554e] transition-colors hover:text-[#a07a3d]",
                pathname === item.href
                  ? "text-gold-500"
                  : "text-ivory-100/60 hover:text-ivory-100"
              )}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="rounded-full bg-[#a07a3d] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-700"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9d5ca] bg-white/80 md:hidden transition-colors"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-5 bg-[#182018] transition-transform ${
                open ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-[#182018] transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-[#182018] transition-transform ${
                open ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        className={`mx-4 overflow-hidden rounded-3xl border border-[#ddd9cc] shadow-xl transition-all duration-300 md:hidden ${
          open
            ? "max-h-[600px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-5">
          {[...navigation,
            { label: "Advisory Board", href: "/advisory-board" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn("border-b border-[#eeeae1] px-3 py-4 text-sm text-base font-medium  transition-colors",
                pathname === item.href
                  ? "text-gold-500"
                  : "text-ivory-100/65 hover:text-ivory-100"
              )}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-full border border-gold-500/30 bg-gold-500/20 px-5 py-2.5 text-sm font-semibold text-ivory-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gold-500 hover:text-forest-950"
          >
            Contact GPG
          </Link>
        </nav>
      </div>
    </header>
  );
}