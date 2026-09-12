import type { GithubProfile, GithubRepo } from "@/types/github";

const REST_BASE = "https://api.github.com";

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getProfile(username: string): Promise<GithubProfile> {
  const res = await fetch(`${REST_BASE}/users/${username}`, {
    headers: authHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to load GitHub profile (${res.status})`);
  }

  return res.json();
}

export async function getRepos(
  username: string,
  { includeForks = false }: { includeForks?: boolean } = {}
): Promise<GithubRepo[]> {
  const res = await fetch(
    `${REST_BASE}/users/${username}/repos?per_page=100&sort=updated`,
    {
      headers: authHeaders(),
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to load GitHub repos (${res.status})`);
  }

  const repos: GithubRepo[] = await res.json();
  return includeForks ? repos : repos.filter((repo) => !repo.fork);
}
