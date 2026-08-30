"use client";

const stages = [
  {
    number: "01",
    title: "Source",
    text: "We work with farmers, cooperatives and trusted suppliers.",
  },
  {
    number: "02",
    title: "Aggregate",
    text: "Produce is coordinated and consolidated through reliable supply systems.",
  },
  {
    number: "03",
    title: "Process",
    text: "Commodities undergo appropriate processing, grading and preparation.",
  },
  {
    number: "04",
    title: "Quality",
    text: "Products are assessed against required quality and market standards.",
  },
  {
    number: "05",
    title: "Export",
    text: "Documentation, logistics and international trade requirements are coordinated.",
  },
  {
    number: "06",
    title: "Deliver",
    text: "Export-ready commodities move from origin to global markets.",
  },
];

export default function ServicesProcess() {
  return (
    <section className="bg-[#171717] px-6 py-24 text-white md:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#b7924a]">
              Our process
            </p>

            <h2 className="max-w-3xl text-5xl font-medium tracking-[-0.05em] md:text-7xl">
              From farm
              <br />
              to <span className="text-white/35">global market.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/45">
            An integrated approach designed to create consistency, quality and
            confidence across the agricultural supply chain.
          </p>
        </div>

        <div className="grid border-t border-white/10 md:grid-cols-3">
          {stages.map((stage) => (
            <div
              key={stage.number}
              className="group border-b border-white/10 p-7 transition-colors hover:bg-white/[0.03] md:border-r md:p-9"
            >
              <div className="mb-16 flex items-center justify-between">
                <span className="font-mono text-xs text-[#b7924a]">
                  {stage.number}
                </span>

                <span className="h-2 w-2 rounded-full bg-white/20 transition-colors group-hover:bg-[#b7924a]" />
              </div>

              <h3 className="text-3xl font-medium tracking-[-0.03em]">
                {stage.title}
              </h3>

              <p className="mt-4 max-w-xs text-sm leading-6 text-white/45">
                {stage.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}