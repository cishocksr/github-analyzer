"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Repository {
  name: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

interface RepoActivityChartProps {
  repos: Repository[];
}

export function RepoActivityChart({ repos }: RepoActivityChartProps) {
  // Get top 10 repos by stars
  const topRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10);

  const chartData = topRepos.map((repo) => ({
    name:
      repo.name.length > 15 ? `${repo.name.substring(0, 15)}...` : repo.name,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    issues: repo.open_issues_count,
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stars" fill="#fbbf24" name="Stars" />
          <Bar dataKey="forks" fill="#8b5cf6" name="Forks" />
          <Bar dataKey="issues" fill="#ef4444" name="Issues" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
