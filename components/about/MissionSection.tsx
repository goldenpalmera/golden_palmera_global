type MissionSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function MissionSection({
  eyebrow,
  title,
  description,
}: MissionSectionProps) {
  return (
    <section className="bg-[#173f2b] py-24 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6b45c]">
          {eyebrow}
        </p>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65">
          {description}
        </p>
      </div>
    </section>
  );
}
