type Props = {
  eyebrow?: string;
  description?: string;
};

export function ServicesIntro({
  eyebrow,
  description,
}: Props) {
  return (
    <section className="px-6 py-20 md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
            {eyebrow || "What we do"}
          </p>
        </div>

        <div className="md:pt-1">
          <p className="max-w-3xl text-xl font-medium leading-[1.35] tracking-[-0.01em] text-[#171717] md:text-2xl lg:text-3xl">
            {description ||
              "Golden Palmera Global provides an integrated platform for sourcing, processing and exporting agricultural commodities from Africa to markets around the world."}
          </p>
        </div>
      </div>
    </section>
  );
}
