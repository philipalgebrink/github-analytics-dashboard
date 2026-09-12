import { getProfile, getRepos } from "@/lib/github";
import { getContributionCalendar } from "@/lib/githubGraphql";
import { GITHUB_USERNAME } from "@/lib/constants";
import ProfileHeader from "@/components/ProfileHeader";
import StatsCards from "@/components/StatsCards";
import LanguageChart from "@/components/LanguageChart";
import TopRepos from "@/components/TopRepos";
import ContributionHeatmap from "@/components/ContributionHeatmap";
import Footer from "@/components/Footer";
import type { GithubProfile, GithubRepo, ContributionDay, LanguageSlice } from "@/types/github";

function SectionError({ message }: { message: string }) {
  return (
    <p className="rounded-lg border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-400">
      {message}
    </p>
  );
}

function aggregateLanguages(repos: GithubRepo[]): LanguageSlice[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export default async function Home() {
  let profile: GithubProfile | null = null;
  let profileError: string | null = null;
  try {
    profile = await getProfile(GITHUB_USERNAME);
  } catch (err) {
    profileError = err instanceof Error ? err.message : "Failed to load profile";
  }

  let repos: GithubRepo[] = [];
  let reposError: string | null = null;
  try {
    repos = await getRepos(GITHUB_USERNAME);
  } catch (err) {
    reposError = err instanceof Error ? err.message : "Failed to load repositories";
  }

  let contributionDays: ContributionDay[] = [];
  let totalContributions = 0;
  let contributionsError: string | null = null;
  try {
    const result = await getContributionCalendar(GITHUB_USERNAME);
    contributionDays = result.days;
    totalContributions = result.totalContributions;
  } catch (err) {
    contributionsError =
      err instanceof Error ? err.message : "Failed to load contribution calendar";
  }

  const languages = aggregateLanguages(repos);
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const topLanguage = languages[0]?.name ?? null;
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-10 px-6 py-12">
      {profile && !profileError ? (
        <ProfileHeader profile={profile} />
      ) : (
        <SectionError message={profileError ?? "Profile unavailable."} />
      )}

      {!reposError ? (
        <StatsCards
          publicRepos={repos.length}
          totalStars={totalStars}
          totalForks={totalForks}
          topLanguage={topLanguage}
        />
      ) : (
        <SectionError message={reposError} />
      )}

      <section className="min-w-0">
        <h2 className="mb-4 text-lg font-semibold text-zinc-200">Contributions</h2>
        {!contributionsError ? (
          <ContributionHeatmap
            data={contributionDays}
            totalContributions={totalContributions}
          />
        ) : (
          <SectionError message={contributionsError} />
        )}
      </section>

      <section className="min-w-0">
        <h2 className="mb-4 text-lg font-semibold text-zinc-200">Languages</h2>
        {!reposError ? (
          <LanguageChart data={languages} />
        ) : (
          <SectionError message={reposError} />
        )}
      </section>

      <section className="min-w-0">
        <h2 className="mb-4 text-lg font-semibold text-zinc-200">Top Repositories</h2>
        {!reposError ? (
          <TopRepos repos={topRepos} />
        ) : (
          <SectionError message={reposError} />
        )}
      </section>

      <Footer />
    </div>
  );
}
