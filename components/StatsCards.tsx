interface StatsCardsProps {
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguage: string | null;
}

export default function StatsCards({
  publicRepos,
  totalStars,
  totalForks,
  topLanguage,
}: StatsCardsProps) {
  const stats = [
    { label: "Public Repos", value: publicRepos },
    { label: "Total Stars", value: totalStars },
    { label: "Total Forks", value: totalForks },
    { label: "Top Language", value: topLanguage ?? "—" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center"
        >
          <div className="text-2xl font-bold text-zinc-50">{stat.value}</div>
          <div className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
