import type { TeamMember } from "@/content/about/types";
import { SanityImg } from "../sharedComponents/SanityImg";

type FeaturedQuoteProps = {
  member: TeamMember;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function FeaturedQuote({
  member,
}: FeaturedQuoteProps) {
  if (!member.quote) {
    return null;
  }

  return (
    <section className="border-t border-[#b7924a]/10 bg-[#173f2b] py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-[64px_1fr] sm:gap-10">
          {/* Portrait */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#b7924a] bg-[#122f21]">
            {member.image ? (
              <SanityImg
                image={member.image}
                alt={member.name}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-serif text-xl text-[#b7924a]">
                {getInitials(member.name)}
              </span>
            )}
          </div>

          {/* Quote */}
          <div className="max-w-3xl">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b7924a]/70">
              From our leadership
            </p>

            <blockquote className="font-serif text-xl italic leading-relaxed text-[#f8f6f0] sm:text-2xl lg:text-3xl">
              &ldquo;{member.quote}&rdquo;
            </blockquote>

            <div className="mt-7">
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b7924a]">
                {member.name}
              </div>

              <div className="mt-1 text-[10px] text-[#f8f6f0]/45">
                {member.role}, Golden Palmera Global Limited
              </div>

              {member.credentials?.length ? (
                <div className="mt-1 text-[10px] text-[#f8f6f0]/30">
                  {member.credentials.join(" · ")}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
