"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { GridWrapper } from "./GridWrapper";
import { parseHighlights } from "./parseHighlights";
import type { Project, ProjectType } from "@/app/data/projects";

type Filter = "All" | ProjectType;

// "https://github.com/rav4nn/x/" -> "github.com/rav4nn/x"
function displayUrl(url: string): string {
  const { host, pathname } = new URL(url);
  return `${host.replace(/^www\./, "")}${pathname.replace(/\/$/, "")}`;
}

export function ProjectFilterGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  // Types in the order they first appear in the list.
  const types = Array.from(new Set(projects.map((p) => p.type)));
  const filters: { name: Filter; count: number }[] = [
    { name: "All", count: projects.length },
    ...types.map((type) => ({
      name: type,
      count: projects.filter((p) => p.type === type).length,
    })),
  ];

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map(({ name, count }) => (
          <button
            key={name}
            type="button"
            onClick={() => setFilter(name)}
            aria-pressed={filter === name}
            className={clsx(
              "rounded-full border px-3 py-1 text-xs font-medium uppercase",
              filter === name
                ? "border-dark-primary bg-dark-primary text-white"
                : "border-border-primary bg-white text-slate-600 hover:border-indigo-400",
            )}
          >
            {name} · {count}
          </button>
        ))}
      </div>

      <GridWrapper>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              wide={filter === "All" && index === 0}
            />
          ))}
        </div>
      </GridWrapper>
    </div>
  );
}

function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "group flex flex-col rounded-3xl border border-border-primary bg-bg-primary p-2 transition hover:border-indigo-400",
        wide && "md:col-span-2 md:flex-row",
      )}
    >
      <div
        className={clsx(
          "flex shrink-0 items-center justify-center rounded-2xl border border-border-primary/60 bg-white",
          wide ? "h-[220px] md:h-auto md:w-[42%]" : "h-[180px]",
        )}
      >
        <Image
          src={project.logo}
          alt={`${project.title} logo`}
          width={wide ? 112 : 80}
          height={wide ? 112 : 80}
          className={clsx(
            "object-contain transition group-hover:scale-105",
            wide ? "h-28 w-28" : "h-20 w-20",
          )}
        />
      </div>
      <div className={clsx("flex flex-1 flex-col space-y-3 p-4", wide && "md:p-8")}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wide text-text-tertiary">
            {project.type}
          </span>
          <span
            aria-hidden="true"
            className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-600"
          >
            ↗
          </span>
        </div>
        <h2
          className={clsx(
            "font-medium tracking-tight text-slate-900 group-hover:text-indigo-600",
            wide ? "text-2xl" : "text-lg",
          )}
        >
          {project.title}
        </h2>
        <p className="flex-1 leading-7 text-text-secondary">
          {wide
            ? parseHighlights(project.description.split("\n\n")[0], "bold")
            : project.short}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.stats.map((stat) => (
            <span
              key={stat}
              className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
            >
              {stat}
            </span>
          ))}
        </div>
        <div className="font-mono text-xs text-text-tertiary">
          {displayUrl(project.url)}
        </div>
      </div>
    </a>
  );
}
