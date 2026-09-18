import { Product } from "@/content/products/types";
import { ProductCard } from "@/components/products/ProductCard";

type CommoditiesSectionProps = {
  commodities: Product[];
};

export function CommoditiesSection({
  commodities,
}: CommoditiesSectionProps) {
  return (
    <section
      id="products"
      className="products section overflow-hidden"
    >
      {/* Section heading */}
      <div className="section-heading">
        <div className="section-label">
          02 — OUR COMMODITIES
        </div>

        <h2>
          Nature&apos;s resources.
          <br />
          Prepared for the world.
        </h2>
      </div>

      {commodities.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {commodities.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-3xl border border-[#ddd9cc] bg-white p-12 text-center">
          <p className="mx-auto max-w-xl leading-7 text-[#687068]">
            Our commodity portfolio is currently being updated.
          </p>
        </div>
      )}
    </section>
  );
}
