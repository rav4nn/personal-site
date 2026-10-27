"use server";

import { unstable_cache } from "next/cache";
import type { GitHubStats, ContributionData } from "./types";

const GITHUB_USERNAME = "rav4nn";

// The cached functions below throw on any failure, so unstable_cache never
// stores a failed result; the exported wrappers turn the error into zeros.

async function githubGraphQL(token: string, query: string) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) {
    throw new Error(`GitHub GraphQL ${response.status}`);
  }
  const data = await response.json();
  if (!data?.data?.user) {
    throw new Error(`GitHub GraphQL: ${JSON.stringify(data?.errors ?? data)}`);
  }
  return data.data.user;
}

function requireToken(): string {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  return token;
}

async function fetchContributions(token: string): Promise<ContributionData> {
  // Rolling 6-month window ending today
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const user = await githubGraphQL(
    token,
    `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection(from: "${sixMonthsAgo.toISOString()}", to: "${today.toISOString()}") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `
  );
  const calendar = user.contributionsCollection.contributionCalendar;
  return {
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
  };
}

export interface RepoStats {
  stars: number;
  forks: number;
}

const getCachedRepoStats = unstable_cache(
  async (owner: string, repo: string): Promise<RepoStats> => {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${requireToken()}`,
          Accept: "application/vnd.github+json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`GitHub repo ${owner}/${repo}: ${response.status}`);
    }
    const data = await response.json();
    return { stars: data.stargazers_count ?? 0, forks: data.forks_count ?? 0 };
  },
  ["repo-stats"],
  { revalidate: 86400 }
);

export async function getRepoStats(
  owner: string,
  repo: string
): Promise<RepoStats> {
  try {
    return await getCachedRepoStats(owner, repo);
  } catch (error) {
    console.error("Error fetching repo stats:", error);
    return { stars: 0, forks: 0 };
  }
}

const getCachedGitHubStats = unstable_cache(
  async (): Promise<GitHubStats> => {
    const token = requireToken();

    // Stars, forks, and commits across all repos
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const [user, contributions] = await Promise.all([
      githubGraphQL(
        token,
        `
        query {
          user(login: "${GITHUB_USERNAME}") {
            contributionsCollection(from: "${oneYearAgo.toISOString()}", to: "${today.toISOString()}") {
              totalCommitContributions
            }
            repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
              nodes {
                stargazerCount
                forkCount
              }
            }
          }
        }
      `
      ),
      fetchContributions(token),
    ]);

    const repos: { stargazerCount: number; forkCount: number }[] =
      user.repositories.nodes;
    return {
      stars: repos.reduce((sum, r) => sum + r.stargazerCount, 0),
      forks: repos.reduce((sum, r) => sum + r.forkCount, 0),
      commits: user.contributionsCollection.totalCommitContributions || 0,
      contributions,
    };
  },
  ["github-stats"],
  { revalidate: 86400 } // Revalidate every 24 hours
);

export async function getGitHubStats(): Promise<GitHubStats> {
  try {
    return await getCachedGitHubStats();
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { stars: 0, forks: 0, commits: 0, contributions: null };
  }
}
