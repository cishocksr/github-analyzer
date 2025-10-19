import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await auth()

    if (!session?.accessToken) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    try {
        // Test the token by fetching user data
        const response = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                Accept: "application/vnd.github.v3+json",
            },
        })

        const data = await response.json()

        return NextResponse.json({
            success: true,
            username: data.login,
            publicRepos: data.public_repos,
            followers: data.followers,
        })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch from GitHub" },
            { status: 500 }
        )
    }
}