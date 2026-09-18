import { Download } from "lucide-react";

type Stat = {
  value: string;
  label: string;
};

type AboutStatsProps = {
  stats?: Stat[];
};

const FALLBACK_STATS: Stat[] = [
  {
    value: "14",
    label: "Export markets",
  },
  {
    value: "8",
    label: "Active commodity lines",
  },
  {
    value: "40K MT",
    label: "Annual processing capacity",
  },
  {
    value: "200+",
    label: "Producer & cooperative partners",
  },
  {
    value: "100%",
    label: "Pre-shipment inspection",
  },
  {
    value: "48hr",
    label: "Target RFQ response",
  },
];

export default function AboutStats({
  stats,
}: AboutStatsProps) {
  const items = stats?.length ? stats : FALLBACK_STATS;

  return (
    <section className="border-t border-[#173f2b]/10 bg-[#f8f6f0] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b78628]">
              Company at a glance
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#173f2b] sm:text-4xl lg:text-5xl">
              A disciplined operating model built for international trade.
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#173f2b]/60 sm:text-base">
              From origin to destination, we coordinate the critical
              stages of the commodity trade — sourcing, quality control,
              processing, documentation, and logistics.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#173f2b]/60 sm:text-base">
              Our model is designed to give buyers greater visibility,
              dependable specifications, and confidence in every shipment.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl bg-[#173f2b] shadow-sm">
            <div className="divide-y divide-[#b7924a]/10">
              {items.map((stat) => (
                <div
                  key={`${stat.value}-${stat.label}`}
                  className="flex items-center justify-between gap-6 px-5 py-4"
                >
                  <span className="text-[12px] leading-5 text-[#f8f6f0]/55">
                    {stat.label}
                  </span>

                  <span className="shrink-0 font-mono text-lg text-[#b7924a]">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#b7924a]/15 px-5 py-4">
              <a
                href="/company-profile.pdf"
                download
                className="inline-flex items-center gap-2 text-[11px] font-medium text-[#b7924a] transition-colors hover:text-[#d6b45c]"
              >
                <Download size={13} />
                Download Company Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
