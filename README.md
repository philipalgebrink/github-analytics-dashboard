# GitHub Analytics Dashboard

A personal GitHub stats dashboard for [@philipalgebrink](https://github.com/philipalgebrink), built with Next.js (App Router) and TypeScript.

Shows:

- Profile overview (avatar, bio, followers)
- Stats summary: public repos, total stars, total forks, top language
- Contribution heatmap (the classic green-squares grid), via GitHub's GraphQL API
- Language distribution across repos
- Top repositories by stars

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org) for the language chart
- [react-activity-calendar](https://github.com/grubersjoe/react-activity-calendar) for the contribution heatmap
- GitHub REST API (profile, repos) and GraphQL API (contribution calendar)

Data is fetched server-side with hourly revalidation (`next: { revalidate: 3600 }`) rather than on every request.

## Getting started

```bash
npm install
cp .env.example .env.local
# add a GitHub personal access token to .env.local
npm run dev
```

A `GITHUB_TOKEN` is required both to raise the REST API rate limit and because the GraphQL API (used for the contribution calendar) requires authentication. The token is only ever read server-side and is never sent to the client.

## Deploy

Deploys cleanly to [Vercel](https://vercel.com) — just set the `GITHUB_TOKEN` environment variable in the project settings.
