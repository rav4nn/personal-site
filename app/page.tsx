import type { Metadata } from "next";
import { CalendarBento } from "./components/CalendarBento";
import { ToolboxBento } from "./components/ToolboxBento";
import { AnimatedProfilePicture } from "./components/AnimatedProfilePicture";
import { AnimatedText } from "./components/AnimatedText";
import { PhotoGallery } from "./components/PhotoGallery";
import { AnimatedMobilePhotos } from "./components/AnimatedMobilePhotos";
import { GridWrapper } from "./components/GridWrapper";
import { GetInTouch } from "./components/GetInTouch";
import { ShadowBox } from "./components/ShadowBox";
import { AboutTrackPattern } from "./components/AboutTrackPattern";
import { Resume } from "./components/Resume";
import { AboutLink } from "./components/AboutLink";
import { GithubSection } from "./components/GithubSection";
import { getRepoStats } from "./lib/stats/github-stats";
import { getProjects } from "./data/projects";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hardeep - AI Engineer",
  description: "Senior AI Engineer building production AI agents, MCP services, and full-stack AI products. Two concurrent contracts and 3,000+ organic users across shipped products.",
};

// react-doctor-disable-next-line react-doctor/no-giant-component
export default async function Home() {
  const PROFILE_DELAY = 0;
  const HEADING_DELAY = PROFILE_DELAY + 0.2;
  const PARAGRAPH_DELAY = HEADING_DELAY + 0.1;
  const PHOTOS_DELAY = PARAGRAPH_DELAY + 0.1;

  const [ytStats, projects] = await Promise.all([
    getRepoStats("rav4nn", "youtube-rag-scraper"),
    getProjects(),
  ]);

  return (
    <section>
      <AnimatedProfilePicture delay={PROFILE_DELAY} />
      <div className="mt-6 space-y-10 md:mt-0 md:space-y-16">
        {/* Hero + Photos */}
        <section>
          <div className="relative text-balance">
            <GridWrapper>
              <AnimatedText
                as="h1"
                delay={HEADING_DELAY}
                className="mx-auto max-w-2xl text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]"
              >
                Hey, I&apos;m Hardeep! <br />
              </AnimatedText>
            </GridWrapper>
            <GridWrapper>
              <div className="mt-4 text-center md:mt-8">
                <AnimatedText
                  as="p"
                  delay={PARAGRAPH_DELAY}
                  className="leading-8 text-text-secondary"
                >
                  IIT Delhi → AI Agent Builder <br /> Team Lead and Senior AI
                  Engineer at Squidgy AI (UK). I build agentic workflows that
                  run in production: multi-agent systems, MCP services, and the
                  tools agents use. Also co-founding Coffee Coach.
                </AnimatedText>
              </div>
            </GridWrapper>
          </div>
          <div>
            {/* Desktop Photos */}
            <div className="relative hidden h-fit w-full items-center justify-center lg:flex">
              <PhotoGallery animationDelay={PHOTOS_DELAY} />
            </div>

            {/* Mobile Photos */}
            <AnimatedMobilePhotos delay={PHOTOS_DELAY} />
          </div>
        </section>

        {/* About Section */}
        <section className="relative">
          {/* About */}
          <div className="relative space-y-8 text-center">
            <div className="space-y-4">
              <GridWrapper>
                <div className="text-center text-sm font-medium text-indigo-600">
                  <span>About</span>
                </div>
              </GridWrapper>
              <GridWrapper>
                <h2 className="mx-auto max-w-xl text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                  Here&apos;s a quick intro about me && what I love to do
                </h2>
              </GridWrapper>
            </div>
            <div className="relative h-fit w-full overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-full lg:right-auto lg:bottom-auto lg:left-[355px] xl:left-[455px]">
                <AboutTrackPattern />
              </div>

              {/* Section 1 */}
              <div className="grid grid-cols-1 gap-8 py-12 pr-12 lg:grid-cols-2 lg:items-center lg:justify-between lg:py-32 lg:pb-20 xl:py-32">
                <div className="flex flex-col items-center text-left lg:order-2 lg:items-start">
                  <div className="mb-8 lg:hidden">
                    <div className="relative mx-auto w-fit">
                      <ShadowBox width={188} height={278}></ShadowBox>
                      <Image
                        className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                        src="/hero.webp"
                        alt="Hardeep in a cap and puffer jacket, outdoor selfie"
                        width={180}
                        height={270}
                      />
                    </div>
                  </div>
                  <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                    From the lab to the internet
                  </h2>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                    I studied Chemical Engineering at IIT Delhi — where I learnt
                    to think in systems and optimize under constraints. What I
                    didn&apos;t expect was that the most interesting problems
                    I&apos;d encounter were messy, unstructured, and sitting
                    inside data. That&apos;s what pulled me toward software.
                  </p>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                    Now I build AI products that take that mess and make it
                    usable — pipelines, tooling, apps.
                  </p>
                </div>
                <div className="hidden lg:order-1 lg:block">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <Image
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                      src="/hero.webp"
                      alt="Hardeep Singh"
                      width={180}
                      height={270}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="grid grid-cols-1 gap-8 py-6 pr-10 lg:grid-cols-2 lg:items-center lg:justify-between lg:py-24 lg:pl-12 lg:pr-0">
                <div className="flex flex-col items-center text-left lg:items-start">
                  <div className="mb-3 lg:hidden">
                    <div className="relative mx-auto w-fit">
                      <ShadowBox width={188} height={278}></ShadowBox>
                      <Image
                        className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                        src="/looking-over-mountains.webp"
                        alt="Hardeep standing on a mountaintop overlooking a valley"
                        width={180}
                        height={270}
                      />
                    </div>
                  </div>
                  <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                    Building things I actually want to exist
                  </h2>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                    I like building things that solve problems for me, and seeing
                    them become products that other people use.{" "}
                    <AboutLink
                      href="https://coffeecoach.app"
                      className="inline-flex items-baseline gap-1 font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 transition-colors hover:text-indigo-500 hover:decoration-indigo-400"
                    >
                      CoffeeCoach
                      <svg className="inline h-3 w-3 shrink-0 self-center" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 3H9v5.5M9 3L3 9" /></svg>
                    </AboutLink>{" "}
                    took off on Reddit without a single paid promotion.{" "}
                    <AboutLink
                      href="https://github.com/rav4nn/youtube-rag-scraper"
                      className="inline-flex items-baseline gap-1 font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 transition-colors hover:text-indigo-500 hover:decoration-indigo-400"
                    >
                      youtube-rag-scraper
                      <svg className="inline h-3 w-3 shrink-0 self-center" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 3H9v5.5M9 3L3 9" /></svg>
                    </AboutLink>{" "}
                    hit {ytStats.stars} GitHub stars because apparently a lot of people had
                    the same frustration with video content being impossible to
                    query.{" "}
                    <AboutLink
                      href="https://github.com/rav4nn/flux-rag"
                      className="inline-flex items-baseline gap-1 font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 transition-colors hover:text-indigo-500 hover:decoration-indigo-400"
                    >
                      FluxRAG
                      <svg className="inline h-3 w-3 shrink-0 self-center" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 3H9v5.5M9 3L3 9" /></svg>
                    </AboutLink>{" "}
                    helped me understand RAG pipelines, eval and benchmarking
                    which is enhancing my current AI Agent centric projects.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <Image
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                      src="/looking-over-mountains.webp"
                      alt="Hardeep standing on a mountaintop overlooking a valley"
                      width={180}
                      height={270}
                    />
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="grid grid-cols-1 gap-8 py-6 pr-12 lg:grid-cols-2 lg:items-center lg:justify-between xl:py-24">
                <div className="flex flex-col items-center text-left lg:order-2 lg:items-start">
                  <div className="mb-3 lg:hidden">
                    <div className="relative mx-auto w-fit">
                      <ShadowBox width={188} height={278}></ShadowBox>
                      <Image
                        className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                        src="/surgery.webp"
                        alt="Hardeep's leg post ACL surgery, in recovery"
                        width={180}
                        height={270}
                      />
                    </div>
                  </div>
                  <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                    Life beyond the screen
                  </h2>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                    I play chess obsessively. I played football every week until
                    I tore my ACL last year. Still in recovery, still bitter
                    about it. I befriend every mountain dog I meet. And I&apos;m
                    on an ongoing, probably never-ending hunt for the best chhole
                    bhature in Delhi.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <Image
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                      src="/surgery.webp"
                      alt="ACL recovery"
                      width={180}
                      height={270}
                    />
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="grid grid-cols-1 gap-8 pr-10 lg:grid-cols-2 lg:items-center lg:justify-between lg:py-32 lg:pl-12 lg:pr-0 xl:py-24">
                <div className="flex flex-col items-center text-left lg:items-start">
                  <div className="mb-8 lg:hidden">
                    <div className="relative mx-auto w-fit">
                      <ShadowBox width={188} height={278}></ShadowBox>
                      <Image
                        className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                        src="/hero_2.webp"
                        alt="Hardeep at a café in a pink polo, holding coffee with a bookshelf behind"
                        width={180}
                        height={270}
                      />
                    </div>
                  </div>
                  <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                    Building AI agents
                  </h2>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                    At Squidgy AI I built Concierge, an MCP service that indexes
                    9 repos into a knowledge base — agents ask what lives where
                    instead of re-reading code, saving 50-100k tokens per session.
                    I also built SiteBuddy, an agent that rebuilds a website in
                    2-3 minutes for under $1 in token cost. Around 50 sites shipped.
                  </p>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                    Two concurrent contracts, 3,000+ organic users across shipped
                    products, and 75+ GitHub stars on open-source tools.{" "}
                    <AboutLink
                      href="https://github.com/rav4nn/flux-rag"
                      className="inline-flex items-baseline gap-1 font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 transition-colors hover:text-indigo-500 hover:decoration-indigo-400"
                    >
                      FluxRAG
                      <svg className="inline h-3 w-3 shrink-0 self-center" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 3H9v5.5M9 3L3 9" /></svg>
                    </AboutLink>{" "}
                    exists because I wanted to benchmark those tradeoffs properly
                    before shipping anything.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <Image
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                      src="/hero_2.webp"
                      alt="Hardeep at a café in a pink polo, holding coffee with a bookshelf behind"
                      width={180}
                      height={270}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="relative space-y-8 pt-16 text-center">
            <div className="space-y-4">
              <GridWrapper>
                <div className="text-center text-sm font-medium text-indigo-600">
                  <span>Experience</span>
                </div>
              </GridWrapper>
              <GridWrapper>
                <h2 className="mx-auto max-w-lg text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                  My work history and education timeline.
                </h2>
              </GridWrapper>
            </div>
          </div>
          <div className="space-y-16 pt-8">
            <Resume />
          </div>
        </section>

        {/* Projects Section */}
        <section className="relative space-y-10 pt-16">
          <div className="space-y-4">
            <GridWrapper>
              <div className="text-center text-sm font-medium text-indigo-600">
                <span>Projects</span>
              </div>
            </GridWrapper>
            <GridWrapper>
              <h2 className="mx-auto max-w-xl text-balance text-center text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                Things I&apos;ve built that people actually use.
              </h2>
            </GridWrapper>
          </div>

          <GridWrapper>
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <li
                  key={project.title}
                  className="flex h-full flex-col rounded-3xl border border-border-primary bg-bg-primary p-2 transition hover:border-indigo-400"
                >
                  <Link href="/projects" className="flex h-full flex-col">
                    <div className="flex h-[170px] items-center justify-center rounded-2xl border border-border-primary/60 bg-white">
                      <Image
                        src={project.logo}
                        alt={`${project.title} logo`}
                        width={80}
                        height={80}
                        className="h-20 w-20 object-contain"
                      />
                    </div>
                    <div className="my-4 flex flex-grow flex-col space-y-3 px-4">
                      <h3 className="text-lg font-medium leading-7 tracking-tight text-slate-900">
                        {project.title}
                      </h3>
                      <p className="flex-grow leading-7 text-text-secondary">
                        {project.short}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stats.slice(0, 2).map((stat) => (
                          <span
                            key={stat}
                            className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
                          >
                            {stat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </GridWrapper>

          <div className="flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full border border-border-primary bg-white px-5 py-2 text-sm font-medium text-indigo-600 hover:border-indigo-400"
            >
              See all {projects.length} projects
              <svg
                className="relative ml-2.5 mt-px overflow-visible"
                width="3"
                height="6"
                viewBox="0 0 3 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M0 0L3 3L0 6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Grid Section */}
        <section className="relative space-y-4 pb-8 md:pb-12">
          <GridWrapper>
            <GithubSection />
          </GridWrapper>

          <GridWrapper>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
              <div className="md:col-span-7 lg:col-span-7">
                <CalendarBento />
              </div>

              <div className="md:col-span-5 lg:col-span-5">
                <ToolboxBento linkTo="/toolbox" />
              </div>
            </div>
          </GridWrapper>
        </section>

        {/* Get In Touch */}
        <section>
          <GetInTouch />
        </section>
      </div>
    </section>
  );
}
