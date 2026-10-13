import { getRepoStats } from "@/app/lib/stats/github-stats";

export const projectTypes = [
  "Agent tools",
  "Mac apps",
  "Products",
  "Open source",
] as const;

export type ProjectType = (typeof projectTypes)[number];

export interface Project {
  title: string;
  /** Full copy. Paragraphs split on "\n\n"; {{x}} marks highlights (parseHighlights). */
  description: string;
  /** One sentence for compact cards. */
  short: string;
  type: ProjectType;
  url: string;
  logo: string;
  stats: string[];
}

export async function getProjects(): Promise<Project[]> {
  const ytStats = await getRepoStats("rav4nn", "youtube-rag-scraper");

  return [
    {
      title: "agent-chrome",
      description:
        "Browser MCPs pull Chrome to the front mid-sentence, and they can't get into the sites you're signed in to. agent-chrome gives Claude Code a {{copy of your signed-in Chrome}} that opens {{behind your apps}} and never takes focus. You keep typing while the agent clicks.\n\nShips as a {{Claude Code plugin}}. Built on mimkorn's chrome-pipe-proxy, with background windows and per-account profiles on top.",
      short:
        "Gives Claude Code a copy of your signed-in Chrome that opens behind your apps and never takes focus.",
      type: "Agent tools",
      url: "https://agentchrome.hardeep.cv",
      logo: "/projects/agent-chrome.webp",
      stats: ["zero focus steals", "Claude Code plugin", "macOS"],
    },
    {
      title: "CallLane",
      description:
        "Join a call on a Mac and macOS drops your music by about 20 dB. Your AirPods fall back to {{headset quality}} too. CallLane is a {{menu-bar app}} that gives call apps their own audio device, so the rest of your audio {{stays at full volume}}. It locks the input to your Mac's mic, so your headphones keep {{high-quality audio}} through the call.",
      short:
        "A menu-bar app that stops macOS from turning your music down when a call starts.",
      type: "Mac apps",
      url: "https://calllane.app",
      logo: "/projects/calllane.webp",
      stats: ["no kernel extension", "macOS 14+"],
    },
    {
      title: "coffeecoach.app",
      description:
        "Most coffee brewing advice online is scattered and contradictory. I ingested high-quality brewing data, made a {{RAG pipeline}} on top of it, and built an {{agentic coaching system}} based on that data — {{LLM orchestration}} with {{feedback loops}} that adapt recommendations based on user input.\n\nWrapped it all in a {{full-stack}} AI coaching app.",
      short:
        "An agentic brewing coach on a RAG pipeline of high-quality coffee data.",
      type: "Products",
      url: "https://coffeecoach.app",
      logo: "/projects/coffee-coach.webp",
      stats: ["65 daily active users", "zero paid promotion"],
    },
    {
      title: "splitwala",
      description:
        "Can't get your friends to install the bill splitting app? This Telegram bot makes it a single command — /split, /paid, /balances. {{Lives inside your Telegram group}}. No app to download, no account to create. Built on the principle that the best UX is the one that gets out of the way.",
      short: "Bill splitting inside your Telegram group. No app to install.",
      type: "Products",
      url: "https://splitwala.hardeep.cv/",
      logo: "/projects/splitwala-removebg-preview.webp",
      stats: ["live in 117 groups", "2000+ active users"],
    },
    {
      title: "youtube-rag-scraper",
      description:
        "YouTube has some of the best domain-specific knowledge on the internet, but it's locked in video format, impossible to query or reuse. This pipeline bulk-scrapes transcripts, processes them, and structures them into a searchable {{knowledge base}} for RAG systems. Handles {{chunking}}, {{embedding}}, and {{retrieval quality}} out of the box.",
      short:
        "Turns YouTube transcripts into a searchable knowledge base for RAG.",
      type: "Open source",
      url: "https://github.com/rav4nn/youtube-rag-scraper",
      logo: "/projects/youtube-rag-scraper.webp",
      stats: [`${ytStats.stars} GitHub stars`, `${ytStats.forks} forks`],
    },
  ];
}
