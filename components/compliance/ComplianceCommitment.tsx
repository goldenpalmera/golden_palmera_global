type ComplianceCommitmentProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
};

export function ComplianceCommitment({
  eyebrow,
  title,
  text,
}: ComplianceCommitmentProps) {
  return (
    <section className="bg-[#182018] px-6 py-28 text-white md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-sm uppercase tracking-[0.25em] text-[#d2b477]">
              {eyebrow}
            </p>
          )}

          {title && (
            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              {title}
            </h2>
          )}

          {text && (
            <p className="mt-8 text-lg leading-8 text-white/65">
              {text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
