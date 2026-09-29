export function TrustBadges({
  badges,
}: {
  badges?: string[];
}) {
  if (!badges || !badges.length) {
    return null;
  }

  return (
    <div
      className="flex flex-wrap items-center gap-x-4 gap-y-2"
      aria-label="Trust and compliance"
    >
      {badges.map((badge, index) => (
        <span key={`${badge}-${index}`}>
          {badge}
        </span>
      ))}
    </div>
  );
}