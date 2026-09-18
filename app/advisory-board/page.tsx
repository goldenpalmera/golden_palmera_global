import type { Metadata } from "next";
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

  return (
    <main className="bg-[#f7f6f1] text-[#182018]">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-24 pt-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-[#a07a3d]">
              {page.heroEyebrow}
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              {page.heroTitle}
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5d655d] md:text-xl">
              {page.heroDescription}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#d7c49a]/20 blur-3xl" />
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
                className="group overflow-hidden rounded-xl border border-gold-500/12 bg-muted transition-all duration-250 hover:-translate-y-1 hover:border-gold-500/40"
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
                    <span className="absolute bottom-3 right-3 rounded bg-forest-950/75 px-2 py-1 text-[9px] tracking-wide text-ivory-100/60 backdrop-blur-sm">
                      {member.country}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="mb-0.5 text-[15px] font-medium text-ivory-100">
                    {member.name}
                  </h3>

                  <p className="mb-1 text-[11px] font-medium text-gold-500">
                    {member.role}
                  </p>

                  {member.specialisation && (
                    <p className="mb-4 font-mono text-[10px] tracking-wide text-ivory-100/35">
                      {member.specialisation}
                    </p>
                  )}

                  {member.bio && (
                    <p className="mb-4 text-[12px] leading-relaxed text-ivory-100/55">
                      {member.bio}
                    </p>
                  )}

                  {member?.credentials?.length ? (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {member.credentials.map((credential) => (
                        <span
                          key={credential}
                          className="rounded border border-gold-500/15 bg-forest-800 px-2 py-0.5 text-[9px] text-ivory-100/50"
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
                      className="inline-flex items-center gap-1.5 text-[11px] text-ivory-100/35 transition-colors hover:text-gold-500"
                    >
                      <LinkedInIcon />
                      LinkedIn Profile
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
