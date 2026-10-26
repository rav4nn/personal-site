import Image from "next/image";
import Link from "next/link";
import { GridWrapper } from "./GridWrapper";
import { ShadowBox } from "./ShadowBox";
import { siteMetadata } from "@/app/data/siteMetadata";

type NowItem = {
  label: string;
  title: string;
  text: string;
  link?: { label: string; href: string };
};

const now: readonly NowItem[] = [
  {
    label: "Day job",
    title: "Team Lead at Squidgy AI",
    text: "I lead the AI team at a UK startup and build the multi-agent systems we run in production. I built Concierge, an MCP service that indexes 9 repos so agents ask what lives where instead of re-reading code, and SiteBuddy, an agent that rebuilds a website in 2-3 minutes for under $1. It has shipped about 50 client sites.",
  },
  {
    label: "Mac apps",
    title: "The Lane apps",
    text: "Each one fixes a thing that annoyed me on my own Mac. CallLane is out. MacLane lets cloud agents use your Mac's apps and your signed-in browser, with you approving each new site. GuardLane keeps the tools those agents run in check.",
    link: { label: "Try CallLane", href: "https://calllane.app" },
  },
  {
    label: "Learning in public",
    title: "Harnesses, evals, prompts",
    text: "I study how agents are built and turn the best talks into short visual lessons. On X I post a daily Claude Code 101 series and notes from building agents.",
    link: { label: "Read the lessons", href: "/study" },
  },
  {
    label: "Side builds",
    title: "MVPs for founders",
    text: "On evenings and weekends I build MVPs for founders. My own products, CoffeeCoach and SplitWala, reached 3,000+ people with no paid promotion.",
    link: { label: "Say hello", href: siteMetadata.email },
  },
];

const linkClassName =
  "inline-flex items-center gap-1 text-sm font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 transition-colors hover:text-indigo-500 hover:decoration-indigo-400";

function NowLink({ label, href }: { label: string; href: string }) {
  const content = (
    <>
      {label}
      <span aria-hidden="true">&rarr;</span>
    </>
  );
  return href.startsWith("/") ? (
    <Link href={href} className={linkClassName}>
      {content}
    </Link>
  ) : (
    <a href={href} className={linkClassName}>
      {content}
    </a>
  );
}

export function HomeAbout() {
  return (
    <section aria-labelledby="home-about-heading" className="space-y-10 md:space-y-12">
      <div className="space-y-4">
        <GridWrapper>
          <p className="text-center text-sm font-medium text-indigo-600">About</p>
        </GridWrapper>
        <GridWrapper>
          <h2
            id="home-about-heading"
            className="mx-auto max-w-xl text-balance text-center text-3xl font-medium leading-[40px] tracking-tighter text-text-primary"
          >
            I build AI agents by day and Mac apps by night.
          </h2>
        </GridWrapper>
      </div>

      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14 md:px-8">
        <div className="relative mx-auto w-fit">
          <ShadowBox width={188} height={278} />
          <Image
            className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-6deg] rounded-lg object-cover shadow"
            src="/hero_2.webp"
            alt="Hardeep at a café in a pink polo, holding coffee with a bookshelf behind"
            width={180}
            height={270}
          />
        </div>
        <div className="space-y-5 text-base leading-8 text-text-secondary">
          <p>
            I&apos;m Hardeep Singh. I studied Chemical Engineering at IIT Delhi
            and taught myself to code. These days I&apos;m Team Lead and Senior
            AI Engineer at Squidgy AI, where I build agents that do real work for
            real clients.
          </p>
          <p>
            Most of my day is spent with coding agents, so I keep building the
            tools they are missing. The Lane apps above came out of that: small
            Mac apps that fix macOS, and give agents a safe way into my Mac.
          </p>
          <p>
            Off screen I play chess, brew too much specialty coffee, and keep
            hunting for the best chhole bhature in Delhi.
          </p>
        </div>
      </div>

      <div className="md:px-8">
        <h3 className="mb-5 text-center text-sm font-medium text-text-secondary md:text-left">
          What I&apos;m working on now
        </h3>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {now.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-2 rounded-2xl border border-border-primary bg-bg-primary p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                {item.label}
              </p>
              <p className="text-base font-semibold text-text-primary">{item.title}</p>
              <p className="flex-1 text-sm leading-6 text-text-secondary">{item.text}</p>
              {item.link ? <NowLink {...item.link} /> : null}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center">
        <NowLink label="More about me" href="/about" />
      </p>
    </section>
  );
}
