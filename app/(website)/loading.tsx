import { BrandSeal } from "@/components/sharedComponents/BrandSeal";

export default function Loading() {
  return (
    <main
      className="gpg-system-page"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="gpg-system-content">
        <div className="gpg-system-seal">
          <BrandSeal
            size="md"
            spin
            ripple
            showLabel
          />
        </div>

        <p className="gpg-system-message">
          Loading...
        </p>
      </div>
    </main>
  );
}