import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { getProducts } from "@/content/products/getProducts";
import { getProductsPage } from "@/content/products/getProductsPage";
import { mapProductsPage } from "@/content/products/sanity"
import { getProductsPageMetadata } from "@/content/products/metadata";
import { ProductCard } from "@/components/products/ProductCard";

export async function generateMetadata(): Promise<Metadata> {
  return getProductsPageMetadata();
}

export default async function ProductsPage() {
  const [products, rawPage] = await Promise.all([
    getProducts(),
    getProductsPage(),
  ])

  const page = mapProductsPage(rawPage);
  
  return (
    <>
      <main>
        <PageHero
          eyebrow={ page.hero.eyebrow }
          title={ page.hero.title }
          description={ page.hero.description }
        />

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
                { page.portfolio.eyebrow }
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl">
                { page.portfolio.title }
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600">
                { page.portfolio.description }
              </p>
            </div>

            <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={index}
                />
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
                  {page.supplyChain.eyebrow}
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl">
                  {page.supplyChain.title}
                  
                </h2>

                <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
                  {page.supplyChain.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {page.supplyChain.steps.map((step) => (
                  <div
                    key={step.number}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <span className="text-xs font-bold text-[#b78628]">
                      {step.number}
                    </span>

                    <h3 className="mt-5 font-semibold text-[#173f2b]">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.description}
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
              {page.cta.title}
            </p>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {page.cta.description}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65">
              Tell us what product, quantity, quality specification, and
              destination you require. Our team can discuss the appropriate
              supply and export solution.
            </p>

            <Link
              href={page.cta.link}
              className="mt-9 inline-flex rounded-full bg-[#d6b45c] px-7 py-4 text-sm font-semibold text-[#173f2b] transition-all hover:-translate-y-1 hover:bg-white"
            >
              {page.cta.label}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}