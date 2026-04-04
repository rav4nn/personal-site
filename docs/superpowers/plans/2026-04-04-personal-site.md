# hardeep.cv Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static bento-grid personal homepage at hardeep.cv using Next.js 14 App Router, Tailwind CSS, and Framer Motion, deployable to Cloudflare Pages.

**Architecture:** Single-page static export. `page.tsx` is a Server Component that fetches GitHub star counts at build time and passes them as props to `ProjectsCard`. All visual components are Client Components using Framer Motion. The bento grid is a 3-column Tailwind CSS grid on desktop, collapsing to 1 column on mobile.

**Tech Stack:** Next.js 14 (App Router, `output: 'export'`), TypeScript, Tailwind CSS, Framer Motion, next/font/google (Playfair Display + Inter).

**Layout (desktop, 3-col grid):**
```
[ Hero (col-span-2)          ] [ About (col-span-1)    ]
[ Photo Strip (col-span-3)                              ]
[ Projects (col-span-2,      ] [ Currently (col-span-1) ]
[   row-span-2)              ] [ IIT (col-span-1)       ]
[ Footer (col-span-3)                                   ]
```

**Asset note:** `mountains.jpg` is not present in assets — use `mountains-dog.jpg` in its place in the photo strip.

---

## File Map

| File | Purpose |
|------|---------|
| `next.config.js` | Static export config |
| `tailwind.config.js` | Design token colors |
| `app/layout.tsx` | Fonts, metadata, page wrapper |
| `app/page.tsx` | Server component: GitHub fetch + bento grid |
| `app/globals.css` | Tailwind directives + scroll animation keyframes |
| `components/HeroCard.tsx` | Hero card with photo, name, socials, CV download |
| `components/PhotoStrip.tsx` | Auto-scrolling photo strip |
| `components/ProjectsCard.tsx` | Projects list with star counts |
| `components/AboutCard.tsx` | About me text + chess photo |
| `components/CurrentlyCard.tsx` | Status card with pulsing dot |
| `components/IITCard.tsx` | IIT Delhi card |
| `components/Footer.tsx` | Footer with links |
| `public/assets/` | All images + hardeep-cv.pdf |

---

## Task 1: Scaffold Next.js 14 project

**Files:**
- Create: project root (all scaffold files)

- [ ] **Step 1: Initialize Next.js 14 with TypeScript, Tailwind, App Router**

```bash
cd /c/Users/harde/Projects/personal-site
npx create-next-app@14 . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --no-eslint
```
When prompted about existing files, choose to overwrite only generated files (keep `assets/`, `claude-code-prompt.md`).

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev &
# wait a few seconds, then kill
kill %1
```
Expected: no errors, "ready" message printed.

- [ ] **Step 4: Commit scaffold**

```bash
git add package.json package-lock.json tsconfig.json .gitignore
git commit -m "chore: scaffold Next.js 14 project with Tailwind"
```

---

## Task 2: Configure next.config.js and tailwind.config.js

**Files:**
- Modify: `next.config.js`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Set static export config in next.config.js**

Replace the entire file with:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

module.exports = nextConfig
```

- [ ] **Step 2: Extend Tailwind with design tokens**

Replace the entire `tailwind.config.ts` with:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'page-bg': '#FAF7F2',
        'card-bg': '#F0EBE3',
        'card-border': '#E8E0D5',
        'text-primary': '#1A1A1A',
        'text-muted': '#6B6560',
        'accent': '#C8956C',
        'accent-hover': '#B8845C',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Add scroll animation keyframes to globals.css**

Replace `app/globals.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@keyframes scroll-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.animate-scroll {
  animation: scroll-left 30s linear infinite;
}

.animate-scroll:hover {
  animation-play-state: paused;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

.pulse-dot {
  animation: pulse-dot 2s ease-in-out infinite;
}
```

- [ ] **Step 4: Commit config**

```bash
git add next.config.js tailwind.config.ts app/globals.css
git commit -m "chore: configure static export and Tailwind design tokens"
```

---

## Task 3: Set up app/layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write layout with fonts and metadata**

Replace `app/layout.tsx` with:
```tsx
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Hardeep Singh',
  description: 'Chemical Engineer @ IIT Delhi → building AI products that turn messy real-world data into usable systems.',
  openGraph: {
    title: 'Hardeep Singh',
    description: 'Chemical Engineer @ IIT Delhi → building AI products that turn messy real-world data into usable systems.',
    images: [{ url: '/assets/hero.jpg' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='26' font-size='28' font-family='serif' fill='%23C8956C'>H</text></svg>" />
      </head>
      <body className="bg-page-bg font-inter text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add layout with Playfair + Inter fonts and metadata"
```

