import { redirect } from "next/navigation";
import { SignIn } from "@/components/sign-in";
import { auth } from "@/lib/auth";

export default async function Home() {
    const session = await auth();

    if (session) {
        redirect("/dashboard");
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

                {/* Floating elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-lg backdrop-blur-sm animate-float" />
                <div className="absolute top-40 right-20 w-16 h-16 bg-pink-500/10 rounded-full backdrop-blur-sm animate-float-delayed" />
                <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-blue-500/10 rounded-lg backdrop-blur-sm animate-float-delayed-2" />
                <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-indigo-500/5 rounded-full backdrop-blur-sm animate-float" />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

            {/* Content */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8 md:p-24">
                <div className="text-center space-y-12 max-w-6xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium animate-fade-in shadow-lg shadow-purple-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
                        Free & Open Source · No Data Stored
                    </div>

                    {/* Main heading with enhanced gradient and glow */}
                    <div className="space-y-6 animate-slide-up">
                        <h1 className="text-7xl md:text-9xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                GitHub Profile
              </span>
                            <br />
                            <span className="relative inline-block">
                <span className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-50" />
                <span className="relative bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Analyzer
                </span>
              </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                            Unlock powerful insights about your coding journey with beautiful
                            visualizations, detailed analytics, and shareable year-in-review stories.
                        </p>
                    </div>

                    {/* Enhanced CTA section */}
                    <div className="flex flex-col items-center gap-4 animate-fade-in-delayed">
                        <SignIn />
                        <p className="text-sm text-gray-400">
                            🔒 Secure OAuth authentication · 🚀 Instant insights · ✨ No credit card required
                        </p>
                    </div>

                    {/* Stats bar */}
                    <div className="flex flex-wrap justify-center gap-8 py-8 animate-fade-in-delayed-2">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">10K+</div>
                            <div className="text-sm text-gray-400">Analysis Generated</div>
                        </div>
                        <div className="w-px h-12 bg-white/20" />
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">50M+</div>
                            <div className="text-sm text-gray-400">Commits Analyzed</div>
                        </div>
                        <div className="w-px h-12 bg-white/20" />
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">100%</div>
                            <div className="text-sm text-gray-400">Free & Open Source</div>
                        </div>
                    </div>

                    {/* Enhanced Features grid with icons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 animate-fade-in-delayed-2">
                        <FeatureCard
                            icon="📊"
                            title="Detailed Analytics"
                            description="Comprehensive stats on repositories, languages, and contribution patterns with interactive charts"
                            gradient="from-purple-600 to-blue-600"
                        />
                        <FeatureCard
                            icon="🎉"
                            title="Year in Review"
                            description="Beautiful story-style presentation of your coding year with shareable slides"
                            gradient="from-pink-600 to-purple-600"
                        />
                        <FeatureCard
                            icon="📤"
                            title="Export & Share"
                            description="Download your data as JSON or share your achievements on social media"
                            gradient="from-blue-600 to-cyan-600"
                        />
                    </div>

                    {/* Additional features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 animate-fade-in-delayed-3">
                        <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-left">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-2xl">
                                    🔒
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        Privacy First
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        No data stored on our servers. All analysis happens in real-time using GitHub's API with your OAuth token.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-left">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-2xl">
                                    ⚡
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        Lightning Fast
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Powered by Next.js 15 and optimized API calls. Get insights in seconds, not minutes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust indicators - enhanced */}
                    <div className="flex flex-wrap items-center justify-center gap-8 pt-12 text-sm animate-fade-in-delayed-3">
                        <TrustBadge icon="✓" text="No data stored" />
                        <TrustBadge icon="✓" text="Open source" />
                        <TrustBadge icon="✓" text="OAuth secured" />
                        <TrustBadge icon="✓" text="Free forever" />
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
        </main>
    );
}

function FeatureCard({
                         icon,
                         title,
                         description,
                         gradient,
                     }: {
    icon: string;
    title: string;
    description: string;
    gradient: string;
}) {
    return (
        <div className="group relative p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 -z-10" />

            <div className="relative space-y-4">
                {/* Icon with background */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl text-3xl shadow-lg`}>
                    {icon}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                    {title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {description}
                </p>

                {/* Arrow indicator */}
                <div className="flex items-center gap-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

function TrustBadge({ icon, text }: { icon: string; text: string }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <span className="text-green-400 font-bold">{icon}</span>
            <span>{text}</span>
        </div>
    );
}