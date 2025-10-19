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

    // First get all repos
    const repos = await github.getRepositories();

    // Then get language stats
    const languageStats = await github.getAllLanguageStats(repos);

    return NextResponse.json(languageStats);
  } catch (error) {
    console.error("Failed to fetch language stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch language statistics" },
      { status: 500 },
    );
  }
}
