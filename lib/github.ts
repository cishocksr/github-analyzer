import { Octokit } from "@octokit/rest";

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  html_url: string;
  private: boolean;
}

export interface LanguageStats {
  [language: string]: number;
}

export interface UserStats {
  username: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export class GitHubClient {
  private octokit: Octokit;

  constructor(accessToken: string) {
    this.octokit = new Octokit({
      auth: accessToken,
    });
  }

  /**
   * Get authenticated user's basic info
   */
  async getUserInfo(): Promise<UserStats> {
    const { data } = await this.octokit.rest.users.getAuthenticated();

    return {
      username: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      created_at: data.created_at || new Date().toISOString(),
    };
  }

  /**
   * Get all repositories for the authenticated user
   * Includes both public and private repos
   */
  async getRepositories(): Promise<Repository[]> {
    const repos: Repository[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const { data } = await this.octokit.rest.repos.listForAuthenticatedUser({
        per_page: perPage,
        page: page,
        sort: "updated",
        direction: "desc",
      });

      if (data.length === 0) break;

      repos.push(
        ...data.map((repo) => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          open_issues_count: repo.open_issues_count,
          created_at: repo.created_at || new Date().toISOString(),
          updated_at: repo.updated_at || new Date().toISOString(),
          pushed_at:
            repo.pushed_at || repo.updated_at || new Date().toISOString(),
          size: repo.size,
          html_url: repo.html_url,
          private: repo.private,
        })),
      );

      if (data.length < perPage) break;
      page++;
    }

    return repos;
  }

  /**
   * Get language statistics for a specific repository
   */
  async getRepoLanguages(owner: string, repo: string): Promise<LanguageStats> {
    try {
      const { data } = await this.octokit.rest.repos.listLanguages({
        owner,
        repo,
      });
      return data;
    } catch (error) {
      console.error(`Failed to fetch languages for ${owner}/${repo}:`, error);
      return {};
    }
  }

  /**
   * Get aggregated language statistics across all repositories
   */
  async getAllLanguageStats(repos: Repository[]): Promise<LanguageStats> {
    const languageStats: LanguageStats = {};

    // Process repos in batches to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < repos.length; i += batchSize) {
      const batch = repos.slice(i, i + batchSize);

      const promises = batch.map(async (repo) => {
        const [owner, repoName] = repo.full_name.split("/");
        return this.getRepoLanguages(owner, repoName);
      });

      const results = await Promise.all(promises);

      // Aggregate results
      results.forEach((repoLanguages) => {
        Object.entries(repoLanguages).forEach(([language, bytes]) => {
          languageStats[language] = (languageStats[language] || 0) + bytes;
        });
      });
    }

    return languageStats;
  }

  /**
   * Get commit count for the current year
   */
  async getCommitCountThisYear(username: string): Promise<number> {
    const currentYear = new Date().getFullYear();
    const since = new Date(currentYear, 0, 1).toISOString();

    try {
      const { data } = await this.octokit.rest.search.commits({
        q: `author:${username} author-date:>=${since}`,
        per_page: 1,
      });

      return data.total_count;
    } catch (error) {
      console.error("Failed to fetch commit count:", error);
      return 0;
    }
  }

  /**
   * Check rate limit status
   */
  async getRateLimit() {
    const { data } = await this.octokit.rest.rateLimit.get();
    return {
      limit: data.rate.limit,
      remaining: data.rate.remaining,
      reset: new Date(data.rate.reset * 1000),
    };
  }
}
