type TimerId = ReturnType<typeof setTimeout>;
type Callback = (...args: unknown[]) => void;

// The lesson script sees these names as parameters, so the tracked versions
// shadow the globals and it needs no cleanup code of its own.
const LESSON_PARAMS = [
  "lessonRoot",
  "setInterval",
  "clearInterval",
  "setTimeout",
  "clearTimeout",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "IntersectionObserver",
] as const;

/** Runs a lesson script against `root` and returns a teardown that stops every timer, frame and observer it started. */
export function runLesson(root: HTMLElement, script: string): () => void {
  // Timeouts and intervals share one id pool, so clearTimeout stops either.
  const timers = new Set<TimerId>();
  const frames = new Set<number>();
  const observers = new Set<IntersectionObserver>();

  const lessonSetTimeout = (handler: Callback, ms?: number, ...args: unknown[]) => {
    const id = setTimeout(() => {
      timers.delete(id);
      handler(...args);
    }, ms);
    timers.add(id);
    return id;
  };
  const lessonSetInterval = (handler: Callback, ms?: number, ...args: unknown[]) => {
    const id = setInterval(handler, ms, ...args);
    timers.add(id);
    return id;
  };
  const lessonClearTimer = (id: TimerId) => {
    timers.delete(id);
    clearTimeout(id);
  };
  const lessonRequestAnimationFrame = (callback: FrameRequestCallback) => {
    const id = requestAnimationFrame((time) => {
      frames.delete(id);
      callback(time);
    });
    frames.add(id);
    return id;
  };
  const lessonCancelAnimationFrame = (id: number) => {
    frames.delete(id);
    cancelAnimationFrame(id);
  };
  class LessonIntersectionObserver extends IntersectionObserver {
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      super(callback, options);
      observers.add(this);
    }
  }

  new Function(...LESSON_PARAMS, script)(
    root,
    lessonSetInterval,
    lessonClearTimer,
    lessonSetTimeout,
    lessonClearTimer,
    lessonRequestAnimationFrame,
    lessonCancelAnimationFrame,
    LessonIntersectionObserver,
  );

  return () => {
    for (const id of timers) clearTimeout(id);
    for (const id of frames) cancelAnimationFrame(id);
    for (const observer of observers) observer.disconnect();
    timers.clear();
    frames.clear();
    observers.clear();
  };
}
