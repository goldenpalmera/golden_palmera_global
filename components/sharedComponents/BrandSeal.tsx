import type { HTMLAttributes } from "react";

type BrandSealProps = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
  spin?: boolean;
  float?: boolean;
  ripple?: boolean;
  showLabel?: boolean;
};

const sizeClasses = {
  sm: "brand-seal--sm",
  md: "brand-seal--md",
  lg: "brand-seal--lg",
};

export function BrandSeal({
  size = "md",
  spin = false,
  float = false,
  ripple = false,
  showLabel = true,
  className = "",
  ...props
}: BrandSealProps) {
  return (
    <div
      role="img"
      aria-label="Golden Palmera Global"
      className={[
        "brand-seal",
        sizeClasses[size],
        spin ? "brand-seal--spin" : "",
        float ? "brand-seal--float" : "",
        ripple ? "brand-seal--ripple" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {ripple && (
        <div className="brand-seal__ripples" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}

      <div className="brand-seal__outer">
        {showLabel && (
          <>
            <span className="brand-seal__label brand-seal__label--top">
              AFRICA
            </span>

            <span className="brand-seal__label brand-seal__label--bottom">
              GLOBAL TRADE
            </span>
          </>
        )}

        <div className="brand-seal__inner">
          <span className="brand-seal__mark">GPG</span>
        </div>
      </div>
    </div>
  );
}