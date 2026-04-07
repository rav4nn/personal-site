import { BentoCard } from "./BentoCard";
import { ContributionGraphCard } from "./stats/ContributionGraphCard";
import { getGitHubStats } from "@/app/lib/stats/github-stats";

export async function GithubActivityBento({ linkTo }: { linkTo?: string }) {
  const { contributions } = await getGitHubStats();

  // Slice to last 26 weeks (~6 months) for the home page bento
  const sliced = contributions
    ? {
        ...contributions,
        weeks: contributions.weeks.slice(-26),
      }
    : null;

  return (
    <BentoCard height="h-auto" linkTo={linkTo} hideOverflow={false}>
      {sliced ? (
        <ContributionGraphCard contributions={sliced} />
      ) : (
        <div className="flex h-[220px] items-center justify-center">
          <p className="text-sm text-text-secondary">No data available</p>
        </div>
      )}
    </BentoCard>
  );
}
