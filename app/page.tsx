import type { Metadata } from "next";
import Link from "next/link";
import { GridWrapper } from "./components/GridWrapper";
import { LaneCard } from "./components/lanes/LaneCard";
import { lanes } from "./components/lanes/lanes";

const title = "Hardeep - Small Mac apps that fix macOS";
const description =
  "CallLane, MacLane and GuardLane: small Mac apps that fix macOS. Built by Hardeep, AI engineer.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: "/hero.webp", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero.webp"],
  },
};

const footLinks = [
  { label: "Writing", href: "/blog" },
  { label: "Study", href: "/study" },
  { label: "X", href: "https://x.com/rav4nn" },
  { label: "GitHub", href: "https://github.com/rav4nn" },
] as const;

export default function Home() {
  return (
    <section className="space-y-12 pb-12 pt-12 md:space-y-16 md:pb-16 md:pt-20">
      <div className="space-y-4">
        <GridWrapper>
          <h1 className="mx-auto max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
            Small Mac apps <br /> that fix macOS.
          </h1>
        </GridWrapper>
        <GridWrapper>
          <p className="text-center leading-8 text-text-secondary">
            by Hardeep, AI engineer
          </p>
        </GridWrapper>
      </div>

      <GridWrapper>
        <ul className="grid grid-cols-1 gap-8 py-6 md:grid-cols-3 md:gap-5">
          {lanes.map((lane) => (
            <li key={lane.name}>
              <LaneCard {...lane} />
            </li>
          ))}
        </ul>
      </GridWrapper>

      <nav aria-label="More from Hardeep">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-text-secondary">
          {footLinks.map(({ label, href }) => (
            <li key={label}>
              {href.startsWith("/") ? (
                <Link href={href} className="hover:text-text-primary">
                  {label}
                </Link>
              ) : (
                <a href={href} className="hover:text-text-primary">
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
