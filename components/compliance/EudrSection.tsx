import type { EudrMilestone, EudrStat } from "@/content/compliance/types";
import { EUDR_STATUS } from "./compliance-config";

type EudrSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  stats?: EudrStat[];
  roadmapTitle?: string;
  milestones: EudrMilestone[];
};

export function EudrSection({
  eyebrow,
  title,
  description,
  stats = [],
  roadmapTitle,
  milestones,
}: EudrSectionProps) {
  return (
    <section
      id="eudr"
      className="border-t-2 border-gold-500 bg-forest-900 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          {eyebrow && (
            <span className="mb-5 inline-block rounded bg-gold-500 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.1em] text-forest-950">
              {eyebrow}
            </span>
          )}

          {title && (
            <h2 className="mb-5 max-w-3xl font-serif text-display-md text-ivory-100 lg:text-display-lg">
              {title}
            </h2>
          )}

          {description && (
            <p className="max-w-2xl text-sm leading-relaxed text-ivory-100/55">
              {description}
            </p>
          )}
        </header>

        {stats.length > 0 && (
          <div className="mb-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={`${stat.value}-${stat.label}`}
                className="rounded-xl border border-gold-500/15 bg-forest-800 p-5"
              >
                <div className="mb-2 font-mono text-2xl text-gold-500">
                  {stat.value}
                </div>

                <div className="text-[11px] leading-relaxed text-ivory-100/45">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {roadmapTitle && (
          <h3 className="mb-8 text-[9px] font-medium uppercase tracking-[0.12em] text-ivory-100/40">
            {roadmapTitle}
          </h3>
        )}

        <div>
          {milestones.map((milestone, index) => {
            const status =
              EUDR_STATUS[milestone.status];

            return (
              <div
                key={milestone._id}
                className="grid grid-cols-[100px_1fr] gap-0"
              >
                <div className="relative flex flex-col items-end border-r border-gold-500/20 pb-10 pr-6">
                  <span className="font-mono text-[11px] font-medium text-ivory-100/60">
                    {milestone.year}
                  </span>

                  {milestone.quarter && (
                    <span className="font-mono text-[10px] text-ivory-100/35">
                      {milestone.quarter}
                    </span>
                  )}

                  <div
                    className={`absolute right-[-6px] top-1 h-3 w-3 rounded-full border-2 border-forest-900 ${status.dot}`}
                  />
                </div>

                <div
                  className={`pl-8 ${
                    index < milestones.length - 1
                      ? "pb-10"
                      : "pb-0"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <h4 className="text-[13px] font-medium text-ivory-100">
                      {milestone.title}
                    </h4>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${status.badge}`}
                    >
                      {milestone.status}
                    </span>
                  </div>

                  {milestone.description && (
                    <p className="text-[12px] leading-relaxed text-ivory-100/50">
                      {milestone.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
