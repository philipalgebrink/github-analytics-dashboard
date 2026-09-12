import type { ContributionCalendar, ContributionDay } from "@/types/github";

const GRAPHQL_URL = "https://api.github.com/graphql";

const CONTRIBUTIONS_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

function levelFor(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0 || max === 0) return 0;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

export async function getContributionCalendar(
  username: string
): Promise<{ totalContributions: number; days: ContributionDay[] }> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN is required for the contribution calendar");
  }

  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { login: username } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to load contribution calendar (${res.status})`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "GitHub GraphQL error");
  }

  const calendar: ContributionCalendar =
    json.data.user.contributionsCollection.contributionCalendar;

  const rawDays = calendar.weeks.flatMap((week) => week.contributionDays);
  const max = Math.max(...rawDays.map((day) => day.contributionCount), 0);

  const days: ContributionDay[] = rawDays.map((day) => ({
    date: day.date,
    count: day.contributionCount,
    level: levelFor(day.contributionCount, max),
  }));

  return { totalContributions: calendar.totalContributions, days };
}
