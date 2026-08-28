import type { Metadata } from "next";
import InquiryForm from "@/components/inquiry/InquiryForm";

export const metadata: Metadata = {
  title:
    "Partnership Inquiry | Golden Palmera Global",
  description:
    "Discuss partnership opportunities with Golden Palmera Global.",
};

export default function PartnershipPage() {
  return (
    <main className="bg-[#f8f6f0] text-[#171717]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#173f2b] px-6 py-24 text-white md:px-10 lg:px-16 lg:py-14">
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute left-[20%] top-0 h-full w-px bg-white" />
          <div className="absolute left-[50%] top-0 h-full w-px bg-white" />
          <div className="absolute left-[80%] top-0 h-full w-px bg-white" />
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">
              Golden Palmera Global
            </p>

            <span className="font-mono text-xs text-[#d6b45c]">
              PARTNERSHIP / 01
            </span>
          </div>

          <div className="mt-10 max-w-6xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#d6b45c]">
              Strategic partnerships
            </p>

            <h1 className="mt-7 text-[clamp(4rem,9vw,8.5rem)] font-medium leading-[0.85] tracking-[-0.07em]">
              Let&apos;s build
              <br />
              <span className="text-white/35">
                something together.
              </span>
            </h1>

            <p className="mt-10 max-w-2xl text-lg leading-8 text-white/60 md:text-xl">
              We believe the strongest businesses are
              built through the right relationships.
              Tell us where you see an opportunity to
              work together.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership section */}
      <section className="px-6 py-24 md:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* Left content */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
              Work with us
            </p>

            <h2 className="mt-6 max-w-xl text-4xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl">
              Good partnerships
              <br />
              create lasting value.
            </h2>

            <p className="mt-8 max-w-lg text-sm leading-7 text-black/55">
              Golden Palmera Global works across
              agricultural sourcing, processing,
              export and international trade. We are
              open to relationships that strengthen
              our supply chain, expand market access
              and create long-term commercial value.
            </p>

            <div className="mt-12 border-t border-black/10 pt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                Potential partnerships
              </p>

              <div className="mt-6 space-y-4">
                <PartnerPoint>
                  Supply & sourcing relationships
                </PartnerPoint>

                <PartnerPoint>
                  International distribution
                </PartnerPoint>

                <PartnerPoint>
                  Strategic commercial partnerships
                </PartnerPoint>

                <PartnerPoint>
                  Processing & value addition
                </PartnerPoint>

                <PartnerPoint>
                  Market development
                </PartnerPoint>
              </div>
            </div>

            <div className="mt-12 border-l-2 border-[#b7924a] pl-5">
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                What happens next
              </p>

              <p className="mt-4 text-sm leading-7 text-black/55">
                Share a little about your organization
                and the opportunity. Our team will
                review your proposal and get back to
                you directly.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.04)] sm:p-10 lg:p-12">
            <div className="mb-10 border-b border-black/10 pb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
                Start the conversation
              </p>

              <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] md:text-4xl">
                Tell us about
                <br />
                your opportunity.
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-black/50">
                Give us enough information to
                understand your organization,
                objectives and how we might work
                together.
              </p>
            </div>

            <InquiryForm type="partnership" />
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="bg-[#b7924a] px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            Long-term thinking
          </p>

          <h2 className="mt-8 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">
            Built on relationships.
            <br />
            Driven by opportunity.
          </h2>
        </div>
      </section>
    </main>
  );
}

function PartnerPoint({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 text-sm text-black/65">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#b7924a]/40 text-xs text-[#8c6d35]">
        +
      </span>

      <span>{children}</span>
    </div>
  );
}