import Image from "next/image";
import { GridWrapper } from "@/app/components/GridWrapper";
import { GithubSection } from "@/app/components/GithubSection";
import { getRepoStats } from "@/app/lib/stats/github-stats";
import { parseHighlights } from "@/app/components/parseHighlights";
import { GetInTouch } from "@/app/components/GetInTouch";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Hardeep Singh",
  description: "Open-source projects and experiments by Hardeep Singh.",
};

interface Project {
  title: string;
  description: string;
  url: string;
  logo: string;
  stats: string[];
}

export default async function ProjectPage() {
  const ytStats = await getRepoStats("rav4nn", "youtube-rag-scraper");

  const projects: Project[] = [
    {
      title: "agent-chrome",
      description:
        "Browser MCPs pull Chrome to the front mid-sentence, and they can't get into the sites you're signed in to. agent-chrome gives Claude Code a {{copy of your signed-in Chrome}} that opens {{behind your apps}} and never takes focus. You keep typing while the agent clicks.\n\nShips as a {{Claude Code plugin}}. Built on mimkorn's chrome-pipe-proxy, with background windows and per-account profiles on top.",
      url: "https://agentchrome.hardeep.cv",
      logo: "/projects/agent-chrome.webp",
      stats: ["zero focus steals", "Claude Code plugin", "macOS"],
    },
    {
      title: "CallLane",
      description:
        "Join a call on a Mac and macOS drops your music by about 20 dB. Your AirPods fall back to {{headset quality}} too. CallLane is a {{menu-bar app}} that gives call apps their own audio device, so the rest of your audio {{stays at full volume}}. It locks the input to your Mac's mic, so your headphones keep {{high-quality audio}} through the call.",
      url: "https://calllane.app",
      logo: "/projects/calllane.webp",
      stats: ["free & open source", "no kernel extension", "macOS 14+"],
    },
    {
      title: "coffeecoach.app",
      description:
        "Most coffee brewing advice online is scattered and contradictory. I ingested high-quality brewing data, made a {{RAG pipeline}} on top of it, and built an {{agentic coaching system}} based on that data — {{LLM orchestration}} with {{feedback loops}} that adapt recommendations based on user input.\n\nWrapped it all in a {{full-stack}} AI coaching app.",
      url: "https://coffeecoach.app",
      logo: "/projects/coffee-coach.webp",
      stats: ["65 daily active users", "zero paid promotion"],
    },
    {
      title: "splitwala",
      description:
        "Can't get your friends to install the bill splitting app? This Telegram bot makes it a single command — /split, /paid, /balances. {{Lives inside your Telegram group}}. No app to download, no account to create. Built on the principle that the best UX is the one that gets out of the way.",
      url: "https://splitwala.hardeep.cv/",
      logo: "/projects/splitwala-removebg-preview.webp",
      stats: ["live in 117 groups", "2000+ active users"],
    },
    {
      title: "youtube-rag-scraper",
      description:
        "YouTube has some of the best domain-specific knowledge on the internet, but it's locked in video format, impossible to query or reuse. This pipeline bulk-scrapes transcripts, processes them, and structures them into a searchable {{knowledge base}} for RAG systems. Handles {{chunking}}, {{embedding}}, and {{retrieval quality}} out of the box.",
      url: "https://github.com/rav4nn/youtube-rag-scraper",
      logo: "/projects/youtube-rag-scraper.webp",
      stats: [
        `${ytStats.stars} GitHub stars`,
        `${ytStats.forks} forks`,
      ],
    },
  ];

  return (
    <div className="relative space-y-16">
      <title>Projects | Hardeep Singh</title>
      <GridWrapper>
        <h1 className="mx-auto mt-16 max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
          Things I&apos;ve built that people actually use.
        </h1>
      </GridWrapper>


      <GridWrapper className="space-y-4 py-6">
        {projects.map((project, index) => {
          const isReversed = index % 2 === 1;
          return (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-border-primary bg-bg-primary p-6 transition-all duration-200 hover:border-indigo-400 md:p-8"
            >
              <div
                className={`flex flex-col gap-6 md:flex-row md:items-center ${isReversed ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 md:hidden">
                      <Image
                        src={project.logo}
                        alt={`${project.title} logo`}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold tracking-tight text-text-primary group-hover:text-indigo-600">
                        {project.title}
                      </h2>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {project.stats.map((stat) => (
                          <span
                            key={stat}
                            className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
                          >
                            {stat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {project.description.split("\n\n").map((para) => (
                      <p
                        key={para}
                        className="text-base leading-7 text-text-secondary"
                      >
                        {parseHighlights(para, "bold")}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="hidden shrink-0 items-center justify-center md:flex md:w-36">
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
              </div>
            </a>
          );
        })}
      </GridWrapper>

      <GridWrapper className="pt-6">
        <GithubSection />
      </GridWrapper>

      <GetInTouch />
    </div>
  );
}
