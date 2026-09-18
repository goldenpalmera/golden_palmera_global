import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow, heading, subheading, centered, light, className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 lg:mb-14", centered && "text-center", className)}>
      {eyebrow && (
        <p className="text-gold-500 text-[9px] tracking-[0.14em] uppercase font-medium mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-display-md lg:text-display-lg",
          light ? "text-ivory-100" : "text-forest-800"
        )}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={cn(
            "mt-4 text-sm leading-relaxed max-w-xl",
            centered && "mx-auto",
            light ? "text-ivory-100/60" : "text-forest-800/60"
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="flex-1 h-px bg-gold-500/20" />
      <div className="w-1.5 h-1.5 bg-gold-500 rotate-45" />
      <div className="flex-1 h-px bg-gold-500/20" />
    </div>
  );
}