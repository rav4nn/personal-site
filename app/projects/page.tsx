import { GridWrapper } from "@/app/components/GridWrapper";
import { GithubSection } from "@/app/components/GithubSection";
import { GetInTouch } from "@/app/components/GetInTouch";
import { ProjectFilterGrid } from "@/app/components/ProjectFilterGrid";
import { getProjects } from "@/app/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Hardeep Singh",
  description: "Open-source projects and experiments by Hardeep Singh.",
};

export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <div className="relative space-y-12">
      <div className="space-y-4 pt-16">
        <GridWrapper>
          <div className="text-center text-sm font-medium text-indigo-600">
            <span>Projects</span>
          </div>
        </GridWrapper>
        <GridWrapper>
          <h1 className="mx-auto max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
            Things I&apos;ve built that people actually use.
          </h1>
        </GridWrapper>
        <p className="mx-auto max-w-xl text-center leading-8 text-text-secondary">
          {projects.length} shipped tools and products. 3,000+ organic users,
          no paid promotion.
        </p>
      </div>

      <ProjectFilterGrid projects={projects} />

      <GridWrapper className="pt-6">
        <GithubSection />
      </GridWrapper>

      <GetInTouch />
    </div>
  );
}
