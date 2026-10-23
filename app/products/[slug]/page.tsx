import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getSanityClient } from "@/sanity/lib/client";
import {
  PRODUCT_QUERY,
  RELATED_PRODUCTS_QUERY,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { buildMetadata } from "@/sanity/lib/seo";
import { Metadata } from "next";

type Product = {
  _id: string;
  name: string;
  botanicalName?: string;
  slug?: string;
  category?: string;
  shortDescription?: string;
  description?: unknown[];
  image?: unknown;
  gallery?: unknown[];
  origin?: string;
  processing?: string;
  grade?: string;
  minimumOrder?: string;
  availability?: string;
  certifications?: string[];
  forms?: string[];
  packaging?: string[];
  applications?: string[];
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

type RelatedProduct = {
  _id: string;
  name: string;
  botanicalName?: string;
  slug?: string;
  shortDescription?: string;
  image?: unknown;
  featured?: boolean;
};

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getProduct(slug: string): Promise<Product | null> {
  const client = getSanityClient();

  return client.fetch(
    PRODUCT_QUERY,
    { slug },
    {
      next: {
        revalidate: 60,
        tags: [`product:${slug}`],
      },
    }
  );
}

async function getRelatedProducts(
  slug: string
): Promise<RelatedProduct[]> {
  const client = getSanityClient();

  return client.fetch(
    RELATED_PRODUCTS_QUERY,
    { slug },
    {
      next: {
        revalidate: 60,
        tags: ["products"],
      },
    }
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | Golden Palmera Global",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildMetadata({
    seo: {
      metaTitle: product.seoTitle,
      metaDescription: product.seoDescription,
    },
    fallbackTitle:
      `${product.name} | Golden Palmera Global`,
    fallbackDescription:
      product.shortDescription ||
      `Learn more about ${product.name} from Golden Palmera Global.`,
    canonical: `/products/${product.slug}`,
  });
}


export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const [product, relatedProducts] = await Promise.all([
    getProduct(slug),
    getRelatedProducts(slug),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main>
        {/* Product Hero */}
        <section className="bg-[#f5f2e9] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
              {/* Image */}
              <div className="relative overflow-hidden rounded-3xl bg-[#e8e3d5]">
                <div className="relative aspect-[4/3]">
                  {product.image ? (
                    <Image
                      src={urlFor(product.image)
                        .width(1200)
                        .height(900)
                        .fit("crop")
                        .auto("format")
                        .url()}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <ProductPlaceholder />
                  )}
                </div>

                {product.featured && (
                  <div className="absolute left-6 top-6">
                    <span className="rounded-full border border-white/20 bg-[#173f2b]/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Product information */}
              <div>
                {product.category && (
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
                    {formatCategory(product.category)}
                  </p>
                )}

                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#173f2b] sm:text-5xl lg:text-6xl">
                  {product.name}
                </h1>

                {product.botanicalName && (
                  <p className="mt-4 text-sm italic text-slate-500">
                    {product.botanicalName}
                  </p>
                )}

                {product.shortDescription && (
                  <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                    {product.shortDescription}
                  </p>
                )}

                <div className="mt-9 flex flex-wrap gap-3">
                  {product.origin && (
                    <ProductTag label="Origin" value={product.origin} />
                  )}

                  {product.availability && (
                    <ProductTag
                      label="Availability"
                      value={product.availability}
                    />
                  )}
                </div>

                <div className="mt-10">
                  <Link
                     href={`/quote/request-quote?product=${product.slug}`}
                    className="inline-flex rounded-full bg-[#173f2b] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#b78628]"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product details */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Description */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
                  Product overview
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl">
                  About {product.name}
                </h2>

                {product.description ? (
                  <div className="mt-7 space-y-5 text-base leading-8 text-slate-600">
                    {renderPortableText(product.description)}
                  </div>
                ) : product.shortDescription ? (
                  <p className="mt-7 text-base leading-8 text-slate-600">
                    {product.shortDescription}
                  </p>
                ) : null}
              </div>

              {/* Specifications */}
              <div>
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
          </div>
        </section>

        {/* Forms / Packaging / Applications */}
        {(product.forms?.length ||
          product.packaging?.length ||
          product.applications?.length ||
          product.certifications?.length) && (
          <section className="bg-[#f5f2e9] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {product.forms?.length ? (
                  <AttributeCard
                    title="Available Forms"
                    items={product.forms}
                  />
                ) : null}

                {product.packaging?.length ? (
                  <AttributeCard
                    title="Packaging"
                    items={product.packaging}
                  />
                ) : null}

                {product.applications?.length ? (
                  <AttributeCard
                    title="Applications"
                    items={product.applications}
                  />
                ) : null}

                {product.certifications?.length ? (
                  <AttributeCard
                    title="Certifications"
                    items={product.certifications}
                  />
                ) : null}
              </div>
            </div>
          </section>
        )}

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="bg-white py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex items-end justify-between gap-8 border-b border-black/5 pb-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
                    Continue exploring
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl">
                    You may also be interested in
                  </h2>
                </div>

                <Link
                  href="/products"
                  className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-[#173f2b] transition-colors hover:text-[#b78628] sm:block"
                >
                  View all products →
                </Link>
              </div>

              <div className="mt-12 grid gap-7 md:grid-cols-3">
                {relatedProducts.map((product) => (
                  <RelatedProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>

              <div className="mt-8 sm:hidden">
                <Link
                  href="/products"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[#173f2b]"
                >
                  View all products →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
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
      </main>

      <Footer />
    </>
  );
}

function RelatedProductCard({
  product,
}: {
  product: RelatedProduct;
}) {
  const imageUrl = product.image
    ? urlFor(product.image)
        .width(900)
        .height(675)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e3d5]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <ProductPlaceholder />
        )}

        <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />

        {product.featured && (
          <div className="absolute bottom-5 left-5">
            <span className="rounded-full border border-white/20 bg-[#173f2b]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-7">
        {product.botanicalName && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b78628]">
            {product.botanicalName}
          </p>
        )}

        <h3 className="mt-3 text-xl font-semibold text-[#173f2b]">
          {product.name}
        </h3>

        {product.shortDescription && (
          <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-600">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-6 border-t border-black/5 pt-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#173f2b] transition-colors group-hover:text-[#b78628]">
            Explore Product →
          </span>
        </div>
      </div>
    </Link>
  );
}

function ProductPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#173f2b] via-[#2d6347] to-[#b78628]">
      <span className="text-6xl font-black tracking-[-0.08em] text-white/20">
        GPG
      </span>
    </div>
  );
}

function ProductTag({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-full border border-[#173f2b]/10 bg-white px-4 py-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#b78628]">
        {label}
      </span>

      <span className="ml-2 text-xs text-[#173f2b]">
        {value}
      </span>
    </div>
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

function AttributeCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#b78628]">
        {title}
      </h3>

      <ul className="mt-6 space-y-3">
        {items.map((item) => (
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
  );
}

function formatCategory(category: string) {
  return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function renderPortableText(blocks: unknown[]) {
  return blocks.map((block, index) => {
    if (
      typeof block === "object" &&
      block !== null &&
      "children" in block &&
      Array.isArray(
        (block as { children?: unknown[] }).children
      )
    ) {
      const children = (
        block as {
          children: Array<{
            text?: string;
          }>;
        }
      ).children;

      return (
        <p key={index}>
          {children.map((child, childIndex) => (
            <span key={childIndex}>{child.text}</span>
          ))}
        </p>
      );
    }

    return null;
  });
}