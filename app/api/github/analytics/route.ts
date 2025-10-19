import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { GitHubClient } from "@/lib/github";

export async function GET() {
  const session = await auth();

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const github = new GitHubClient(session.accessToken);

    // Fetch all data
    const [userInfo, repos] = await Promise.all([
      github.getUserInfo(),
      github.getRepositories(),
    ]);

    // Get language stats
    const languageStats = await github.getAllLanguageStats(repos);

    // Get commit count
    const commitCount = await github.getCommitCountThisYear(userInfo.username);

    // Calculate stats
    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0,
    );
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    const totalIssues = repos.reduce(
      (sum, repo) => sum + repo.open_issues_count,
      0,
    );

    // Convert language bytes to percentages
    const totalBytes = Object.values(languageStats).reduce(
      (sum, bytes) => sum + bytes,
      0,
    );
    const languagePercentages = Object.entries(languageStats)
      .map(([language, bytes]) => ({
        language,
        bytes,
        percentage: (bytes / totalBytes) * 100,
      }))
      .sort((a, b) => b.bytes - a.bytes);

    // Get account age
    const accountCreated = new Date(userInfo.created_at);
    const accountAge = Math.floor(
      (Date.now() - accountCreated.getTime()) / (1000 * 60 * 60 * 24 * 365),
    );

    // Get most active repositories
    const mostActiveRepos = repos
      .sort((a, b) => {
        const aActivity = a.stargazers_count + a.forks_count * 2;
        const bActivity = b.stargazers_count + b.forks_count * 2;
        return bActivity - aActivity;
      })
      .slice(0, 10);

    // Calculate contribution streak (simplified)
    const _recentRepos = repos
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
      )
      .slice(0, 30);

    // Monthly stats for current year
    const currentYear = new Date().getFullYear();
    const monthlyStats = Array.from({ length: 12 }, (_, i) => {
      const month = new Date(currentYear, i, 1);
      const monthName = month.toLocaleString("default", { month: "short" });

      const reposInMonth = repos.filter((repo) => {
        const created = new Date(repo.created_at);
        return (
          created.getFullYear() === currentYear && created.getMonth() === i
        );
      }).length;

      return {
        month: monthName,
        repos: reposInMonth,
        commits: Math.floor(commitCount / 12), // Simplified
      };
    });

    // Generate contribution data for heatmap (last 365 days)
    const contributions = Array.from({ length: 365 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (364 - i));

      return {
        date: date.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 10), // TODO: Replace with real data
      };
    });

    return NextResponse.json({
      user: userInfo,
      stats: {
        totalRepos: repos.length,
        totalStars,
        totalForks,
        totalIssues,
        totalCommitsThisYear: commitCount,
        accountAge,
        languages: languagePercentages,
        monthlyStats,
        contributions,
      },
      repos: mostActiveRepos,
    });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}
