import type { Product } from "@/content/products/types";

type Props = {
  product: Product;
};

export function ProductAttributes({ product }: Props) {
  const attributes = [
    {
      number: "01",
      title: "Available Forms",
      subtitle: "Product variations",
      description:
        "Available product forms designed to accommodate different buyer requirements and processing needs.",
      items: product.forms,
      icon: "◈",
    },
    {
      number: "02",
      title: "Packaging",
      subtitle: "Presentation & delivery",
      description:
        "Packaging options developed to support product protection, handling and international distribution.",
      items: product.packaging,
      icon: "▤",
    },
    {
      number: "03",
      title: "Applications",
      subtitle: "Industry & usage",
      description:
        "Explore the various industries and applications where this agricultural commodity can be utilized.",
      items: product.applications,
      icon: "⌘",
    },
    {
      number: "04",
      title: "Certifications",
      subtitle: "Quality assurance",
      description:
        "Relevant certifications and quality standards associated with the product and its sourcing.",
      items: product.certifications,
      icon: "✳",
    },
  ].filter(
    (
      attribute,
    ): attribute is {
      number: string;
      title: string;
      subtitle: string;
      description: string;
      items: string[];
      icon: string;
    } => Boolean(attribute.items?.length),
  );

  if (!attributes.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#f5f2e9] py-24 lg:py-32">

      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-40 h-[500px] w-[500px] rounded-full border border-[#173f2b]/5"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-56 h-[350px] w-[350px] rounded-full border border-[#173f2b]/5"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">

        {/* Section heading */}
        <div className="mb-16 border-b border-black/10 pb-10 lg:mb-20">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div className="max-w-3xl">

              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#b78628]" />

                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8c6d35]">
                  Product characteristics
                </p>
              </div>

              <h2 className="mt-7 text-4xl font-medium leading-[1.05] tracking-[-0.05em] text-[#173f2b] md:text-6xl">
                Exploring the
                <br />

                <span className="text-[#b78628]">
                  possibilities of {product.name}
                </span>
              </h2>

            </div>

            <p className="max-w-sm text-sm leading-7 text-black/50">
              From available product forms and packaging to
              practical applications and quality standards,
              discover the characteristics that make our
              agricultural products suitable for global markets.
            </p>

          </div>
        </div>

        {/* Attribute introduction */}
        <div className="mb-12 flex items-center justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8c6d35]">
              Product intelligence
            </p>

            <h3 className="mt-3 text-2xl font-medium tracking-tight text-[#173f2b] md:text-3xl">
              Product attributes
            </h3>
          </div>

          <span className="hidden font-mono text-xs tracking-widest text-black/35 md:block">
            {String(attributes.length).padStart(2, "0")} CATEGORIES
          </span>

        </div>

        {/* Attribute cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {attributes.map((attribute) => (
            <article
              key={attribute.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#173f2b]/10 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#b78628]/40 hover:shadow-[0_25px_60px_rgba(23,63,43,0.09)] lg:p-8"
            >

              {/* Card top */}
              <div className="flex items-start justify-between">

                <span className="font-mono text-sm tracking-widest text-[#b78628]">
                  / {attribute.number}
                </span>

                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f2e9] text-xl text-[#173f2b] transition-all duration-500 group-hover:bg-[#173f2b] group-hover:text-[#d6b45c]">
                  {attribute.icon}
                </span>

              </div>

              {/* Card heading */}
              <div className="mt-10">

                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8c6d35]">
                  {attribute.subtitle}
                </p>

                <h3 className="mt-3 text-2xl font-medium tracking-tight text-[#173f2b]">
                  {attribute.title}
                </h3>

                <p className="mt-4 min-h-[84px] text-sm leading-7 text-[#687068]">
                  {attribute.description}
                </p>

              </div>

              {/* Divider */}
              <div className="my-7 h-px w-full bg-black/10 transition-colors group-hover:bg-[#b78628]/50" />

              {/* Attribute items */}
              <div className="flex-1">

                <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                  Available options
                </p>

                <ul className="space-y-4">

                  {attribute.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-[#173f2b]"
                    >

                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b78628]" />

                      <span className="break-words">
                        {item}
                      </span>

                    </li>
                  ))}

                </ul>

              </div>

              {/* Card footer */}
              <div className="mt-10 flex items-center justify-between border-t border-black/5 pt-5">

                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/35">
                  {attribute.items.length}{" "}
                  {attribute.items.length === 1 ? "Option" : "Options"}
                </span>

                <span className="text-lg text-[#b78628] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </div>

              {/* Decorative accent */}
              <div
                aria-hidden="true"
                className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-[#f5f2e9] transition-transform duration-500 group-hover:scale-150"
              />

            </article>
          ))}

        </div>

        {/* Bottom statement */}
        <div className="mt-24 border-t border-black/10 pt-12 lg:mt-32">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8c6d35]">
                Quality meets opportunity
              </p>

              <h3 className="mt-4 max-w-2xl text-2xl font-medium tracking-tight text-[#173f2b] md:text-3xl">
                The right product specifications
                for every market and application.
              </h3>

            </div>

            <a
              href="/contact"
              className="inline-flex w-fit items-center gap-4 rounded-full bg-[#173f2b] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#b78628]"
            >
              Discuss your requirements

              <span aria-hidden="true">
                →
              </span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}