import Link from "next/link";

export function ServiceCTA() {
  return (
    <section className="relative overflow-hidden bg-[#b7924a] px-6 py-28 md:px-10 lg:px-16 lg:py-40">
      <div className="absolute right-[-10%] top-[-40%] h-[600px] w-[600px] rounded-full border border-black/10" />

      <div className="relative mx-auto max-w-[1400px]">
        <p className="mb-8 text-xs uppercase tracking-[0.3em] text-black/50">
          Let&apos;s work together
        </p>

        <h2 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
          Need this service
          <br />
          for your supply chain?
        </h2>

        <div className="mt-12">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-5 border-b border-black/40 pb-3 text-sm uppercase tracking-[0.2em]"
          >
            Start a conversation

            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
