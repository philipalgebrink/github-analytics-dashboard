"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { LanguageSlice } from "@/types/github";

const COLORS = [
  "#34d399",
  "#60a5fa",
  "#fbbf24",
  "#f472b6",
  "#a78bfa",
  "#fb923c",
  "#38bdf8",
  "#facc15",
];

export default function LanguageChart({ data }: { data: LanguageSlice[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-zinc-500">No language data available.</p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="h-56 w-56 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: 8,
                color: "#fafafa",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-1">
        {data.map((entry, index) => (
          <li key={entry.name} className="flex items-center gap-2 text-zinc-300">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {entry.name}
            <span className="text-zinc-500">({entry.value})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
