import type {
  StoryPrincipleProps,
  OurStorySectionProps,
} from "@/content/about/types";

export default function OurStorySection({
  eyebrow,
  title,
  paragraphs,
  facts,
  principles,
}: OurStorySectionProps) {
  return (
    <section className="bg-[#f8f6f0] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* Story */}
          <div>
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
                {eyebrow}
              </p>

              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl">
                {title}
              </h2>
            </div>

            {paragraphs && paragraphs.length > 0 && (
              <div className="max-w-3xl space-y-5 text-sm leading-7 text-[#173f2b]/70">
                {paragraphs.map((paragraph, index) => (
                  <p key={`${paragraph.slice(0, 30)}-${index}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {facts && facts.length > 0 && (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {facts.map((fact, index) => (
                  <div
                    key={`${fact.value}-${index}`}
                    className="border-l-2 border-[#b7924a] pl-4"
                  >
                    <div className="mb-1 font-mono text-2xl text-[#173f2b]">
                      {fact.value}
                    </div>

                    <div className="text-[11px] leading-5 text-[#173f2b]/50">
                      {fact.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Visual anchor */}
          {principles && principles.length > 0 && (
            <div className="rounded-xl bg-[#173f2b] p-8 text-[#f8f6f0]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#b7924a]">
                Our approach
              </p>

              <div className="mt-10 space-y-8">
                {principles.map((principle, index) => (
                  <StoryPrinciple
                    key={`${principle.number}-${index}`}
                    number={principle.number}
                    title={principle.title}
                    description={principle.description}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StoryPrinciple({
  number,
  title,
  description,
}: StoryPrincipleProps) {
  return (
    <div className="border-t border-white/10 pt-6">
      <div className="flex items-start gap-4">
        <span className="font-mono text-xs text-[#b7924a]">
          {number}
        </span>

        <div>
          <h3 className="text-sm font-medium">
            {title}
          </h3>

          <p className="mt-2 text-xs leading-6 text-white/45">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
