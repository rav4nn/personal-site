import type { Metadata } from "next";
import { GridWrapper } from "@/app/components/GridWrapper";
import { StudyLessonCard } from "@/app/components/StudyLessonCard";
import { FollowCta } from "@/app/components/FollowCta";
import { getStudyLessons } from "@/app/lib/study";

const description =
  "Visual lessons made from talks, videos and articles, with hand-drawn figures you can step through.";

export const metadata: Metadata = {
  title: "Study | Hardeep Singh",
  description,
  alternates: { canonical: "/study" },
};

export default function StudyPage() {
  const lessons = getStudyLessons();

  return (
    <div className="mt-14 space-y-16 md:mt-16">
      <GridWrapper className="space-y-6">
        <h1 className="mx-auto max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
          Lessons from talks worth rewatching.
        </h1>
        <p className="mx-auto max-w-xl text-balance text-center leading-8 text-text-secondary">
          {description}
        </p>
      </GridWrapper>

      <GridWrapper>
        {lessons.length > 0 ? (
          <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-2">
            {lessons.map((lesson) => (
              <StudyLessonCard key={lesson.slug} lesson={lesson} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-text-secondary">Nothing to see here yet...</p>
        )}
      </GridWrapper>

      <FollowCta />
    </div>
  );
}
