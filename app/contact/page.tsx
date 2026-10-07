import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import { getContactPage } from "@/content/contact/getContactPage";
import { getHeroImageUrl } from "@/content/shared/getHeroImageUrl";
import { mapContactPage } from "@/content/contact/mappers";
import { getContactMetadata } from "@/content/contact/metadata";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const sanityPage = await getContactPage();
  const page = mapContactPage(sanityPage);

  return getContactMetadata(page.seo);
}

export default async function ContactPage() {
  const sanityPage = await getContactPage();
  const page = mapContactPage(sanityPage)

  const heroImageUrl = getHeroImageUrl(
    page?.heroImage ?? null,
    1920,
    1080,
  );

  return (
    <main className="bg-[#f8f6f0] text-[#171717]">
      <ContactHero 
        eyebrow={ page?.heroEyebrow }
        titleLine1={ page?.heroTitleLine1 }
        titleLine2={ page?.heroTitleLine2 }
        image={heroImageUrl}
      />

      <section className="px-6 py-24 md:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
              { page?.contactInfoEyebrow }
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                  {page?.emailLabel}
                </p>

                {page?.email && (
                  <a
                    href={`mailto:${page.email}`}
                    className="mt-2 block text-lg transition-colors hover:text-[#8c6d35]"
                  >
                    { page.email }
                  </a>
                )}
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                  {page?.locationLabel}
                </p>

                <p className="mt-2 text-lg">
                  { page?.location }
                  <br />
                  { page?.region }
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                  { page?.businessLabel }
                </p>

                <p className="mt-2 max-w-xs text-sm leading-6 text-black/55">
                  { page?.businessDescription }
                </p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="bg-[#b7924a] px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            {page?.bottomEyebrow }
          </p>

          <div className="mt-8 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <h2 className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">
              { page?.bottomTitleLine1 }
              <br />
              { page?.bottomTitleLine2 }
            </h2>
            
            {page?.bottomLinkUrl && (
              <Link
                href={ page.bottomLinkUrl }
                className="group shrink-0 text-xs uppercase tracking-[0.2em]"
              >
                { page.bottomLinkText }
                <span className="ml-4 inline-block transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}