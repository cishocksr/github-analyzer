"use client"

import { useEffect, useState } from "react"
import { LanguageChart } from "./charts/language-chart"
import { RepoActivityChart } from "./charts/repo-activity-chart"
import { ContributionHeatmap } from "./charts/contribution-heatmap"
import { StatsTimeline } from "./charts/stats-timeline"

interface AnalyticsData {
    user: {
        username: string
        name: string | null
        avatar_url: string
        bio: string | null
        public_repos: number
        followers: number
        following: number
    }
    stats: {
        totalRepos: number
        totalStars: number
        totalForks: number
        totalIssues: number
        totalCommitsThisYear: number
        accountAge: number
        languages: Array<{
            language: string
            bytes: number
            percentage: number
        }>
        monthlyStats: Array<{
            month: string
            repos: number
            commits: number
        }>
        contributions: Array<{
            date: string
            count: number
        }>
    }
    repos: Array<{
        name: string
        description: string | null
        language: string | null
        stargazers_count: number
        forks_count: number
        open_issues_count: number
        html_url: string
    }>
}

export function DashboardContent({ accessToken }: { accessToken: string }) {
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/github/analytics")
                if (!response.ok) throw new Error("Failed to fetch data")

                const analytics = await response.json()
                setData(analytics)
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    <p className="mt-4 text-gray-600">Loading your GitHub data...</p>
                    <p className="text-sm text-gray-500 mt-2">This may take a moment for accounts with many repositories</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-red-800 font-semibold">Error loading data</h3>
                <p className="text-red-600 mt-2">{error}</p>
            </div>
        )
    }

    if (!data) return null

    return (
        <div className="space-y-8">
            {/* User Info Card */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-4">
                    <img
                        src={data.user.avatar_url}
                        alt={data.user.name || data.user.username}
                        className="w-20 h-20 rounded-full"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {data.user.name || data.user.username}
                        </h2>
                        <p className="text-gray-600">@{data.user.username}</p>
                        {data.user.bio && (
                            <p className="text-gray-700 mt-2">{data.user.bio}</p>
                        )}
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <span>👥 {data.user.followers} followers</span>
                            <span>👤 {data.user.following} following</span>
                            <span>📅 {data.stats.accountAge} years on GitHub</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Repositories"
                    value={data.stats.totalRepos}
                    icon="📁"
                    color="purple"
                />
                <StatCard
                    title="Total Stars"
                    value={data.stats.totalStars}
                    icon="⭐"
                    color="yellow"
                />
                <StatCard
                    title="Total Forks"
                    value={data.stats.totalForks}
                    icon="🔱"
                    color="blue"
                />
                <StatCard
                    title="Commits (2025)"
                    value={data.stats.totalCommitsThisYear}
                    icon="💻"
                    color="green"
                />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Language Distribution */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Language Distribution
                    </h3>
                    <LanguageChart data={data.stats.languages} />
                </div>

                {/* Repository Activity */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Top Repositories by Activity
                    </h3>
                    <RepoActivityChart repos={data.repos} />
                </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    2025 Activity Timeline
                </h3>
                <StatsTimeline data={data.stats.monthlyStats} />
            </div>

            {/* Contribution Heatmap */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Contribution Activity (Last 365 Days)
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                    Your daily contribution pattern
                </p>
                <ContributionHeatmap contributions={data.stats.contributions} />
            </div>

            {/* Top Languages List */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Programming Languages Breakdown
                </h3>
                <div className="space-y-3">
                    {data.stats.languages.slice(0, 10).map((lang, index) => (
                        <div key={lang.language}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700 flex items-center gap-2">
                                    <span className="text-lg">{index + 1}</span>
                                    {lang.language}
                                </span>
                                <span className="text-gray-600">
                                    {lang.percentage.toFixed(1)}% · {formatBytes(lang.bytes)}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-purple-500 to-purple-700 h-2 rounded-full transition-all"
                                    style={{ width: `${lang.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Repository List */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Most Active Repositories
                </h3>
                <div className="space-y-4">
                    {data.repos.map((repo) => (
<a
                        key={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition"
                        >
                        <div className="flex justify-between items-start">
                        <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 hover:text-purple-600">
                    {repo.name}
                        </h4>
                    {repo.description && (
                        <p className="text-gray-600 text-sm mt-1">
                    {repo.description}
                </p>
                )}
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    {repo.language && (
                        <span className="flex items-center gap-1">
                                                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                            {repo.language}
                                            </span>
                    )}
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🔱 {repo.forks_count}</span>
                    {repo.open_issues_count > 0 && (
                        <span>⚠️ {repo.open_issues_count} issues</span>
                    )}
                </div>
            </div>
        </div>
</a>
))}
</div>
</div>
</div>
)
}

function StatCard({
                      title,
                      value,
                      icon,
                      color,
                  }: {
    title: string
    value: number
    icon: string
    color: "purple" | "yellow" | "blue" | "green"
}) {
    const colorClasses = {
        purple: "from-purple-500 to-purple-700",
        yellow: "from-yellow-500 to-yellow-700",
        blue: "from-blue-500 to-blue-700",
        green: "from-green-500 to-green-700",
    }

    return (
        <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-lg shadow p-6 text-white`}>
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-3xl font-bold">{value.toLocaleString()}</div>
            <div className="text-sm opacity-90 mt-1">{title}</div>
        </div>
    )
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}