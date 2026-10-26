import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GridWrapper } from "./components/GridWrapper";
import { HomeTrack } from "./components/HomeTrack";
import { ShadowBox } from "./components/ShadowBox";
import { lanes, statusDot, type Lane } from "./components/lanes/lanes";
import { parseHighlights } from "./components/parseHighlights";
import { getProjects } from "./data/projects";

const title = "Hardeep Singh - AI agent builder";
const description =
  "Team Lead and Senior AI Engineer at Squidgy AI. I build multi-agent systems in production and small Mac apps that fix macOS.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: "/hero.webp", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero.webp"],
  },
};

const work = [
  {
    when: "Day job",
    title: "Team Lead, Squidgy AI",
    text: "I lead the AI team at a UK startup and build the {{multi-agent systems}} we run for clients. I built {{Concierge}}, an MCP service that indexes 9 repos so agents stop re-reading code, and {{SiteBuddy}}, which rebuilds a website in 2-3 minutes for under $1. About 50 client sites shipped.",
  },
  {
    when: "Agent tools",
    title: "Giving agents a safe way into my Mac",
    text: "{{MacLane}} lets cloud agents use my Mac's apps and my signed-in browser, with an approval card for every new site. {{GuardLane}} will keep the tools those agents run in check.",
  },
  {
    when: "Learning in public",
    title: "Harnesses, evals and prompts",
    text: "I turn the best talks on building agents into {{visual lessons}}, and post a daily {{Claude Code 101}} series on X.",
  },
  {
    when: "Side builds",
    title: "AI-built MVPs for founders",
    text: "On evenings and weekends I build {{MVPs for founders}}, with coding agents doing most of the typing.",
  },
] as const;

const footLinks = [
  { label: "Writing", href: "/blog" },
  { label: "Study", href: "/study" },
  { label: "X", href: "https://x.com/rav4nn" },
  { label: "GitHub", href: "https://github.com/rav4nn" },
] as const;

const moreLinkClassName =
  "inline-flex items-center gap-1 text-sm font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 transition-colors hover:text-indigo-500 hover:decoration-indigo-400";

const listClassName =
  "divide-y divide-border-primary rounded-2xl border border-border-primary bg-bg-primary";

function MacAppRow({ name, line, status, href, Tile }: Lane) {
  const { colour, label } = statusDot[status];
  const body = (
    <>
      <span className="w-28 shrink-0">
        <Tile />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          {name}
          <span
            aria-hidden="true"
            className="inline-block h-[7px] w-[7px] rounded-full"
            style={{ backgroundColor: colour }}
          />
          <span className="text-xs font-medium text-text-secondary">{label}</span>
        </span>
        <span className="block text-sm leading-6 text-text-secondary">{line}</span>
      </span>
    </>
  );
  const rowClassName = "flex items-center gap-4 p-4";
  return href ? (
    <a href={href} className={`${rowClassName} transition-colors hover:bg-black/[0.02]`}>
      {body}
    </a>
  ) : (
    <div className={rowClassName}>{body}</div>
  );
}

function SectionTitle({ id, eyebrow, heading }: { id: string; eyebrow: string; heading: string }) {
  return (
    <div className="space-y-4">
      <p className="text-center text-sm font-medium text-indigo-600">{eyebrow}</p>
      <h2 id={id} className="mx-auto max-w-xl text-balance text-center text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
        {heading}
      </h2>
    </div>
  );
}

function HeroPhoto() {
  return (
    <div className="relative mx-auto w-fit">
      <ShadowBox width={188} height={278} />
      <Image
        className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
        src="/hero.webp"
        alt="Hardeep in a cap and puffer jacket, outdoor selfie"
        width={180}
        height={270}
        priority
      />
    </div>
  );
}

