import { Button } from "./components/Button";
import { GridWrapper } from "./components/GridWrapper";

export default function NotFound() {
  return (
    <section className="space-y-8 py-24 text-center md:py-32">
      <title>Page not found | Hardeep Singh</title>
      <GridWrapper>
        <p className="text-sm font-medium text-indigo-600">404</p>
      </GridWrapper>
      <GridWrapper>
        <h1 className="mx-auto max-w-xl text-balance text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-5xl">
          This page doesn&apos;t exist.
        </h1>
      </GridWrapper>
      <div className="flex justify-center gap-4">
        <Button href="/" variant="primary">
          Go home
        </Button>
        <Button href="/blog" variant="secondary">
          Read the blog
        </Button>
      </div>
    </section>
  );
}