---

## Task 4: Build HeroCard

**Files:**
- Create: `components/HeroCard.tsx`

- [ ] **Step 1: Create HeroCard component**

```tsx
'use client'

import { motion } from 'framer-motion'

export default function HeroCard() {
  return (
    <motion.div
      className="relative bg-card-bg border border-card-border rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
      whileHover={{ scale: 1.01, boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Open to remote tag */}
      <span className="absolute top-5 right-5 text-xs text-text-muted font-inter">
        Open to remote roles
      </span>

      {/* Photo */}
      <img
        src="/assets/hero.jpg"
        alt="Hardeep Singh"
        className="w-28 h-28 rounded-full object-cover mb-4"
      />

      {/* Name */}
      <h1 className="font-playfair text-3xl font-semibold text-text-primary mb-2">
        Hardeep Singh
      </h1>

      {/* One-liner */}
      <p className="font-inter text-base text-text-muted leading-relaxed mb-5 max-w-md">
        Chemical Engineer @ IIT Delhi → building AI products that turn messy real-world data into usable systems.
      </p>

      {/* Social pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        <a
          href="https://x.com/rav4nn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-card-border bg-page-bg text-text-muted text-sm font-inter hover:border-accent hover:text-accent transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
          </svg>
          X
        </a>
        <a
          href="https://github.com/rav4nn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-card-border bg-page-bg text-text-muted text-sm font-inter hover:border-accent hover:text-accent transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/hardeep-singh-a29a14349/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-card-border bg-page-bg text-text-muted text-sm font-inter hover:border-accent hover:text-accent transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
      </div>

      {/* Download CV */}
      <a
        href="/assets/hardeep-cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-inter font-medium rounded-full transition-colors duration-200"
      >
        Download CV
      </a>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/HeroCard.tsx
git commit -m "feat: add HeroCard component"
```

---

## Task 5: Build PhotoStrip

**Files:**
- Create: `components/PhotoStrip.tsx`

Note: `mountains.jpg` is absent from assets — substitute with `mountains-dog.jpg` (second entry).

- [ ] **Step 1: Create PhotoStrip component**

```tsx
'use client'

const images = [
  { src: '/assets/mountains-dog.jpg', alt: 'Mountains' },
  { src: '/assets/cb.jpg', alt: 'CB' },
  { src: '/assets/chess.jpg', alt: 'Chess' },
  { src: '/assets/football.jpg', alt: 'Football' },
  { src: '/assets/mountains-dog.jpg', alt: 'Mountains with dog' },
  { src: '/assets/surgery.jpg', alt: 'Surgery' },
]

// Duplicate for seamless loop
const allImages = [...images, ...images]

export default function PhotoStrip() {
  return (
    <div className="bg-card-bg border border-card-border rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="overflow-hidden">
        <div className="flex gap-3 p-4 w-max animate-scroll">
          {allImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className="h-48 w-auto object-cover rounded-xl flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/PhotoStrip.tsx
git commit -m "feat: add PhotoStrip with infinite scroll animation"
```

---

## Task 6: Build ProjectsCard

**Files:**
- Create: `components/ProjectsCard.tsx`

- [ ] **Step 1: Create ProjectsCard component**

