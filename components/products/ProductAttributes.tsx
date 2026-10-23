import type { Product } from "@/content/products/types";

type Props = {
  product: Product;
};

export function ProductAttributes({ product }: Props) {
  const attributes = [
    {
      title: "Available Forms",
      items: product.forms,
    },
    {
      title: "Packaging",
      items: product.packaging,
    },
    {
      title: "Applications",
      items: product.applications,
    },
    {
      title: "Certifications",
      items: product.certifications,
    },
  ].filter(
    (
      attribute,
    ): attribute is {
      title: string;
      items: string[];
    } => Boolean(attribute.items?.length),
  );

  if (!attributes.length) {
    return null;
  }

  return (
    <section className="bg-[#f5f2e9] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {attributes.map((attribute) => (
            <div
              key={attribute.title}
              className="rounded-3xl bg-white p-7 shadow-sm"
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#b78628]">
                {attribute.title}
              </h3>

              <ul className="mt-6 space-y-3">
                {attribute.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-slate-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#173f2b]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
