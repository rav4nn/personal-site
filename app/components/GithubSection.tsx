import { getGitHubStats } from "@/app/lib/stats/github-stats";

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
        <div className="min-w-0 flex-1">
          <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl border border-border-primary bg-bg-primary">
            <p className="text-sm text-text-secondary">
              {contributions
                ? `${contributions.totalContributions} contributions in the last 6 months`
                : "No contribution data available"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-row gap-4 lg:w-52 lg:flex-col">
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-border-primary bg-bg-primary p-4">
            <span className="text-2xl font-semibold text-text-primary">{stars}</span>
            <span className="text-xs text-text-secondary">Stars</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-border-primary bg-bg-primary p-4">
            <span className="text-2xl font-semibold text-text-primary">{forks}</span>
            <span className="text-xs text-text-secondary">Forks</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-border-primary bg-bg-primary p-4">
            <span className="text-2xl font-semibold text-text-primary">{commits}</span>
            <span className="text-xs text-text-secondary">Commits</span>
          </div>
        </div>
      </div>
    </section>
  );
}
