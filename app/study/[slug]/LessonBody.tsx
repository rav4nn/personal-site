"use client";

import { useEffect, useMemo, useRef } from "react";
import { runLesson } from "@/app/lib/runLesson";

type LessonBodyProps = {
  html: string;
  script: string;
};

export function LessonBody({ html, script }: LessonBodyProps) {
  const ref = useRef<HTMLDivElement>(null);
  // The lesson root lives inside markup React never diffs, so the effect can
  // replace it wholesale: classes, listeners and generated nodes go with it.
  // React compares this object by identity and rewrites innerHTML when it
  // changes, which would wipe the running lesson, so it must stay stable.
  const markup = useMemo(() => ({ __html: `<div class="study-lesson">${html}</div>` }), [html]);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const teardown = runLesson(host.firstElementChild as HTMLElement, script);
    return () => {
      teardown();
      host.innerHTML = markup.__html;
    };
  }, [markup, script]);

  return <div ref={ref} dangerouslySetInnerHTML={markup} />;
}