```tsx
'use client'

import { motion } from 'framer-motion'

interface ProjectsCardProps {
  youtubeStars: number
  buildInPublicStars: number
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function MetricTag({ label }: { label: string }) {
  return (
    <span className="inline-block px-2.5 py-0.5 bg-accent text-white text-xs font-inter rounded-full">
      {label}
    </span>
  )
}

export default function ProjectsCard({ youtubeStars, buildInPublicStars }: ProjectsCardProps) {
  return (
    <motion.div
      className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] h-full"
      whileHover={{ scale: 1.01, boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <h2 className="font-playfair text-xl font-semibold text-text-primary mb-5">
        Things I&apos;ve built
      </h2>

      <div className="space-y-6">
        {/* coffeecoach.app */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-playfair text-base font-semibold text-text-primary">coffeecoach.app</h3>
            <a href="https://coffeecoach.app" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
              <ExternalLinkIcon />
            </a>
          </div>
          <p className="font-inter text-sm text-text-muted leading-relaxed mb-2">
            A full-stack app that helps people improve their coffee brewing through structured feedback and data-driven suggestions. I built it because I was personally trying to get better at brewing and realized most advice online is scattered and inconsistent — so I collected high-quality data and built a decision tree to guide brewers through it.
          </p>
          <MetricTag label="64 users in a week · zero paid promotion" />
        </div>

        {/* buildinpublic-x */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-playfair text-base font-semibold text-text-primary">buildinpublic-x</h3>
            <a href="https://github.com/rav4nn/buildinpublic-x" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
              <GitHubIcon />
            </a>
          </div>
          <p className="font-inter text-sm text-text-muted leading-relaxed mb-2">
            GitHub commits over the day → Twitter/Bluesky posts every night. Developers can build in public without the friction of manually writing updates — no server, no backend, no SaaS. The tool lives entirely inside your GitHub as an Action. LLM provider is swappable to your choice.
          </p>
          <MetricTag label={`${buildInPublicStars} stars`} />
        </div>

        {/* youtube-rag-scraper */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-playfair text-base font-semibold text-text-primary">youtube-rag-scraper</h3>
            <a href="https://github.com/rav4nn/youtube-rag-scraper" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
              <GitHubIcon />
            </a>
          </div>
          <p className="font-inter text-sm text-text-muted leading-relaxed mb-2">
            A pipeline that extracts, processes, and structures knowledge from YouTube channels for use in RAG systems. Built after realizing YouTube has some of the best domain-specific content, but it&apos;s impossible to query or reuse effectively. Turns unstructured video transcripts into something searchable for downstream AI applications.
          </p>
          <MetricTag label={`${youtubeStars} stars`} />
        </div>

        {/* splitwala */}
        <div>
          <h3 className="font-playfair text-base font-semibold text-text-primary mb-1">splitwala</h3>
          <p className="font-inter text-sm text-text-muted leading-relaxed">
            A WhatsApp chatbot that splits bills in group chats. Built out of personal need, focused on keeping the UX minimal — commands like /split, /paid, /balances. Solving a real everyday problem without overbuilding it.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ProjectsCard.tsx
git commit -m "feat: add ProjectsCard with live star count props"
```

---

## Task 7: Build AboutCard

**Files:**
- Create: `components/AboutCard.tsx`

- [ ] **Step 1: Create AboutCard component**

```tsx
'use client'

import { motion } from 'framer-motion'

export default function AboutCard() {
  return (
    <motion.div
      className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
      whileHover={{ scale: 1.01, boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <h2 className="font-playfair text-xl font-semibold text-text-primary mb-3">
        A bit about me
      </h2>
      <p className="font-inter text-sm text-text-muted leading-relaxed mb-4">
        I like building things that solve problems I actually have, and seeing them become products other people use.
      </p>
      <p className="font-inter text-sm text-text-muted leading-relaxed mb-5">
        Outside of code — I play chess obsessively, and played football every week until I tore my ACL last year (still in recovery, still bitter about it). I befriend every mountain dog I meet. I&apos;m on an ongoing, probably never-ending hunt for the best chhole bhature in Delhi.
      </p>
      <img
        src="/assets/chess.jpg"
        alt="Chess"
        className="w-full h-32 object-cover rounded-xl"
      />
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/AboutCard.tsx
git commit -m "feat: add AboutCard component"
```

---

## Task 8: Build CurrentlyCard

**Files:**
- Create: `components/CurrentlyCard.tsx`

- [ ] **Step 1: Create CurrentlyCard component**

```tsx
'use client'

import { motion } from 'framer-motion'

export default function CurrentlyCard() {
  return (
    <motion.div
      className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
      whileHover={{ scale: 1.01, boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <ul className="space-y-2.5 font-inter text-sm">
        <li className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot flex-shrink-0" />
          <span className="text-text-primary font-medium">Available for remote roles</span>
        </li>
        <li className="text-text-muted">Based in Delhi / Gurgaon</li>
        <li className="text-text-muted">Building in public → @rav4nn</li>
        <li className="text-text-muted">ACL recovery ongoing</li>
      </ul>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/CurrentlyCard.tsx
git commit -m "feat: add CurrentlyCard with pulsing status dot"
```

---

## Task 9: Build IITCard

**Files:**
- Create: `components/IITCard.tsx`

- [ ] **Step 1: Create IITCard component**

```tsx
'use client'

import { motion } from 'framer-motion'

export default function IITCard() {
  return (
    <motion.div
      className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] text-center"
      whileHover={{ scale: 1.01, boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <p className="font-inter text-xs text-text-muted uppercase tracking-wider mb-1">
        Diploma in Chemical Engineering
      </p>
      <h3 className="font-playfair text-lg font-semibold text-text-primary mb-2">
        Indian Institute of Technology, Delhi
      </h3>
      <p className="font-inter text-xs text-text-muted italic">
        The unconventional path into AI engineering.
      </p>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/IITCard.tsx
git commit -m "feat: add IITCard component"
```

