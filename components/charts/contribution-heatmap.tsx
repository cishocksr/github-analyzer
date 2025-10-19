"use client"

interface ContributionDay {
    date: string
    count: number
}

interface ContributionHeatmapProps {
    contributions: ContributionDay[]
}

export function ContributionHeatmap({ contributions }: ContributionHeatmapProps) {
    // Group by week
    const weeks: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []

    contributions.forEach((day, index) => {
        currentWeek.push(day)
        if ((index + 1) % 7 === 0) {
            weeks.push([...currentWeek])
            currentWeek = []
        }
    })

    if (currentWeek.length > 0) {
        weeks.push(currentWeek)
    }

    const getColor = (count: number) => {
        if (count === 0) return "bg-gray-200"
        if (count < 3) return "bg-green-200"
        if (count < 6) return "bg-green-400"
        if (count < 9) return "bg-green-600"
        return "bg-green-800"
    }

    return (
        <div className="overflow-x-auto">
            <div className="inline-flex gap-1">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day, dayIndex) => (
                            <div
                                key={dayIndex}
                                className={`w-3 h-3 rounded-sm ${getColor(day.count)}`}
                                title={`${day.date}: ${day.count} contributions`}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-600">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-gray-200" />
                <div className="w-3 h-3 rounded-sm bg-green-200" />
                <div className="w-3 h-3 rounded-sm bg-green-400" />
                <div className="w-3 h-3 rounded-sm bg-green-600" />
                <div className="w-3 h-3 rounded-sm bg-green-800" />
                <span>More</span>
            </div>
        </div>
    )
}