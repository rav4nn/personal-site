# hardeep.cv — site copy

---

## Home page

Source of truth: `app/page.tsx`. Order: intro, Work, Projects, link row.

**Intro:** h1 "Hey, I'm Hardeep!", then the About-page track with the tilted `hero.webp` photo (track hidden below lg). Text, highlights in purple: "IIT Delhi → **AI agent builder**" / "**Team Lead and Senior AI Engineer** at **Squidgy AI**. I build **multi-agent systems** that run in production, and the **tools agents use**." / "After hours: **small Mac apps** that fix macOS, and **visual lessons** on how agents are built."

**Work** ("What I'm working on right now", AI only, links to /about): Day job (Team Lead, Squidgy AI: multi-agent systems, Concierge, SiteBuddy, ~50 client sites) · Agent tools (MacLane, GuardLane) · Learning in public (visual lessons, daily Claude Code 101 on X) · Side builds (AI-built MVPs for founders).

**Projects** ("Things I've built", links to /projects): left "Mac apps" = the three Lane cards from `app/components/lanes/lanes.ts` (CallLane Live → calllane.app; MacLane and GuardLane Coming soon, no link); right "Other things I've built" = every non-Mac project from `app/data/projects.ts` (logo, title, short line, first stat).

**Link row:** Writing (/blog) · Study (/study) · X (https://x.com/rav4nn) · GitHub (https://github.com/rav4nn)

**Meta title:** Hardeep Singh - AI agent builder
**Meta description:** Team Lead and Senior AI Engineer at Squidgy AI. I build multi-agent systems in production and small Mac apps that fix macOS.

**Nav labels:** Apps (/projects) · Writing (/blog) · Study (/study) · About (/about). The hardeep.cv logo links home. /toolbox is not in the nav.

**Site description (site-wide fallback meta):** Senior AI Engineer building production AI agents, MCP services, and full-stack AI products.

**Person details** (About page, footer, contact):
- Name: Hardeep Singh
- Email: hardeepsindia@gmail.com
- X: https://x.com/rav4nn
- GitHub: https://github.com/rav4nn
- LinkedIn: https://www.linkedin.com/in/hardeep-singh-a29a14349/
- CV: /static/hardeep-cv.pdf


---

## Projects

Source of truth: `app/data/projects.ts` (`getProjects()`). The nav calls this page "Apps". The `/projects` page shows all of them as a filterable grid: the first project as a wide card with its first paragraph, the rest with their short line.

**Projects page sub line:** "5 shipped tools and products. 3,000+ organic users, no paid promotion." *(the count comes from the list length)*

**Filters:** All · Agent tools · Mac apps · Products · Open source

**agent-chrome** — *Agent tools*
Short: Gives Claude Code a copy of your signed-in Chrome that opens behind your apps and never takes focus.
Browser MCPs pull Chrome to the front mid-sentence, and they can't get into the sites you're signed in to. agent-chrome gives Claude Code a copy of your signed-in Chrome that opens behind your apps and never takes focus. You keep typing while the agent clicks. Ships as a Claude Code plugin. Built on mimkorn's chrome-pipe-proxy, with background windows and per-account profiles on top. *(zero focus steals, Claude Code plugin, macOS)*

**CallLane** — *Mac apps*
Short: A menu-bar app that stops macOS from turning your music down when a call starts.
Join a call on a Mac and macOS drops your music by about 20 dB. Your AirPods fall back to headset quality too. CallLane is a menu-bar app that gives call apps their own audio device, so the rest of your audio stays at full volume. It locks the input to your Mac's mic, so your headphones keep high-quality audio through the call. *(no kernel extension, macOS 14+)*

**coffeecoach.app** — *Products*
Short: An agentic brewing coach on a RAG pipeline of high-quality coffee data.
Most coffee brewing advice online is scattered and contradictory. I ingested high-quality brewing data, made a RAG pipeline on top of it, and built an agentic coaching system based on that data — LLM orchestration with feedback loops that adapt recommendations based on user input. Wrapped it all in a full-stack AI coaching app. *(65 daily active users, zero paid promotion)*

**splitwala** — *Products*
Short: Bill splitting inside your Telegram group. No app to install.
Can't get your friends to install the bill splitting app? This Telegram bot makes it a single command — /split, /paid, /balances. Lives inside your Telegram group. No app to download, no account to create. Built on the principle that the best UX is the one that gets out of the way. *(live in 117 groups, 2000+ active users)*

**youtube-rag-scraper** — *Open source*
Short: Turns YouTube transcripts into a searchable knowledge base for RAG.
YouTube has some of the best domain-specific knowledge on the internet, but it's locked in video format, impossible to query or reuse. This pipeline bulk-scrapes transcripts, processes them, and structures them into a searchable knowledge base for RAG systems. Handles chunking, embedding, and retrieval quality out of the box. *(GitHub stars & forks fetched dynamically)*

---

## Blog

Source of truth: `content/blog/*.mdx` (Velite collection `posts`). The nav calls this page "Writing"; the home page links to it.

**Blog page heading:** "Notes from building agents && the tools they use."
**Blog page title:** Blog | Hardeep Singh

**Follow box** (end of the blog page, the category pages and each post; replaces the newsletter form):
- Heading: "Get the next post"
- Text: "I post every new article on X first."
- Button: "Follow @rav4nn" → https://x.com/rav4nn

**Posts:**
- *9 Mac dictation apps on my real agent prompts* (2026-10-13, #tools #mac #agents) — "I sprained my wrist, so I talk to my agents now. One recording, replayed into every app. The free one I use every day came third." Body text, numbers and takes come word for word from the dictation test results page.

---

## About me

**Heading:** "I'm Hardeep, AI agent builder && Mac app maker."
**Subheading:** "Here's a quick intro about me && what I love to do"

**Photo grid:**
- `assets/mountains-dog.jpg` *(rename your dog+Himalayas photo to this)*
- `assets/chess.jpg` — chess board
- `assets/football.jpg` — boots on turf
- `assets/cb.jpg` — chole bhature
- `assets/surgery.jpg` — ACL recovery

**From the lab to the internet:**
I studied Chemical Engineering at IIT Delhi — where I learnt to think in systems and optimize under constraints. What I didn't expect was that the most interesting problems I'd encounter were messy, unstructured, and sitting inside data. That's what pulled me toward software. Now I build AI products that take that mess and make it usable — pipelines, tooling, apps.

**Building things I actually want to exist:**
I like building things that solve problems for me, and seeing them become products that other people use. CallLane started because macOS turned my music down on every call. MacLane started because I wanted cloud agents to use my Mac while I'm away from the desk. Before those, CoffeeCoach took off on Reddit without a single paid promotion, and youtube-rag-scraper hit stars on GitHub because a lot of people had the same frustration with video content being impossible to query.

**Life beyond the screen:**
I play chess obsessively. I played football every week until I tore my ACL last year. Still in recovery, still bitter about it. I befriend every mountain dog I meet. And I'm on an ongoing, probably never-ending hunt for the best chhole bhature in Delhi.

**Building AI agents:**
I'm Team Lead and Senior AI Engineer at Squidgy AI, a UK startup. I lead the AI team and build the multi-agent systems we run for clients. I built Concierge, an MCP service that indexes 9 repos into a knowledge base, so agents ask what lives where instead of re-reading code. I also built SiteBuddy, an agent that rebuilds a website in 2-3 minutes for under $1 in token cost. Around 50 sites shipped.
Outside work I study how agents are built: harnesses, evals and prompts. I turn the best talks into visual lessons on Study and post a daily Claude Code 101 series on X. On evenings and weekends I build MVPs for founders.

---

## Experience

**Section heading:** "My work history and education timeline."

**Stealth SaaS** — Freelance (2026 – Present)
Sole engineer with end-to-end ownership — architecture, build, and production deployment of a full-stack SaaS product for a UK-based client. Scope includes AI-powered features and agentic workflows.

**Independent** — AI Engineer (2025 – Present)
AI engineering, self-directed. Built and shipped 0→1 AI products with organic growth and real user traction — coffeecoach.app (65 daily active users), youtube-rag-scraper (GitHub stars fetched dynamically), FluxRAG, buildinpublic-x, and Splitwala (2,000+ users across 117 groups). Spent 2023–24 learning the stack — Python, FastAPI, LLM APIs — before shipping the first product in early 2026.

**CovidWin** — Operations Lead (2021)
Operations Lead on a COVID-19 crisis volunteer platform. Coordinated cross-functional operations in a high-pressure environment at scale.

**Digital Marketing** — Freelance (2018 – 2024)
Independent client work across digital marketing and process engineering. Transitioned out to pursue software and AI engineering full time.

**IIT Delhi** — B.Tech, Chemical Engineering (2013 – 2018)
Chemical Engineering degree providing the analytical foundation for systems thinking and constraints-based problem solving.

---

## GitHub Stats
GitHub contribution graph + stats cards on the /projects page, showing total stars, forks, and commits (fetched dynamically).

---

## Toolbox

**Page heading:** "Software I keep in my toolbox."

**Applications:**
VSCode, Claude Code, ChatGPT, DeepSeek, Gemini, Notion, Spotify, flowtunes, GitHub, Docker, FastAPI, Porkbun, Cloudflare, Hetzner, WhatsApp, Vercel

---

## Get In Touch

**Heading:** Get in touch

**Copy:**
I'm open to AI engineering roles, contract work, and interesting problems.
If something I've built resonates, drop me a message!

Based in Delhi, India.
Open to remote.

**Contact:**
- Email: hardeepsindia@gmail.com
- CV: downloadable
- LinkedIn, X / Twitter, GitHub

---

## Footer
Built by Hardeep Singh · hardeep.cv
X · GitHub · LinkedIn

