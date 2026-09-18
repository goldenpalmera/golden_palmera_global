import type { Product } from "@/content/products/types";

type Props = {
  product: Product;
};

export function ProductDetails({ product }: Props) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
              Product overview
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl">
              About {product.name}
            </h2>

            {product.shortDescription && (
              <p className="mt-7 text-base leading-8 text-slate-600">
                {product.shortDescription}
              </p>
            )}
          </div>

          <div className="rounded-3xl bg-[#f5f2e9] p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
              Specifications
            </p>

            <div className="mt-8 divide-y divide-black/10">
              {product.origin && (
                <Specification
                  label="Origin"
                  value={product.origin}
                />
              )}

              {product.processing && (
                <Specification
                  label="Processing"
                  value={product.processing}
                />
              )}

              {product.grade && (
                <Specification
                  label="Grade"
                  value={product.grade}
                />
              )}

              {product.minimumOrder && (
                <Specification
                  label="Minimum Order"
                  value={product.minimumOrder}
                />
              )}

              {product.availability && (
                <Specification
                  label="Availability"
                  value={product.availability}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Specification({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-5">
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/40">
        {label}
      </span>

      <span className="max-w-[60%] text-right text-sm leading-6 text-[#173f2b]">
        {value}
      </span>
    </div>
  );
}