export default async function Home() {
  const otherProjects = (await getProjects()).filter(
    (project) => project.type !== "Mac apps",
  );

  return (
    <section className="relative space-y-20 pb-12 pt-12 md:space-y-32 md:pb-16 md:pt-16">
      <HomeTrack />
      {/* Intro */}
      <section className="relative">
        <GridWrapper>
          <h1 aria-label="Hey, I'm Hardeep, AI engineer." className="mx-auto max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
            Hey, I&apos;m Hardeep,
            <br />
            AI eng
            <span className="lg:hidden">i</span>
            <span data-track-origin className="hidden lg:inline">
              ı<span data-track-baseline className="inline-block h-0 w-0" />
            </span>
            neer.
          </h1>
        </GridWrapper>
        <div className="relative h-fit w-full">
          <div data-track="mid" className="grid grid-cols-1 gap-8 py-12 pr-12 lg:grid-cols-2 lg:items-center lg:justify-between lg:py-28">
            <div className="flex flex-col items-center text-left lg:order-2 lg:items-start">
              <div className="mb-8 lg:hidden">
                <HeroPhoto />
              </div>
              <p className="mb-5 w-full text-balance text-2xl font-medium leading-9 tracking-tighter text-text-primary md:text-3xl md:leading-[40px]">
                {parseHighlights("IIT Delhi → {{AI agent builder}}")}
              </p>
              <p className="mb-4 text-base leading-8 text-text-secondary">
                {parseHighlights(
                  "{{Team Lead and Senior AI Engineer}} at {{Squidgy AI}}. I build {{multi-agent systems}} that run in production, and the {{tools agents use}}.",
                )}
              </p>
              <p className="text-base leading-8 text-text-secondary">
                {parseHighlights(
                  "After hours: {{small Mac apps}} that fix macOS, and {{visual lessons}} on how agents are built.",
                )}
              </p>
            </div>
            <div className="hidden lg:order-1 lg:block">
              <HeroPhoto />
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section aria-labelledby="work" data-track="left" className="space-y-12">
        <SectionTitle id="work" eyebrow="Work" heading="What I'm working on right now" />
        <ol className="mx-auto max-w-3xl divide-y divide-border-primary px-2 md:px-8">
          {work.map((item) => (
            <li key={item.title} className="grid gap-2 py-6 md:grid-cols-[160px_1fr] md:gap-8">
              <p className="text-xs font-medium uppercase tracking-wide text-indigo-600 md:pt-1">
                {item.when}
              </p>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold tracking-tight text-text-primary">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-text-secondary">
                  {parseHighlights(item.text)}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-center">
          <Link href="/about" className={moreLinkClassName}>
            Full story and work history <span aria-hidden="true">&rarr;</span>
          </Link>
        </p>
      </section>

      {/* Projects */}
      <section aria-labelledby="projects" data-track="right" className="space-y-20">
        <SectionTitle id="projects" eyebrow="Projects" heading="Things I've built" />
        <div data-track="center" className="grid grid-cols-1 gap-12 md:px-8 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-5">
            <h3 className="text-center text-sm font-medium text-text-secondary lg:text-left">
              Mac apps
            </h3>
            <ul className={listClassName}>
              {lanes.map((lane) => (
                <li key={lane.name}>
                  <MacAppRow {...lane} />
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <h3 className="text-center text-sm font-medium text-text-secondary lg:text-left">
              Other things I&apos;ve built
            </h3>
            <ul className={listClassName}>
              {otherProjects.map((project) => (
                <li key={project.title}>
                  <a
                    href={project.url}
                    className="flex items-start gap-3 p-4 transition-colors hover:bg-black/[0.02]"
                  >
                    <Image
                      src={project.logo}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 shrink-0 rounded-lg object-contain"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-text-primary">
                        {project.title}
                      </span>
                      <span className="block text-sm leading-6 text-text-secondary">
                        {project.short}
                      </span>
                      <span className="mt-1 block text-xs text-indigo-600">
                        {project.stats[0]}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-center">
          <Link href="/projects" className={moreLinkClassName}>
            All projects <span aria-hidden="true">&rarr;</span>
          </Link>
        </p>
      </section>

      <nav aria-label="More from Hardeep">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-text-secondary">
          {footLinks.map(({ label, href }) => (
            <li key={label}>
              {href.startsWith("/") ? (
                <Link href={href} className="hover:text-text-primary">
                  {label}
                </Link>
              ) : (
                <a href={href} className="hover:text-text-primary">
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
