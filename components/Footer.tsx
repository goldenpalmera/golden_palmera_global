import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#182018] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex text-2xl font-bold tracking-[-0.08em]"
            >
              GPG
            </Link>

            <p className="mt-6 max-w-sm leading-7 text-white/50">
              Connecting African agricultural commodities with global
              markets through reliable sourcing, value creation, and
              international trade.
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d2b477]">
              Company
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/about"
                className="text-white/60 transition-colors hover:text-white"
              >
                About
              </Link>

              <Link
                href="/advisory-board"
                className="text-white/60 transition-colors hover:text-white"
              >
                Advisory Board
              </Link>

              <Link
                href="/compliance"
                className="text-white/60 transition-colors hover:text-white"
              >
                Compliance
              </Link>

              <Link
                href="/contact"
                className="text-white/60 transition-colors hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Business */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d2b477]">
              Business
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/products"
                className="text-white/60 transition-colors hover:text-white"
              >
                Products
              </Link>

              <Link
                href="/services"
                className="text-white/60 transition-colors hover:text-white"
              >
                Services
              </Link>

              <Link
                href="/blog"
                className="text-white/60 transition-colors hover:text-white"
              >
                Insights
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d2b477]">
              Connect
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="mailto:info@goldenpalmeraglobal.com"
                className="break-all text-white/60 transition-colors hover:text-white"
              >
                info@goldenpalmeraglobal.com
              </a>

              <p className="text-white/60">
                Nigeria
                <br />
                West Africa
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/35 md:flex-row">
          <p>
            © {new Date().getFullYear()} Golden Palmera Global. All rights
            reserved.
          </p>

          <p>Agricultural Commodities • Global Trade</p>
        </div>
      </div>
    </footer>
  );
}