export function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* User Info Skeleton */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300" />
                    <div className="flex-1 space-y-3">
                        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48" />
                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32" />
                        <div className="flex gap-4">
                            <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24" />
                            <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24" />
                            <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-lg p-6 h-32"
                    />
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                    >
                        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 mb-4" />
                        <div className="h-[400px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg" />
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
        </div>
    );
}

export function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="relative">
                {/* Outer ring */}
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />

                {/* Inner ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-10 h-10 border-4 border-purple-100 border-b-purple-400 rounded-full animate-spin-reverse" />
                </div>
            </div>

            <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          to {
            transform: rotate(-360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
      `}</style>
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-pulse">
            <div className="space-y-4">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6" />
            </div>
        </div>
    );
}