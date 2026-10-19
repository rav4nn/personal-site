import { afterEach, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { setTimeout as sleep } from "node:timers/promises";
import { runLesson } from "./runLesson";

class FakeObserver {
  static live = new Set<FakeObserver>();
  constructor() {
    FakeObserver.live.add(this);
  }
  observe() {}
  unobserve() {}
  disconnect() {
    FakeObserver.live.delete(this);
  }
}

beforeEach(() => {
  Object.assign(globalThis, {
    IntersectionObserver: FakeObserver,
    requestAnimationFrame: (callback: (time: number) => void) => setTimeout(() => callback(performance.now()), 1),
    cancelAnimationFrame: clearTimeout,
  });
});

afterEach(() => {
  for (const name of ["IntersectionObserver", "requestAnimationFrame", "cancelAnimationFrame"]) {
    delete (globalThis as Record<string, unknown>)[name];
  }
  FakeObserver.live.clear();
});

const LESSON = `
  lessonRoot.ticks = { interval: 0, timeout: 0, frame: 0 };
  setInterval(() => lessonRoot.ticks.interval++, 1);
  setTimeout(() => lessonRoot.ticks.timeout++, 30);
  const loop = () => { lessonRoot.ticks.frame++; requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
  new IntersectionObserver(() => {});
`;

type Ticks = { interval: number; timeout: number; frame: number };

function fakeRoot() {
  return {} as HTMLElement & { ticks: Ticks };
}

test("teardown stops every interval, timeout, frame loop and observer the lesson started", async () => {
  const root = fakeRoot();
  const teardown = runLesson(root, LESSON);
  await sleep(15);
  assert.ok(root.ticks.interval > 0, "interval ran before teardown");
  assert.ok(root.ticks.frame > 0, "frame loop ran before teardown");
  assert.equal(FakeObserver.live.size, 1);

  teardown();
  const frozen = { ...root.ticks };
  await sleep(50);
  assert.deepEqual(root.ticks, frozen, "nothing ticks after teardown");
  assert.equal(root.ticks.timeout, 0, "pending timeout never fired");
  assert.equal(FakeObserver.live.size, 0, "observer disconnected");
});

test("run, teardown, run again leaves exactly one live instance", async () => {
  const first = fakeRoot();
  runLesson(first, LESSON)();
  const second = fakeRoot();
  const teardown = runLesson(second, LESSON);
  await sleep(15);
  assert.equal(first.ticks.interval, 0, "first run stopped before it ticked");
  assert.ok(second.ticks.interval > 0, "second run is live");
  assert.equal(FakeObserver.live.size, 1);
  teardown();
});

test("a lesson can clear its own timers through the tracked names", async () => {
  const root = fakeRoot();
  const teardown = runLesson(
    root,
    `lessonRoot.ticks = { interval: 0 };
     const id = setInterval(() => { if (++lessonRoot.ticks.interval === 2) clearInterval(id); }, 1);`,
  );
  await sleep(20);
  assert.equal(root.ticks.interval, 2);
  teardown();
});
