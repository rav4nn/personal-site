import { BentoCard } from "./BentoCard";
import { getGitHubStats } from "@/app/lib/stats/github-stats";

export async function GithubActivityBento({ linkTo }: { linkTo?: string }) {
  const { contributions } = await getGitHubStats();

  return (
    <BentoCard height="h-auto" linkTo={linkTo} hideOverflow={false}>
      <div className="flex h-[220px] items-center justify-center">
        <p className="text-sm text-text-secondary">
          {contributions
            ? `${contributions.totalContributions} contributions in the last 6 months`
            : "No data available"}
        </p>
      </div>
    </BentoCard>
  );
}
