import { auth } from "@/lib/auth"
import { GitHubClient } from "@/lib/github"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await auth()

    if (!session?.accessToken) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        )
    }

    try {
        const github = new GitHubClient(session.accessToken)
        const userInfo = await github.getUserInfo()

        return NextResponse.json(userInfo)
    } catch (error) {
        console.error("Failed to fetch user info:", error)
        return NextResponse.json(
            { error: "Failed to fetch user data" },
            { status: 500 }
        )
    }
}