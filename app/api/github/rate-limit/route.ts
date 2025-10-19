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
    const rateLimit = await github.getRateLimit();

    return NextResponse.json(rateLimit);
  } catch (error) {
    console.error("Failed to fetch rate limit:", error);
    return NextResponse.json(
      { error: "Failed to fetch rate limit" },
      { status: 500 },
    );
  }
}
