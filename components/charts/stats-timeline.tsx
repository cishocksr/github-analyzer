"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MonthlyStats {
  month: string;
  commits: number;
  repos: number;
}

interface StatsTimelineProps {
  data: MonthlyStats[];
}

export function StatsTimeline({ data }: StatsTimelineProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="commits"
            stroke="#8b5cf6"
            strokeWidth={2}
            name="Commits"
          />
          <Line
            type="monotone"
            dataKey="repos"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Repositories"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
