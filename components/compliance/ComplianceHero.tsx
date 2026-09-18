type ComplianceHeroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function ComplianceHero({
  eyebrow,
  title,
  description,
}: ComplianceHeroProps) {
  return (
    <section className="bg-forest-900 px-6 pb-28 pt-32 text-ivory-100 md:px-12 lg:px-20 lg:pb-36">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          {eyebrow && (
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-[#a07a3d]">
              {eyebrow}
            </p>
          )}

          {title && (
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              {title}
            </h1>
          )}

          {description && (
            <p className="mt-8 max-w-3xl text-lg leading-8 text-ivory-100/60 md:text-xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
