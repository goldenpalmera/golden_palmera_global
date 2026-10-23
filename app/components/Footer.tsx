import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#102d20] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo light />

            <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
              Connecting quality agricultural commodities from Africa to
              global markets through responsible sourcing, value addition,
              and reliable export solutions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#d6b45c]">
              Company
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/about"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                About Us
              </Link>
              <Link
                href="/products"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Products
              </Link>
              <Link
                href="/services"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#d6b45c]">
              Get in touch
            </h3>

            <div className="mt-5 space-y-3 text-sm text-white/60">
              <p>Global Agricultural Trade</p>
              <p>West Africa</p>
              <p>Export & International Trade</p>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Golden Palmera Global. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}