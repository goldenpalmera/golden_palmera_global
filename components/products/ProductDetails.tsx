import type { Product } from "@/content/products/types";
import { PortableText } from "@portabletext/react";

type Props = {
  product: Product;
};

export function ProductDetails({ product }: Props) {
  const specifications = [
    { label: "Country of Origin", value: product.origin },
    { label: "Processing Method", value: product.processing },
    { label: "Product Grade", value: product.grade },
    { label: "Minimum Order Quantity", value: product.minimumOrder },
    { label: "Availability", value: product.availability },
  ].filter(
    (item): item is { label: string; value: string } =>
      Boolean(item.value),
  );

  return (
    <section className="relative overflow-hidden bg-[#f8f6f0] py-24 lg:py-32">

      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full border border-[#173f2b]/5"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">

        {/* Section heading */}
        <div className="mb-16 border-b border-black/10 pb-10 lg:mb-20">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#b78628]" />

                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8c6d35]">
                  Product intelligence
                </p>
              </div>

              <h2 className="mt-7 text-4xl font-medium leading-[1.05] tracking-[-0.05em] text-[#173f2b] md:text-6xl">
                Understanding our
                <br />
                <span className="text-[#b78628]">
                  {product.name}
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-black/50">
              Explore the product characteristics, sourcing
              information and commercial specifications that
              define our agricultural commodities.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">

          {/* Product overview */}
          <div>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8c6d35]">
                01 / Product overview
              </p>

              <span className="h-px flex-1 ml-6 bg-black/10" />
            </div>

            <h3 className="max-w-2xl text-3xl font-medium leading-tight tracking-tight text-[#173f2b] md:text-4xl">
              Quality, sourcing and product characteristics.
            </h3>

            {product.description ? (
              <div className="prose prose-base mt-8 max-w-none
                prose-p:text-[#46554a]
                prose-p:text-[15px]
                prose-p:leading-[2]
                prose-p:mb-6
                prose-headings:font-semibold
                prose-headings:tracking-tight
                prose-headings:text-[#173f2b]
                prose-headings:mt-10
                prose-headings:mb-4
                prose-strong:text-[#173f2b]
                prose-strong:font-semibold
                prose-li:text-[#46554a]
                prose-li:text-[15px]
                prose-li:leading-8
                prose-li:my-2
                prose-a:text-[#8c6d35]
                prose-a:font-medium
                prose-a:underline
                prose-blockquote:border-l-[#b78628]
                prose-blockquote:text-[#46554a]
              ">
                <PortableText value={product.description} />
              </div>
            ) : (
              <p className="mt-8 text-base leading-8 text-[#46554a]">
                Contact our team to learn more about this
                product, its specifications and sourcing options.
              </p>
            )}

            {/* Information footer */}
            <div className="mt-14 border-t border-black/10 pt-8">
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#173f2b] text-[#d6b45c]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M12 3v18M3 12h18" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#173f2b]">
                    Sourcing with confidence
                  </h4>

                  <p className="mt-2 max-w-lg text-sm leading-7 text-black/50">
                    We focus on connecting agricultural
                    producers and international buyers through
                    reliable sourcing, quality management and
                    responsible trade practices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-[#173f2b]/10 bg-white shadow-[0_20px_70px_rgba(23,63,43,0.06)]">

              {/* Card header */}
              <div className="bg-[#173f2b] px-8 py-9 text-white lg:px-10">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d6b45c]">
                    02 / Technical profile
                  </p>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M4 7h16M4 12h16M4 17h10" />
                    </svg>
                  </span>
                </div>

                <h3 className="mt-8 text-3xl font-medium tracking-tight">
                  Product specifications
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">
                  Key product information and commercial details.
                </p>
              </div>

              {/* Specification rows */}
              <div className="px-8 py-3 lg:px-10">
                {specifications.length > 0 ? (
                  specifications.map((item, index) => (
                    <Specification
                      key={item.label}
                      index={index + 1}
                      label={item.label}
                      value={item.value}
                    />
                  ))
                ) : (
                  <p className="py-10 text-sm leading-7 text-black/45">
                    Product specifications are available on
                    request. Please contact our team for details.
                  </p>
                )}
              </div>

              {/* Card footer */}
              <div className="border-t border-black/5 bg-[#f8f6f0] px-8 py-6 lg:px-10">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#b78628]" />

                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#173f2b]">
                    Product information
                  </p>
                </div>

                <p className="mt-2 text-xs leading-6 text-black/45">
                  Specifications may vary depending on origin,
                  season, processing and order requirements.
                </p>
              </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute -bottom-3 -right-3 -z-10 h-32 w-32 rounded-3xl bg-[#b78628]/10" />
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-24 border-t border-black/10 pt-12 lg:mt-32">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8c6d35]">
                Global agricultural trade
              </p>

              <h3 className="mt-4 max-w-2xl text-2xl font-medium tracking-tight text-[#173f2b] md:text-3xl">
                Connecting quality agricultural products
                with international markets.
              </h3>
            </div>

            <a
              href="/contact"
              className="inline-flex w-fit items-center gap-4 rounded-full bg-[#173f2b] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#b78628]"
            >
              Make an enquiry

              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

function Specification({
  index,
  label,
  value,
}: {
  index: number;
  label: string;
  value: string;
}) {
  return (
    <div className="group flex items-start gap-5 border-b border-black/10 py-6 last:border-0">

      <span className="pt-1 font-mono text-xs text-[#b78628]">
        {String(index).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40">
          {label}
        </p>

        <p className="mt-2 break-words text-base font-medium leading-7 text-[#173f2b]">
          {value}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#b78628]/50 transition-colors group-hover:bg-[#b78628]"
      />
    </div>
  );
}