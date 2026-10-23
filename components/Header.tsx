"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12 lg:px-20">
        {/* GPG Mark */}
        <Link
          href="/"
          className="group flex items-center"
          aria-label="Golden Palmera Global home"
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center text-xl font-bold tracking-[-0.08em] text-[#182018]">
            <span>G</span>
            <span className="-ml-1">P</span>
            <span className="-ml-1 rotate-180">G</span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#4e554e] transition-colors hover:text-[#a07a3d]"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/compliance"
            className="text-sm font-medium text-[#4e554e] transition-colors hover:text-[#a07a3d]"
          >
            Compliance
          </Link>

          <Link
            href="/advisory-board"
            className="text-sm font-medium text-[#4e554e] transition-colors hover:text-[#a07a3d]"
          >
            Advisory Board
          </Link>

          <Link
            href="/contact"
            className="rounded-full bg-[#182018] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a07a3d]"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9d5ca] bg-white/80 md:hidden"
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
        className={`mx-4 overflow-hidden rounded-3xl border border-[#ddd9cc] bg-white shadow-xl transition-all duration-300 md:hidden ${
          open
            ? "max-h-[600px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-5">
          {[...navigation,
            { label: "Compliance", href: "/compliance" },
            { label: "Advisory Board", href: "/advisory-board" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-[#eeeae1] px-3 py-4 text-base font-medium text-[#182018] last:border-0"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-full bg-[#182018] px-5 py-3 text-center font-semibold text-white"
          >
            Contact GPG
          </Link>
        </nav>
      </div>
    </header>
  );
}