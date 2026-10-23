import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="border-t border-[#b7924a]/10 bg-[#122f21] py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <h2 className="font-serif text-xl text-[#f8f6f0]">
            Download our Company Profile
          </h2>

          <p className="mt-1 max-w-2xl text-sm text-[#f8f6f0]/50">
            Our company profile provides an overview of our
            commodities, certifications, team, and export
            capabilities.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="/company-profile.pdf"
            download
            className="inline-flex items-center gap-2 rounded bg-[#b7924a] px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.05em] text-[#122f21] transition-colors hover:bg-[#d6b45c]"
          >
            <Download size={14} />
            Company Profile PDF
          </a>

          <Link
            href="/advisory-board"
            className="inline-flex items-center gap-2 rounded border border-white/20 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.05em] text-white transition-colors hover:border-white/40"
          >
            Advisory Board
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
