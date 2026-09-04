type ContactStatsData = {
  new: number;
  read: number;
  replied: number;
  resolved: number;
  archived: number;
  total: number;
};

export default function ContactStats({
  stats,
}: {
  stats: ContactStatsData;
}) {
  const items = [
    {
      label: "Total",
      value: stats.total,
      color: "text-zinc-950",
      bg: "bg-zinc-50",
    },
    {
      label: "New",
      value: stats.new,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      label: "Read",
      value: stats.read,
      color: "text-zinc-700",
      bg: "bg-zinc-50",
    },
    {
      label: "Replied",
      value: stats.replied,
      color: "text-violet-700",
      bg: "bg-violet-50",
    },
    {
      label: "Resolved",
      value: stats.resolved,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
    },
    {
      label: "Archived",
      value: stats.archived,
      color: "text-zinc-500",
      bg: "bg-zinc-50",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
              {item.label}
            </p>

            <span
              className={`h-2 w-2 rounded-full ${item.bg}`}
            />
          </div>

          <p
            className={`mt-3 text-2xl font-semibold tracking-[-0.03em] ${item.color}`}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
