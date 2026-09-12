import type { GithubRepo } from "@/types/github";

export default function TopRepos({ repos }: { repos: GithubRepo[] }) {
  if (repos.length === 0) {
    return <p className="text-sm text-zinc-500">No repositories to show.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-brand/50"
        >
          <span className="font-semibold text-zinc-50">{repo.name}</span>
          <p className="line-clamp-2 text-sm text-zinc-400">
            {repo.description ?? "No description provided."}
          </p>
          <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-zinc-500">
            {repo.language && <span>{repo.language}</span>}
            <span>★ {repo.stargazers_count}</span>
            <span>⑂ {repo.forks_count}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
