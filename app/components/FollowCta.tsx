import { siteMetadata } from "@/app/data/siteMetadata";
import { GridWrapper } from "./GridWrapper";

// Replaces the newsletter form: the site has no mailing list, new posts go to X first.
export function FollowCta() {
  return (
    <GridWrapper>
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <h2 className="text-2xl font-medium tracking-tighter text-text-primary">
          Get the next post
        </h2>
        <p className="max-w-md leading-7 text-text-secondary">
          I post every new article on X first.
        </p>
        <a
          href={siteMetadata.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-dark-primary px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Follow {siteMetadata.twitterHandle}
        </a>
      </div>
    </GridWrapper>
  );
}
