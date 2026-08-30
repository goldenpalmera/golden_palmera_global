import Link from "next/link";
import InquiryForm from "@/components/inquiry/InquiryForm";
import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";

export default function ContactPage() {
  return (
    <main className="bg-[#f8f6f0] text-[#171717]">
      <ContactHero />

      <section className="px-6 py-24 md:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
              Golden Palmera Global
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                  Email
                </p>

                <a
                  href="mailto:info@goldenpalmeraglobal.com"
                  className="mt-2 block text-lg transition-colors hover:text-[#8c6d35]"
                >
                  info@goldenpalmeraglobal.com
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                  Location
                </p>

                <p className="mt-2 text-lg">
                  Nigeria
                  <br />
                  West Africa
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                  Business
                </p>

                <p className="mt-2 max-w-xs text-sm leading-6 text-black/55">
                  Agricultural sourcing, processing, export and international
                  trade.
                </p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="bg-[#b7924a] px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            Global reach
          </p>

          <div className="mt-8 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <h2 className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">
              Rooted in Africa.
              <br />
              Connected to the world.
            </h2>

            <Link
              href="/products"
              className="group shrink-0 text-xs uppercase tracking-[0.2em]"
            >
              Explore our products
              <span className="ml-4 inline-block transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}