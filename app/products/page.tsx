import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Link from "next/link";

const products = [
  {
    number: "01",
    name: "Palm Oil",
    botanical: "Elaeis guineensis",
    description:
      "A versatile agricultural commodity supplied for food, manufacturing, and industrial applications.",
    color: "from-amber-700 via-orange-500 to-yellow-400",
    accent: "PO",
  },
  {
    number: "02",
    name: "Charcoal",
    botanical: "Premium African Charcoal",
    description:
      "Carefully sourced charcoal suitable for international wholesale and commercial distribution.",
    color: "from-slate-950 via-slate-700 to-slate-400",
    accent: "CH",
  },
  {
    number: "03",
    name: "Hibiscus",
    botanical: "Hibiscus sabdariffa",
    description:
      "Dried hibiscus sourced for beverage, botanical, food, and international trading applications.",
    color: "from-red-950 via-red-700 to-rose-500",
    accent: "HB",
  },
  {
    number: "04",
    name: "Sesame Seed",
    botanical: "Sesamum indicum",
    description:
      "Quality sesame seed prepared for food manufacturers, processors, and international commodity buyers.",
    color: "from-stone-700 via-amber-700 to-yellow-200",
    accent: "SS",
  },
  {
    number: "05",
    name: "Dried Ginger",
    botanical: "Zingiber officinale",
    description:
      "Dried ginger with applications across food, beverage, spice, processing, and natural product industries.",
    color: "from-orange-950 via-orange-700 to-amber-400",
    accent: "DG",
  },
  {
    number: "06",
    name: "Cashew Nut",
    botanical: "Anacardium occidentale",
    description:
      "African cashew sourced through established agricultural supply networks for international markets.",
    color: "from-yellow-900 via-amber-600 to-orange-300",
    accent: "CN",
  },
  {
    number: "07",
    name: "Shea Butter",
    botanical: "Vitellaria paradoxa",
    description:
      "Natural shea butter supplied for cosmetic, personal care, food, and manufacturing applications.",
    color: "from-stone-800 via-stone-500 to-amber-200",
    accent: "SB",
  },
  {
    number: "08",
    name: "Bitter Kola",
    botanical: "Garcinia kola",
    description:
      "Traditionally valued African botanical product sourced for international trade and distribution.",
    color: "from-green-950 via-green-800 to-lime-500",
    accent: "BK",
  },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />

      <main>
        <PageHero
          eyebrow="Our Commodities"
          title="Quality agricultural products from Africa."
          description="We source, aggregate, process, package, and prepare agricultural commodities for local and international markets."
        />

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
                Our product portfolio
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl">
                Commodities with global potential
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600">
                Our portfolio covers a range of agricultural and natural
                products selected for their commercial value and demand across
                international markets.
              </p>
            </div>

            <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <article
                  key={product.number}
                  className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Placeholder product image */}
                  <div
                    className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${product.color}`}
                  >
                    <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />

                    <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/10 text-xs font-semibold text-white backdrop-blur-sm">
                      {product.number}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-black tracking-[-0.08em] text-white/20 transition-transform duration-700 group-hover:scale-125">
                        {product.accent}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5">
                      <span className="rounded-full border border-white/20 bg-black/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                        Placeholder
                      </span>
                    </div>
                  </div>

                  <div className="p-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b78628]">
                      {product.botanical}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold text-[#173f2b]">
                      {product.name}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {product.description}
                    </p>

                    <div className="mt-6 border-t border-black/5 pt-5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#173f2b] transition-colors group-hover:text-[#b78628]">
                        International Supply →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Supply chain section */}
        <section className="bg-[#f5f2e9] py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
                  Beyond sourcing
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl">
                  From origin to destination.
                </h2>

                <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
                  Our role extends beyond simply sourcing commodities. We work
                  across the supply chain to support quality control,
                  aggregation, processing, packaging, documentation, logistics,
                  and export readiness.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["01", "Sourcing", "Working with farmers, cooperatives, and trusted suppliers."],
                  ["02", "Quality", "Selection, grading, handling, and quality control."],
                  ["03", "Processing", "Value addition, preservation, and packaging."],
                  ["04", "Export", "Documentation, logistics, and international delivery."],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <span className="text-xs font-bold text-[#b78628]">
                      {number}
                    </span>

                    <h3 className="mt-5 font-semibold text-[#173f2b]">
                      {title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#173f2b] py-24 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6b45c]">
              Looking for a supplier?
            </p>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s discuss your commodity requirements.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65">
              Tell us what product, quantity, quality specification, and
              destination you require. Our team can discuss the appropriate
              supply and export solution.
            </p>

            <Link
              href={`/request-quote?product=${products}`}
              className="mt-9 inline-flex rounded-full bg-[#d6b45c] px-7 py-4 text-sm font-semibold text-[#173f2b] transition-all hover:-translate-y-1 hover:bg-white"
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}