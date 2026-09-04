"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "../app/components/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
        <nav className="flex items-center justify-between">
          <Link href="/" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#173f2b] transition-colors hover:text-[#b78628]"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="rounded-full bg-[#173f2b] px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#24583d]"
            >
              Request a Quote
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#173f2b]/15 bg-white/80 lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-[#173f2b] transition-transform ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-[#173f2b] transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-[#173f2b] transition-transform ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>

        {open && (
          <div className="mt-4 rounded-2xl border border-black/5 bg-white p-4 shadow-xl lg:hidden">
            <div className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-black/5 px-3 py-4 text-sm font-medium text-[#173f2b] last:border-0"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full bg-[#173f2b] px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}