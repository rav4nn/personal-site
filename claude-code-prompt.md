# Claude Code Prompt — hardeep.cv

Build my personal website at hardeep.cv using Next.js 14 (App Router, static export) and Tailwind CSS. This is a personal homepage, not a traditional CV — it should feel human and warm, like a person not a product.

---

## Tech Stack

- Next.js 14, App Router
- Tailwind CSS
- Framer Motion for animations
- next/font/google for typography
- Static export: `output: 'export'` and `images: { unoptimized: true }` in next.config.js
- Deploy target: Cloudflare Pages (static, no server)

---

## Design System

**Color palette:**
- Page background: `#FAF7F2` (warm off-white, parchment)
- Card background: `#F0EBE3`
- Card border: `1px solid #E8E0D5`
- Primary text: `#1A1A1A`
- Muted text: `#6B6560`
- Accent: `#C8956C` (dusty coffee/terracotta)
- Accent hover: `#B8845C`

**Typography (via next/font/google):**
- Headings: Playfair Display (weights: 400, 600)
- Body: Inter (weights: 400, 500)

**Card style:**
- Border radius: 16px
- Subtle box shadow: `0 1px 3px rgba(0,0,0,0.06)`
- 1px warm border
- Padding: 24px inside each card

**Animations (Framer Motion):**
- All cards fade up on scroll into view, staggered by 0.1s delay between cards
- Card hover: scale 1.01, shadow deepens slightly, transition 200ms ease
- Photo strip: infinite horizontal auto-scroll, pauses on hover
- No jarring animations, nothing faster than 200ms, nothing that animates on first load except a single subtle page fade-in

---

## Layout — Bento Grid

Responsive bento grid. On desktop: 3-column grid with cards spanning different column widths. On mobile: single column stack.

### Card 1 — HERO (spans 2 cols, large)
- Circular photo: `public/assets/hero.jpg`, ~120px diameter
- Name: **Hardeep Singh** (Playfair Display, large)
- One-liner: "Chemical Engineer @ IIT Delhi → building AI products that turn messy real-world data into usable systems."
- Social links as small pill buttons with icons:
  - X → https://x.com/rav4nn
  - GitHub → https://github.com/rav4nn
  - LinkedIn → https://www.linkedin.com/in/hardeep-singh-a29a14349/
- "Download CV" button in accent color → `/assets/hardeep-cv.pdf` (opens in new tab)
- Small tag in top right corner of card: "Open to remote roles" in muted text, small font

### Card 2 — PHOTO STRIP (full width, spans 3 cols)
Infinite horizontal auto-scrolling strip. Images side by side with small gap, rounded corners (12px). Duplicates the array to create seamless loop. Pauses on hover.
Images in order:
1. `public/assets/mountains.jpg`
2. `public/assets/cb.jpg`
3. `public/assets/chess.jpg`
4. `public/assets/football.jpg`
5. `public/assets/mountains-dog.jpg`
6. `public/assets/surgery.jpg`

Each image: height 200px, width auto, object-fit cover.

### Card 3 — PROJECTS (spans 2 cols, tall)
Header: "Things I've built"
Four project entries, each with:
- Project name (Playfair Display, medium weight)
- Description
- Metric tag (small pill, accent background, light text) where applicable
- External link icon where applicable

Project content (use exactly this copy):

**coffeecoach.app**
A full-stack app that helps people improve their coffee brewing through structured feedback and data-driven suggestions. I built it because I was personally trying to get better at brewing and realized most advice online is scattered and inconsistent — so I collected high-quality data and built a decision tree to guide brewers through it.
Metric tag: "64 users in a week · zero paid promotion"
Link: https://coffeecoach.app

**buildinpublic-x**
GitHub commits over the day → Twitter/Bluesky posts every night. Developers can build in public without the friction of manually writing updates — no server, no backend, no SaaS. The tool lives entirely inside your GitHub as an Action. LLM provider is swappable to your choice.
GitHub: https://github.com/rav4nn/buildinpublic-x
Metric tag: "[live star count] stars" — fetch from GitHub API at build time

**youtube-rag-scraper**
A pipeline that extracts, processes, and structures knowledge from YouTube channels for use in RAG systems. Built after realizing YouTube has some of the best domain-specific content, but it's impossible to query or reuse effectively. Turns unstructured video transcripts into something searchable for downstream AI applications.
GitHub: https://github.com/rav4nn/youtube-rag-scraper
Metric tag: "[live star count] stars" — fetch from GitHub API at build time

**splitwala**
A WhatsApp chatbot that splits bills in group chats. Built out of personal need, focused on keeping the UX minimal — commands like /split, /paid, /balances. Solving a real everyday problem without overbuilding it.

### Card 4 — ABOUT (spans 1 col)
Header: "A bit about me"
Body copy (use exactly this):
"I like building things that solve problems I actually have, and seeing them become products other people use.

Outside of code — I play chess obsessively, and played football every week until I tore my ACL last year (still in recovery, still bitter about it). I befriend every mountain dog I meet. I'm on an ongoing, probably never-ending hunt for the best chhole bhature in Delhi."

Small rounded photo inside the card below the text: `public/assets/chess.jpg`

### Card 5 — CURRENTLY (spans 1 col, small)
A small status card styled like a live status indicator with a subtle pulsing green dot.
Content:
- 🟢 "Available for remote roles"
- "Based in Delhi / Gurgaon"
- "Building in public → @rav4nn"
- "ACL recovery ongoing"

### Card 6 — IIT DELHI TAG (spans 1 col, small)
Clean minimal card, centered text:
- "Diploma in Chemical Engineering"
- **Indian Institute of Technology, Delhi** (Playfair Display)
- Muted subtext: "The unconventional path into AI engineering."

### Card 7 — FOOTER (full width, spans 3 cols)
- Left: "Hardeep Singh · hardeep.cv"
- Right: X, GitHub, LinkedIn icon links + "Download CV" text link → `/assets/hardeep-cv.pdf`
- Muted warm background, small text

---

## GitHub API Integration

At build time (server component), fetch live star counts for two repos:

```js
// fetch from https://api.github.com/repos/{owner}/{repo}
// use response.stargazers_count
// repos: rav4nn/youtube-rag-scraper, rav4nn/buildinpublic-x
// fallback if fetch fails: youtube-rag-scraper → 55, buildinpublic-x → 0
```

Pass star counts as props to ProjectsCard. No client-side fetching.

---

## File Structure

```
/app
  layout.tsx        ← fonts, metadata, bg color
  page.tsx          ← bento grid, imports all cards
/components
  HeroCard.tsx
  PhotoStrip.tsx
  ProjectsCard.tsx
  AboutCard.tsx
  CurrentlyCard.tsx
  IITCard.tsx
  Footer.tsx
/public/assets
  hero.jpg
  mountains.jpg
  mountains-dog.jpg
  chess.jpg
  football.jpg
  cb.jpg
  surgery.jpg
  hardeep-cv.pdf
next.config.js      ← output: 'export', images: { unoptimized: true }
tailwind.config.js  ← extend colors with the palette above
```

---

## Additional Notes

- No dark mode
- No blog, no routing — single page only
- Use standard `<img>` tags not next/image (static export requirement)
- Mobile: single column stack, photo strip still scrolls
- Meta tags in layout.tsx: title "Hardeep Singh", description from the one-liner, og:image pointing to hero.jpg
- Favicon: SVG with letter "H" in accent color `#C8956C`
- Do not ask clarifying questions — make decisions and build