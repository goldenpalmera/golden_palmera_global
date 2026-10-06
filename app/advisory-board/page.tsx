import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LinkedInIcon from '@/components/sharedComponents/LinkedInIcon';
import { SanityImg } from "@/components/sharedComponents/SanityImg";
import { 
  SectionHeading,
  GoldDivider,
} from "@/components/sharedComponents/index";
import { mapAdvisoryBoardPage } from "@/content/advisory-board/mappers";
import {
  getAdvisoryBoardPage,
  getActiveMembers,
} from "@/content/advisory-board/sanity";
import { getAdvisoryBoardMetadata } from "@/content/advisory-board/metadata"
import { getHeroImageUrl } from "@/content/shared/getHeroImageUrl";

export async function generateMetadata(): Promise<Metadata> {
  return getAdvisoryBoardMetadata();
}

export default async function AdvisoryBoardPage() {
  const rawPage = await getAdvisoryBoardPage();

  const page = mapAdvisoryBoardPage(rawPage);

  const members = getActiveMembers(
    page.members
  );

  function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  }

  const heroImageUrl = getHeroImageUrl(
    page?.heroImage ?? null,
    1920,
    1080,
  );

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f7f6f1]">
        <div className="relative min-h-[680px]">

          {/* Desktop hero image */}
          {heroImageUrl && (
            <div
              className="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                hidden
                w-[52%]
                lg:block
              "
              style={{
                clipPath:
                  "polygon(38% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            >
              <Image
                src={heroImageUrl}
                alt=""
                fill
                priority
                sizes="52vw"
                className="object-cover"
              />

              {/* Image treatment */}
              <div className="absolute inset-0 bg-[#182018]/15" />

              {/* Fade into page */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#f7f6f1]/95 via-[#f7f6f1]/20 to-transparent" />

              {/* Subtle brand tone */}
              <div className="absolute inset-0 bg-[#173f2b]/10 mix-blend-multiply" />
            </div>
          )}

          {/* Content */}
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
            <div className="relative z-10 flex min-h-[680px] items-center">
              <div className="w-full max-w-3xl py-32 lg:w-[58%] lg:py-36">

                <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-[#a07a3d]">
                  {page.heroEyebrow}
                </p>

                <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-[#182018] md:text-7xl">
                  {page.heroTitle}
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5d655d] md:text-xl">
                  {page.heroDescription}
                </p>

              </div>
            </div>

            {/* Mobile hero image */}
            {heroImageUrl && (
              <div className="relative mx-0 mb-12 aspect-[16/9] overflow-hidden rounded-3xl lg:hidden">
                <Image
                  src={heroImageUrl}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#182018]/45 to-transparent" />
              </div>
            )}
          </div>

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#d7c49a]/20 blur-3xl" />

        </div>
      </section>

         {/* STATS */}
      <section className="border-b border-gold-500/10 bg-forest-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {page?.stats?.map((stat) => (
              <div key={stat.label}>
                <div className="font-mono text-2xl text-gold-500">
                  {stat.value}
                </div>

                <div className="mt-1 text-[11px] text-ivory-100/40">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOARD MEMBERS */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Board Members"
            heading="Our Advisory Panel"
            light
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <article
                key={member._id}
                className="
                  group overflow-hidden rounded-xl 
                  border border-[var(--border-light)]
                  bg-[var(--surface-light)]
                  text-[var(--text-light-primary)]
                  shadow-[0_8px_30px_rgba(24,32,24,0.06)]
                  transition-all duration-300
                  hover:border-[var(--accent-gold)]/50
                  hover:shadow-[0_14px_40px_rgba(24,32,24,0.10)]
                  hover:-translate-y-1 
                "
              >
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-forest-950">
                  {member.image ? (
                    <SanityImg
                      image={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0 opacity-5"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)",
                          backgroundSize: "20px 20px",
                        }}
                      />

                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold-500 bg-forest-800">
                        <span className="font-serif text-2xl text-gold-500">
                          {getInitials(member.name)}
                        </span>
                      </div>
                    </>
                  )}

                  {member.country && (
                    <span 
                      className="
                        absolute bottom-3 right-3 
                        rounded 
                        border border-white/10
                        bg-forest-950/75 
                        px-2 py-1 
                        text-[9px] 
                        font-medium
                        tracking-wide 
                        text-ivory-100/60 
                        backdrop-blur-sm
                      "
                    >
                      {member.country}
                    </span>
                  )}
                </div>

                {/**CARD CONTENT */}
                <div className="p-5">
                  <h3 className="mb-0.5 text-[15px] font-semibold leading-snug text-[var(--text-light-primary)]">
                    {member.name}
                  </h3>

                  <p className="mb-1 text-[11px] font-semibold text-[#a07a3d]">
                    {member.role}
                  </p>

                  {member.specialisation && (
                    <p className="mb-4 font-mono text-[10px] leading-relaxed tracking-wide text-[#657068]">
                      {member.specialisation}
                    </p>
                  )}

                  {member.bio && (
                    <p className="mb-4 text-[12px] leading-[1.75] text-[var(--text-light-secondary)]">
                      {member.bio}
                    </p>
                  )}

                  {member?.credentials?.length ? (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {member.credentials.map((credential) => (
                        <span
                          key={credential}
                          className="
                            rounded 
                            border border-[#c9a84c]/25 
                            bg-[#f5f0e8] 
                            px-2 py-1 
                            text-[9px] 
                            font-medium
                            text-[#526058]
                          "
                        >
                          {credential}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex 
                        items-center 
                        gap-1.5 
                        text-[11px] 
                        font-medium
                        text-[#526058]
                        transition-colors 
                        hover:text-[#a07a3d]
                        focus-visible:text-[#a07a3d]
                      "
                    >
                      <LinkedInIcon />
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {page.cta && (
        <section className="border-t border-gold-500/10 bg-forest-900 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <GoldDivider className="mb-10" />

            <p className="mb-4 font-serif text-xl text-ivory-100">
              {page.cta.title}
            </p>

            <p className="mb-8 text-sm text-ivory-100/50">
              {page.cta.description}
            </p>

            {page.cta.link && (
              <Link
                href={page.cta.link.href}
                className="inline-flex items-center gap-2 rounded bg-gold-500 px-7 py-4 text-[11px] font-medium uppercase tracking-[0.06em] text-forest-950 transition-colors hover:bg-gold-400"
              >
                {page.cta.label}
              </Link>
            )}
          </div>
        </section>
      )}

      {/* PHILOSOPHY */}
      <section className="bg-[#182018] px-6 py-28 text-white md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#d2b477]">
              {page.philosophyEyebrow}
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              {page.philosophyTitle}
            </h2>
          </div>

          <div className="text-lg leading-8 text-white/65">
            {page.philosophyParagraphs?.map((paragraph, index) => (
              <p
                key={`${paragraph}-${index}`}
                className={index > 0 ? "mt-6" : undefined}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
