import type { TeamMember } from "@/content/about/types";
import { SanityImg } from "../sharedComponents/SanityImg";

type LeadershipSectionProps = {
  team: TeamMember[];
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function LeadershipSection({
  team,
}: LeadershipSectionProps) {
  if (!team.length) {
    return null;
  }

  return (
    <section className="border-t border-[#173f2b]/10 bg-[#f8f6f0] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
            Leadership
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl">
            The people behind every shipment.
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#173f2b]/60 sm:text-base">
            Our team brings together experience across agricultural
            sourcing, commodity trading, quality assurance, operations,
            and international logistics.
          </p>
        </div>

        {/* Leadership grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {team.map((member) => (
            <article
              key={member._id}
              className="group w-full max-w-[280px] overflow-hidden rounded-xl border border-[#173f2b]/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#b7924a]/30 hover:shadow-sm"
            >
              {/* Portrait */}
              <div className="relative flex aspect-[4/4.5] items-center justify-center overflow-hidden bg-[#173f2b]">
                {member.image ? (
                  <SanityImg
                    image={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(183,134,40,0.12),_transparent_55%)]" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#b78628]/70 bg-[#173f2b]">
                      <span className="font-serif text-2xl text-[#b78628]">
                        {getInitials(member.name)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-sm font-semibold text-[#173f2b]">
                  {member.name}
                </h3>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#b78628]">
                  {member.role}
                </p>

                {member.bio && (
                  <p className="mt-4 text-[11px] leading-5 text-[#173f2b]/60">
                    {member.bio}
                  </p>
                )}

                {member.credentials?.length ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {member.credentials.map((credential) => (
                      <span
                        key={credential}
                        className="rounded border border-[#173f2b]/10 bg-[#f8f6f0] px-2 py-1 text-[8px] font-medium text-[#173f2b]/60"
                      >
                        {credential}
                      </span>
                    ))}
                  </div>
                ) : null}

                {member.linkedIn ? (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex text-[10px] font-medium text-[#173f2b]/40 transition-colors hover:text-[#b78628]"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
