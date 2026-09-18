import Link from "next/link";

import type { Product } from "@/content/products/types";

type Props = {
  product: Product;
};

export function ProductCTA({ product }: Props) {
  return (
    <section className="bg-[#173f2b] py-24 text-white lg:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6b45c]">
          Ready to source?
        </p>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Let&apos;s discuss your {product.name} requirements.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65">
          Tell us your required quantity, specification, packaging and
          destination. Our team can discuss the appropriate supply and
          export solution.
        </p>

        <Link
          href={`/quote/request-quote?product=${product.slug}`}
          className="mt-9 inline-flex rounded-full bg-[#d6b45c] px-7 py-4 text-sm font-semibold text-[#173f2b] transition-all hover:-translate-y-1 hover:bg-white"
        >
          Request a Quote
        </Link>
      </div>
    </section>
  );
}
