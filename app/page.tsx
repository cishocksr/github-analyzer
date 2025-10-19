import { auth } from "@/lib/auth"
import { SignIn } from "@/components/sign-in"
import { redirect } from "next/navigation"

export default async function Home() {
    const session = await auth()

    // If logged in, redirect to dashboard
    if (session) {
        redirect("/dashboard")
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            <div className="text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-6xl font-bold text-white">
                        GitHub Profile Analyzer
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        Discover insights about your coding journey. Analyze your
                        repositories, languages, and contributions.
                    </p>
                </div>

                <SignIn />

                <div className="flex gap-8 justify-center text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        <span>Detailed Analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🎯</span>
                        <span>Year in Review</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🔍</span>
                        <span>Compare Developers</span>
                    </div>
                </div>
            </div>
        </main>
    )
}