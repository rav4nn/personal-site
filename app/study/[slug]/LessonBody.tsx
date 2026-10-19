"use client";

import { useEffect, useRef } from "react";

type LessonBodyProps = {
  html: string;
  script: string;
};

export function LessonBody({ html, script }: LessonBodyProps) {
  const ref = useRef<HTMLDivElement>(null);

  // next/script dedupes by id, so it would not re-run after a client-side
  // navigation back to the lesson. The data attribute stops the strict-mode
  // double effect from wiring the same DOM twice.
  useEffect(() => {
    const root = ref.current;
    if (!root || root.dataset.lessonReady) return;
    root.dataset.lessonReady = "true";
    new Function("lessonRoot", script)(root);
  }, [script]);

  return (
    <div
      ref={ref}
      className="study-lesson"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
