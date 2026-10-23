import QuoteForm from "@/components/quote/QuoteForm";

type RequestQuotePageProps = {
  searchParams: Promise<{
    product?: string;
  }>;
};

export const metadata = {
  title: "Request a Quote | Golden Palmera Global",
  description:
    "Request a quote for agricultural commodities and export products from Golden Palmera Global.",
};

export default async function RequestQuotePage({
  searchParams,
}: RequestQuotePageProps) {
  const params = await searchParams;

  const product = params.product
    ? params.product
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-950 px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-emerald-900/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Golden Palmera Global
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s discuss your{" "}
            <span className="text-emerald-400">requirements.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            Tell us what you need and our team will work with you to provide
            the right product, specifications, packaging and export solution.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <aside>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Request a Quote
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              Tell us about your order.
            </h2>

            <p className="mt-5 leading-7 text-zinc-600">
              Whether you are looking for a single commodity or a long-term
              supply partnership, share your requirements with us.
            </p>

            {product && (
              <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Product of Interest
                </p>

                <p className="mt-2 text-lg font-semibold text-zinc-900">
                  {product}
                </p>
              </div>
            )}

            <div className="mt-10 space-y-5">
              <Info
                title="Quality focused"
                text="We work with defined quality and specification requirements."
              />

              <Info
                title="Export ready"
                text="We support documentation, logistics and international trade requirements."
              />

              <Info
                title="Long-term partnerships"
                text="Our goal is to build dependable relationships across global markets."
              />
            </div>
          </aside>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          
          <QuoteForm product={product} />
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
        ✓
      </div>

      <div>
        <h3 className="font-semibold text-zinc-900">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-zinc-600">{text}</p>
      </div>
    </div>
  );
}