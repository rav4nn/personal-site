import { getGitHubStats } from "@/app/lib/stats/github-stats";
import { ContributionGraphCard } from "./stats/ContributionGraphCard";
import { GitHubStatsCard } from "./stats/GitHubStatsCard";

export async function GithubSection() {
  const { stars, forks, commits, contributions } = await getGitHubStats();

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-text-primary">GitHub</h2>
        <p className="text-sm text-text-secondary">
          Open source contributions and repository stats
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Contribution graph — stretches to fill available width */}
        <div className="min-w-0 flex-1">
          {contributions ? (
            <ContributionGraphCard contributions={contributions} delay={0.1} />
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl border border-border-primary bg-bg-primary">
              <p className="text-sm text-text-secondary">
                No contribution data available
              </p>
            </div>
          )}
        </div>

        {/* Stat cards */}
        <div className="flex shrink-0 flex-row gap-4 lg:w-52 lg:flex-col">
          <GitHubStatsCard
            type="stars"
            label="GitHub Stars"
            value={stars}
            delay={0.2}
          />
          <GitHubStatsCard
            type="forks"
            label="Forks"
            value={forks}
            delay={0.3}
          />
          <GitHubStatsCard
            type="commits"
            label="Commits"
            value={commits}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}
