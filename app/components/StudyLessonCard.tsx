import Link from "next/link";
import clsx from "clsx";
import {
  formatLessonNumber,
  formatStudySource,
  splitTitleAccent,
  type StudyLesson,
} from "@/app/lib/study";

type StudyLessonCardProps = {
  lesson: Pick<
    StudyLesson,
    "slug" | "lesson" | "title" | "titleAccent" | "summary" | "publishedAt" | "tags" | "source"
  >;
  className?: string;
};

export function StudyLessonCard({ lesson, className }: StudyLessonCardProps) {
  const title = splitTitleAccent(lesson.title, lesson.titleAccent);

  return (
    <li
      className={clsx(
        "flex h-full flex-col rounded-3xl border border-border-primary bg-bg-primary p-2 transition hover:border-purple-primary/60",
        className,
      )}
    >
      <Link
        href={`/study/${lesson.slug}`}
        prefetch={true}
        className="flex h-full flex-col gap-4 rounded-2xl border border-border-primary/60 bg-white p-6 text-left"
      >
        <div className="flex items-center justify-between gap-4 font-mono text-xs">
          <span className="font-semibold uppercase tracking-wider text-purple-primary">
            {formatLessonNumber(lesson.lesson)}
          </span>
          <time dateTime={lesson.publishedAt} className="text-text-secondary">
            {new Date(`${lesson.publishedAt}T00:00:00Z`).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            })}
          </time>
        </div>
        <h2 className="text-balance text-2xl font-medium leading-8 tracking-tight text-slate-900">
          {title.before}
          {title.accent && <span className="text-purple-primary">{title.accent}</span>}
          {title.after}
        </h2>
        <p className="flex-grow leading-7 text-text-secondary">{lesson.summary}</p>
        <p className="text-sm text-text-secondary">{formatStudySource(lesson.source)}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
          {lesson.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-purple-secondary px-2.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-wide text-purple-primary"
            >
              #{tag}
            </li>
          ))}
        </ul>
      </Link>
    </li>
  );
}
