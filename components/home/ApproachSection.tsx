import Link from "next/link";
import type { HomeApproach } from "@/content/home/types";

type ApproachSectionProps = {
  approaches: HomeApproach[];
};

export function ApproachSection({
  approaches,
}: ApproachSectionProps) {
  return (
    <section className="supply section">
      <div className="supply-content">
        <div className="section-label">
          04 — OUR APPROACH
        </div>

        <h2>
          Connecting <br />
          <span>origin to destination.</span>
        </h2>

        <p>
          We believe global agricultural trade
          starts with strong local relationships.
          Our approach combines responsible sourcing,
          quality-focused operations and
          international market access.
        </p>
      </div>

      <div className="supply-path">
        {approaches.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            className="path-step"
          >
            <span>{item.number}</span>

            <strong>{item.title}</strong>

            {index < approaches.length - 1 && (
              <i>→</i>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
