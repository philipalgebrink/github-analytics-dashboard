"use client";

import { ActivityCalendar } from "react-activity-calendar";
import type { ContributionDay } from "@/types/github";

// Ends on the same brand green (#48bb78) used across the rest of this
// dashboard and the main portfolio, instead of GitHub's default palette.
const theme = {
  dark: ["#18181b", "#1b4332", "#2d6a4f", "#3ca873", "#48bb78"],
};

export default function ContributionHeatmap({
  data,
  totalContributions,
}: {
  data: ContributionDay[];
  totalContributions: number;
}) {
  if (data.length === 0) {
    return <p className="text-sm text-zinc-500">No contribution data available.</p>;
  }

  return (
    <div className="min-w-0 overflow-x-auto">
      <p className="mb-3 text-sm text-zinc-400">
        {totalContributions} contributions in the last year
      </p>
      <ActivityCalendar
        data={data}
        theme={theme}
        colorScheme="dark"
        blockSize={11}
        blockMargin={3}
        fontSize={12}
        hideTotalCount
      />
    </div>
  );
}
