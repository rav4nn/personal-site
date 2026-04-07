import { GridWrapper } from "@/app/components/GridWrapper";
import { GithubSection } from "@/app/components/GithubSection";

interface Project {
  title: string;
  description: string;
  url: string;
  tag?: string;
}

const projects: Project[] = [
  {
    title: "coffeecoach.app",
    description:
      "A full-stack app that helps people improve their coffee brewing through structured feedback and data-driven suggestions. I built it because I was personally trying to get better at brewing and realised most advice online is scattered and inconsistent — so I collected high-quality data and built a decision tree to guide brewers through it.",
    url: "https://coffeecoach.app",
    tag: "64 users within a week, zero paid promotion",
  },
  {
    title: "buildinpublic-x",
    description:
      "GitHub commits over the day → Twitter/Bluesky posts every night. Developers can build in public without the friction of manually writing updates — no server, no backend, no SaaS. The tool lives entirely inside your GitHub as an Action. LLM provider is swappable to your choice.",
    url: "https://github.com/rav4nn/buildinpublic-x",
  },
  {
    title: "youtube-rag-scraper",
    description:
      "A pipeline that extracts, processes, and structures knowledge from YouTube channels for use in RAG systems. Built after realising YouTube has some of the best domain-specific content, but it's impossible to query or reuse effectively. Turns unstructured video transcripts into something searchable for downstream AI applications.",
    url: "https://github.com/rav4nn/youtube-rag-scraper",
    tag: "55 GitHub stars",
  },
  {
    title: "splitwala",
    description:
      "A WhatsApp chatbot that splits bills in group chats. Built out of personal need, focused on keeping the UX minimal — commands like /split, /paid, /balances. Solving a real everyday problem without overbuilding it.",
    url: "https://github.com/rav4nn/splitwala-webjs",
  },
];

export default async function ProjectPage() {
  return (
    <div className="relative space-y-16">
      <title>Projects | Hardeep Singh</title>
      <GridWrapper>
        <h1 className="mx-auto mt-16 max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
          Things I&apos;ve built that people actually use.
        </h1>
      </GridWrapper>

      <GridWrapper className="py-6">
        <GithubSection />
      </GridWrapper>

      <GridWrapper className="space-y-6 px-4 md:px-10">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-border-primary bg-bg-primary p-6 transition-all duration-200 hover:border-indigo-400 md:p-8"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl space-y-3">
                <h2 className="text-xl font-semibold tracking-tight text-text-primary group-hover:text-indigo-600">
                  {project.title}
                </h2>
                <p className="text-base leading-7 text-text-secondary">
                  {project.description}
                </p>
              </div>
              {project.tag && (
                <span className="inline-block shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 md:mt-1">
                  {project.tag}
                </span>
              )}
            </div>
          </a>
        ))}
      </GridWrapper>

    </div>
  );
}
