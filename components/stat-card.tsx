// components/stat-card-enhanced.tsx
interface StatCardProps {
    title: string;
    value: string | number;
    icon: string;
    color: 'purple' | 'blue' | 'green' | 'amber' | 'pink' | 'indigo';
    subtitle?: string;
}

const colorClasses = {
    purple: {
        gradient: 'from-purple-500 to-purple-700',
        bg: 'bg-purple-500/10',
        border: 'border-purple-200',
    },
    blue: {
        gradient: 'from-blue-500 to-blue-700',
        bg: 'bg-blue-500/10',
        border: 'border-blue-200',
    },
    green: {
        gradient: 'from-green-500 to-emerald-600',
        bg: 'bg-green-500/10',
        border: 'border-green-200',
    },
    amber: {
        gradient: 'from-amber-500 to-orange-600',
        bg: 'bg-amber-500/10',
        border: 'border-amber-200',
    },
    pink: {
        gradient: 'from-pink-500 to-rose-600',
        bg: 'bg-pink-500/10',
        border: 'border-pink-200',
    },
    indigo: {
        gradient: 'from-indigo-500 to-purple-600',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-200',
    },
};

export function StatCard({
                                     title,
                                     value,
                                     icon,
                                     color,
                                     subtitle
                                 }: StatCardProps) {
    const colors = colorClasses[color];

    return (
        <div className="group relative overflow-hidden rounded-2xl">
            {/* Card background with gradient - always visible on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />

            {/* Main card */}
            <div className={`relative bg-white rounded-2xl shadow-lg border ${colors.border} p-6 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:border-transparent group-hover:bg-transparent`}>
                {/* Icon circle */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colors.bg} mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20`}>
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
                </div>

                {/* Value */}
                <div className="text-4xl font-bold text-gray-900 mb-1 transition-all duration-500 group-hover:text-white group-hover:scale-105">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </div>

                {/* Title */}
                <div className="text-sm font-medium text-gray-600 transition-all duration-500 group-hover:text-white group-hover:font-semibold">
                    {title}
                </div>

                {/* Subtitle */}
                {subtitle && (
                    <div className="text-xs text-gray-500 mt-1 transition-all duration-500 group-hover:text-white/90">
                        {subtitle}
                    </div>
                )}

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colors.gradient} opacity-5 rounded-bl-[100px] transition-opacity duration-500 group-hover:opacity-0`} />
            </div>
        </div>
    );
}