---

## Task 10: Build Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Footer component**

```tsx
export default function Footer() {
  return (
    <footer className="bg-card-bg border border-card-border rounded-2xl px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-inter text-xs text-text-muted">
          Hardeep Singh · hardeep.cv
        </p>
        <div className="flex items-center gap-4">
          <a href="https://x.com/rav4nn" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
            </svg>
          </a>
          <a href="https://github.com/rav4nn" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/hardeep-singh-a29a14349/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="/assets/hardeep-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-xs text-text-muted hover:text-accent transition-colors"
          >
            Download CV
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 11: Assemble page.tsx with bento grid + GitHub API

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Write page.tsx as server component with GitHub star fetch and bento grid**

Replace `app/page.tsx` with:
```tsx
import HeroCard from '@/components/HeroCard'
import PhotoStrip from '@/components/PhotoStrip'
import ProjectsCard from '@/components/ProjectsCard'
import AboutCard from '@/components/AboutCard'
import CurrentlyCard from '@/components/CurrentlyCard'
import IITCard from '@/components/IITCard'
import Footer from '@/components/Footer'

async function getStars(repo: string, fallback: number): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: false },
    })
    if (!res.ok) return fallback
    const data = await res.json()
    return data.stargazers_count ?? fallback
  } catch {
    return fallback
  }
}

export default async function Home() {
  const [youtubeStars, buildInPublicStars] = await Promise.all([
    getStars('rav4nn/youtube-rag-scraper', 55),
    getStars('rav4nn/buildinpublic-x', 0),
  ])

  return (
    <main className="min-h-screen bg-page-bg p-4 md:p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Row 1: Hero (2 cols) + About (1 col) */}
        <div className="md:col-span-2">
          <HeroCard />
        </div>
        <div className="md:col-span-1">
          <AboutCard />
        </div>

        {/* Row 2: Photo Strip (3 cols) */}
        <div className="md:col-span-3">
          <PhotoStrip />
        </div>

        {/* Row 3+4: Projects (2 cols, tall) + Currently + IIT (1 col each) */}
        <div className="md:col-span-2 md:row-span-2">
          <ProjectsCard youtubeStars={youtubeStars} buildInPublicStars={buildInPublicStars} />
        </div>
        <div className="md:col-span-1">
          <CurrentlyCard />
        </div>
        <div className="md:col-span-1">
          <IITCard />
        </div>

        {/* Footer (3 cols) */}
        <div className="md:col-span-3">
          <Footer />
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble bento grid with GitHub star counts at build time"
```

---

## Task 12: Copy assets and verify static build

**Files:**
- Create: `public/assets/` (copy from `assets/`)

- [ ] **Step 1: Copy existing assets to public/assets**

```bash
mkdir -p public/assets
cp assets/* public/assets/
```

- [ ] **Step 2: Run static build**

```bash
npm run build
```
Expected: build succeeds, `out/` directory created with `index.html`.

- [ ] **Step 3: Spot-check the output**

```bash
ls out/
# should contain: index.html, _next/, assets/ (or similar)
```

- [ ] **Step 4: Final commit**

```bash
git add public/assets/ .gitignore
git commit -m "chore: add public assets for static export"
```

---

## Spec Coverage Check

| Spec Requirement | Task |
|---|---|
| Next.js 14, App Router, static export | Task 1, 2 |
| Tailwind design tokens (colors, fonts) | Task 2 |
| Framer Motion card hover + fade-up | Tasks 4,6,7,8,9 |
| Photo strip infinite scroll + hover pause | Task 5 |
| HeroCard with photo, name, socials, CV | Task 4 |
| ProjectsCard with GitHub stars at build time | Task 6, 11 |
| AboutCard with chess photo | Task 7 |
| CurrentlyCard with pulsing dot | Task 8 |
| IITCard centered, Playfair | Task 9 |
| Footer with links + Download CV | Task 10 |
| Bento grid 3-col desktop, 1-col mobile | Task 11 |
| Fonts: Playfair Display + Inter | Task 3 |
| Metadata: title, description, og:image | Task 3 |
| SVG favicon "H" in accent color | Task 3 |
| `<img>` tags not next/image | All component tasks |
| No dark mode, no routing, single page | Confirmed throughout |
