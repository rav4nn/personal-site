import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStudyLesson, getStudyLessons } from "@/app/lib/study";
import { siteMetadata } from "@/app/data/siteMetadata";
import { LessonBody } from "./LessonBody";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getStudyLessons().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const lesson = getStudyLesson((await params).slug);
  if (!lesson) return { title: "Lesson not found" };

  const url = `/study/${lesson.slug}`;
  const image = {
    url: `${url}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: lesson.title,
  };
  return {
    title: lesson.title,
    description: lesson.summary,
    alternates: { canonical: url },
    openGraph: {
      title: lesson.title,
      description: lesson.summary,
      type: "article",
      url,
      publishedTime: lesson.publishedAt,
      authors: [siteMetadata.author],
      tags: lesson.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: lesson.title,
      description: lesson.summary,
      images: [image.url],
    },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const lesson = getStudyLesson((await params).slug);
  if (!lesson) notFound();

  return (
    // The lesson carries its own side padding, so cancel the layout's mobile px-3.
    <div className="-mx-3 lg:mx-0">
      <style dangerouslySetInnerHTML={{ __html: lesson.css }} />
      <LessonBody key={lesson.slug} html={lesson.html} script={lesson.script} />
    </div>
  );
}
