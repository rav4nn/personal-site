// Generated once from the dictation test results page (results.html). The sort fields
// (ramMb, priceFirstYear, cleanup) were added by hand for the sortable table.
// Tones: G/g = good (green), Y/w = warning (yellow), R/r = bad (red), N = no value (grey).

export type Tone = "G" | "Y" | "R" | "N";
export type TakeTone = "g" | "w" | "r";
export type AppLogo =
  | "aquavoice"
  | "superwhisper"
  | "freeflow"
  | "voiceink"
  | "willow"
  | "parakeety"
  | "typewhisper"
  | "wisprflow";

export interface SummaryRow {
  rank: number;
  app: string;
  /** File name in /public/blog/mac-dictation-apps-agent-prompts/, or null for the mic badge. */
  logo: AppLogo | null;
  /** Percent of words right, all 3 prompts. */
  accuracy: number;
  accuracyTone: Exclude<Tone, "N">;
  /** Seconds from the end of speech to the last character. */
  speed: number;
  speedTone: Exclude<Tone, "N">;
  /** Width of the speed bar in percent (the slowest app is 100). */
  speedBar: number;
  ram: string;
  /** Peak RAM in MB, or null when the app has no own process (Apple Dictation). */
  ramMb: number | null;
  ramTone: Tone;
  price: string;
  /** Cost of the first year in USD, so one-time and monthly prices sort on one scale. */
  priceFirstYear: number;
  priceTone: Tone;
  kind: string;
  /** "ai" apps clean the transcript with an LLM; "raw" apps paste it word for word. */
  cleanup: "ai" | "raw";
  /** Accuracy on prompt 1, 2 and 3. */
  byPrompt: [number, number, number];
}

/** ok = right word, wrong = red word, missing = word the app dropped (struck through). */
export interface Segment {
  kind: "ok" | "wrong" | "missing";
  text: string;
}

export interface Take {
  app: string;
  logo: AppLogo | null;
  accuracy: number;
  accuracyTone: TakeTone;
  speed: number;
  speedTone: TakeTone;
  segments: Segment[];
}

export interface PromptTakes {
  prompt: 1 | 2 | 3;
  takes: Take[];
}

export const summaryRows: SummaryRow[] = [
  {
    rank: 1,
    app: "Aqua Voice",
    logo: "aquavoice",
    accuracy: 100,
    accuracyTone: "G",
    speed: 1.8,
    speedTone: "Y",
    speedBar: 70.2,
    ram: "1.0 GB",
    ramMb: 1024,
    ramTone: "Y",
    price: "$10/mo",
    priceFirstYear: 120,
    priceTone: "Y",
    kind: "AI · Cloud",
    cleanup: "ai",
    byPrompt: [100, 99, 100],
  },
  {
    rank: 2,
    app: "Superwhisper",
    logo: "superwhisper",
    accuracy: 98,
    accuracyTone: "G",
    speed: 1.4,
    speedTone: "Y",
    speedBar: 54.4,
    ram: "213 MB",
    ramMb: 213,
    ramTone: "G",
    price: "$8.49/mo",
    priceFirstYear: 101.88,
    priceTone: "Y",
    kind: "AI · Cloud",
    cleanup: "ai",
    byPrompt: [100, 97, 98],
  },
  {
    rank: 3,
    app: "FreeFlow",
    logo: "freeflow",
    accuracy: 95,
    accuracyTone: "Y",
    speed: 2.5,
    speedTone: "R",
    speedBar: 100,
    ram: "117 MB",
    ramMb: 117,
    ramTone: "G",
    price: "Free",
    priceFirstYear: 0,
    priceTone: "G",
    kind: "AI · Cloud",
    cleanup: "ai",
    byPrompt: [86, 100, 100],
  },
  {
    rank: 4,
    app: "VoiceInk",
    logo: "voiceink",
    accuracy: 92,
    accuracyTone: "Y",
    speed: 0.7,
    speedTone: "G",
    speedBar: 29.5,
    ram: "289 MB",
    ramMb: 289,
    ramTone: "G",
    price: "$25 once",
    priceFirstYear: 25,
    priceTone: "Y",
    kind: "Raw · Mac",
    cleanup: "raw",
    byPrompt: [81, 99, 95],
  },
  {
    rank: 5,
    app: "Willow",
    logo: "willow",
    accuracy: 92,
    accuracyTone: "Y",
    speed: 1.2,
    speedTone: "Y",
    speedBar: 47.2,
    ram: "273 MB",
    ramMb: 273,
    ramTone: "G",
    price: "$15/mo",
    priceFirstYear: 180,
    priceTone: "R",
    kind: "AI · Cloud",
    cleanup: "ai",
    byPrompt: [100, 83, 93],
  },
  {
    rank: 6,
    app: "Parakeety",
    logo: "parakeety",
    accuracy: 91,
    accuracyTone: "Y",
    speed: 0.6,
    speedTone: "G",
    speedBar: 22.5,
    ram: "548 MB",
    ramMb: 548,
    ramTone: "G",
    price: "$25 once",
    priceFirstYear: 25,
    priceTone: "Y",
    kind: "Raw · Mac",
    cleanup: "raw",
    byPrompt: [81, 99, 93],
  },
  {
    rank: 7,
    app: "TypeWhisper",
    logo: "typewhisper",
    accuracy: 90,
    accuracyTone: "Y",
    speed: 0.6,
    speedTone: "G",
    speedBar: 24.3,
    ram: "191 MB",
    ramMb: 191,
    ramTone: "G",
    price: "Free",
    priceFirstYear: 0,
    priceTone: "G",
    kind: "Raw · Mac",
    cleanup: "raw",
    byPrompt: [76, 99, 96],
  },
  {
    rank: 8,
    app: "Apple Dictation",
    logo: null,
    accuracy: 89,
    accuracyTone: "R",
    speed: 0.8,
    speedTone: "G",
    speedBar: 31.7,
    ram: "macOS",
    ramMb: null,
    ramTone: "N",
    price: "Free",
    priceFirstYear: 0,
    priceTone: "G",
    kind: "Raw · Mac",
    cleanup: "raw",
    byPrompt: [76, 100, 92],
  },
  {
    rank: 9,
    app: "Wispr Flow",
    logo: "wisprflow",
    accuracy: 88,
    accuracyTone: "R",
    speed: 1.2,
    speedTone: "Y",
    speedBar: 49.8,
    ram: "1.6 GB",
    ramMb: 1638,
    ramTone: "R",
    price: "$15/mo",
    priceFirstYear: 180,
    priceTone: "R",
    kind: "AI · Cloud",
    cleanup: "ai",
    byPrompt: [81, 96, 87],
  },
];

export const promptTakes: PromptTakes[] = [
  {
    prompt: 1,
    takes: [
      {
        app: "Willow",
        logo: "willow",
        accuracy: 100,
        accuracyTone: "g",
        speed: 1,
        speedTone: "w",
        segments: [
          {
            kind: "ok",
            text: "Are the sub-agents done yet? When they finish, email the summary to hardeep@coffeecoach.app and tell me if anything crashed.",
          },
        ],
      },
      {
        app: "Superwhisper",
        logo: "superwhisper",
        accuracy: 100,
        accuracyTone: "g",
        speed: 1,
        speedTone: "w",
        segments: [
          {
            kind: "ok",
            text: "Are the sub-agents done yet? When they finish, email the summary to hardeep@coffeecoach.app and tell me if anything crashed.",
          },
        ],
      },
      {
        app: "Aqua Voice",
        logo: "aquavoice",
        accuracy: 100,
        accuracyTone: "g",
        speed: 1.3,
        speedTone: "w",
        segments: [
          {
            kind: "ok",
            text: "Are the sub-agents done yet? When they finish, email the summary to hardeep@coffeecoach.app and tell me if anything crashed.",
          },
        ],
      },
      {
        app: "FreeFlow",
        logo: "freeflow",
        accuracy: 86,
        accuracyTone: "r",
        speed: 2.1,
        speedTone: "r",
        segments: [
          {
            kind: "ok",
            text: "Are the subagents done yet? When they finish, email the summary to Hardeep ",
          },
          {
            kind: "wrong",
            text: "at",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "the",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "address",
          },
          {
            kind: "ok",
            text: " coffeecoach.app and tell me if anything crashed.",
          },
        ],
      },
      {
        app: "Parakeety",
        logo: "parakeety",
        accuracy: 81,
        accuracyTone: "r",
        speed: 0.5,
        speedTone: "g",
        segments: [
          {
            kind: "ok",
            text: "Are the subagents done yet? When they finish, email the summary to ",
          },
          {
            kind: "wrong",
            text: "Hardip",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "at",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "the",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "ratecoffeecoach.app",
          },
          {
            kind: "ok",
            text: " and tell me if anything crashed.",
          },
        ],
      },
      {
        app: "VoiceInk",
        logo: "voiceink",
        accuracy: 81,
        accuracyTone: "r",
        speed: 0.7,
        speedTone: "g",
        segments: [
          {
            kind: "ok",
            text: "Are the subagents done yet? When they finish, email the summary to ",
          },
          {
            kind: "wrong",
            text: "Hardib",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "at",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "the",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "ratecoffeecoach.app",
          },
          {
            kind: "ok",
            text: " and tell me if anything crashed.",
          },
        ],
      },
      {
        app: "Wispr Flow",
        logo: "wisprflow",
        accuracy: 81,
        accuracyTone: "r",
        speed: 1.1,
        speedTone: "w",
        segments: [
          {
            kind: "ok",
            text: "Are the subagents done yet? When they finish, email the summary to ",
          },
          {
            kind: "wrong",
            text: "hardeep@theRateCoffeeCoach.app",
          },
          {
            kind: "ok",
            text: " and tell me if anything crashed.",
          },
        ],
      },
      {
        app: "TypeWhisper",
        logo: "typewhisper",
        accuracy: 76,
        accuracyTone: "r",
        speed: 0.6,
        speedTone: "g",
        segments: [
          {
            kind: "ok",
            text: "Are the ",
          },
          {
            kind: "wrong",
            text: "sub",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "agents",
          },
          {
            kind: "ok",
            text: " done yet? When they finish, email the summary to Hardeep ",
          },
          {
            kind: "wrong",
            text: "at",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "the",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "ratecoffeecoach.app",
          },
          {
            kind: "ok",
            text: " and tell me if anything crashed",
          },
        ],
      },
      {
        app: "Apple Dictation",
        logo: null,
        accuracy: 76,
        accuracyTone: "r",
        speed: 0.8,
        speedTone: "g",
        segments: [
          {
            kind: "ok",
            text: "Are the sub-agents done yet when they finish email the summary to Hardeep ",
          },
          {
            kind: "wrong",
            text: "at",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "the",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "right",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "coffee",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "coach.app",
          },
          {
            kind: "ok",
            text: " and tell me if anything crashed?",
          },
        ],
      },
    ],
  },
  {
    prompt: 2,
    takes: [
      {
        app: "Apple Dictation",
        logo: null,
        accuracy: 100,
        accuracyTone: "g",
        speed: 0.8,
        speedTone: "g",
        segments: [
          {
            kind: "ok",
            text: "Do deep research about the most popular apps to use, and also open in agent chrome primary the links to download all of them. I will return in half an hour to do the testing and make the video. Also, if you have any hooks for the video and this short prompted style script that I like, you can write that as well, but don't make it too long. I will handle most of the script myself",
          },
        ],
      },
      {
        app: "FreeFlow",
        logo: "freeflow",
        accuracy: 100,
        accuracyTone: "g",
        speed: 2.5,
        speedTone: "r",
        segments: [
          {
            kind: "ok",
            text: "Do deep research about the most popular apps to use, and also open in AgentChrome Primary the links to download all of them. I will return in half an hour to do the testing and make the video. Also, if you have any hooks for the video and this short prompted style script that I like, you can write that as well. But don't make it too long. I will handle most of the script myself.",
          },
        ],
      },
      {
        app: "Parakeety",
        logo: "parakeety",
        accuracy: 99,
        accuracyTone: "g",
        speed: 0.6,
        speedTone: "g",
        segments: [
          {
            kind: "ok",
            text: "Do deep research about the most popular apps to use and also open in Agent Chrome Primary the links to download all of them. I will return in half an hour to do the testing and make the video. Also, if you have any hooks for the video and ",
          },
          {
            kind: "wrong",
            text: "the",
          },
          {
            kind: "ok",
            text: " short prompted style script that I like, you can write that as well, but don't make it too long. I will handle most of the script myself.",
          },
        ],
      },
      {
        app: "TypeWhisper",
        logo: "typewhisper",
        accuracy: 99,
        accuracyTone: "g",
        speed: 0.6,
        speedTone: "g",
        segments: [
          {
            kind: "ok",
            text: "Do deep research about the most popular apps to use and also open in Agent Chrome Primary the links to download all of them. I will return in half an hour to do the testing and make the video. Also, if you have any hooks for the video and ",
          },
          {
            kind: "wrong",
            text: "the",
          },
          {
            kind: "ok",
            text: " short prompted style script that I like you can write that as well but don't make it too long. I will handle most of the script myself.",
          },
        ],
      },
      {
        app: "VoiceInk",
        logo: "voiceink",
        accuracy: 99,
        accuracyTone: "g",
        speed: 0.8,
        speedTone: "g",
        segments: [
          {
            kind: "ok",
            text: "Do deep research about the most popular apps to use and also open in Agent Chrome Primary the links to download all of them. I will return in half an hour to do the testing and make the video. Also if you have any hooks for the video and ",
          },
          {
            kind: "wrong",
            text: "the",
          },
          {
            kind: "ok",
            text: " short prompted style script that I like you can write that as well but don't make it too long. I will handle most of the script myself.",
          },
        ],
      },
      {
        app: "Aqua Voice",
        logo: "aquavoice",
        accuracy: 99,
        accuracyTone: "g",
        speed: 1.8,
        speedTone: "w",
        segments: [
          {
            kind: "ok",
            text: "Do deep research about the most popular apps to use, and also open in Agent Chrome Primary the links to download all of them. I will return in half an hour to do the testing and make the video. Also, if you have any hooks for the video and ",
          },
          {
            kind: "wrong",
            text: "the",
          },
          {
            kind: "ok",
            text: " short prompted style script that I like, you can write that as well, but don't make it too long. I will handle most of the script myself.",
          },
        ],
      },
      {
        app: "Superwhisper",
        logo: "superwhisper",
        accuracy: 97,
        accuracyTone: "g",
        speed: 1.4,
        speedTone: "w",
        segments: [
          {
            kind: "ok",
            text: "Do deep research about the most popular apps to use and also open in agent chrome primary the links to download all of them. I will return in half an hour to do the testing and make the video. Also, if you have any hooks for the video and this short prompted style script that I like, you can write that as well but don't make it too long. ",
          },
          {
            kind: "wrong",
            text: "I'll",
          },
          {
            kind: "ok",
            text: " handle most of the script myself. ",
          },
          {
            kind: "missing",
            text: "i",
          },
        ],
      },
      {
        app: "Wispr Flow",
        logo: "wisprflow",
        accuracy: 96,
        accuracyTone: "w",
        speed: 1.2,
        speedTone: "w",
        segments: [
          {
            kind: "ok",
            text: "Do deep research about the most popular apps to use, and also open in Agent Chrome, ",
          },
          {
            kind: "wrong",
            text: "primarily",
          },
          {
            kind: "ok",
            text: " the links to download all of them. I will return in half an hour to do the testing and make the video. Also, if you have any hooks for the video and ",
          },
          {
            kind: "wrong",
            text: "the",
          },
          {
            kind: "ok",
            text: " short ",
          },
          {
            kind: "wrong",
            text: "prompt",
          },
          {
            kind: "ok",
            text: " style script that I like, you can write that as well, but don't make it too long. I will handle most of the script myself.",
          },
        ],
      },
      {
        app: "Willow",
        logo: "willow",
        accuracy: 83,
        accuracyTone: "r",
        speed: 1.1,
        speedTone: "w",
        segments: [
          {
            kind: "ok",
            text: "Do deep research about the most popular apps to use, and also open in agent Chrome primary the links to download all of them. I will return in half an hour to do the testing and make the video. Also, if you have any hooks for the video ",
          },
          {
            kind: "wrong",
            text: "and",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "the",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "Rewrite",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "the",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "following",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "text",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "to",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "be",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "as",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "concise",
          },
          {
            kind: "ok",
            text: " and ",
          },
          {
            kind: "wrong",
            text: "compact",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "as",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "possible",
          },
          {
            kind: "ok",
            text: " style script that I like, you can write that as well, but don't make it too long. I will handle most of the script myself.",
          },
        ],
      },
    ],
  },
  {
    prompt: 3,
    takes: [
      {
        app: "Aqua Voice",
        logo: "aquavoice",
        accuracy: 100,
        accuracyTone: "g",
        speed: 2.1,
        speedTone: "r",
        segments: [
          {
            kind: "ok",
            text: "Okay, so I want to ship the next call lane release today. Bump the version to 1.4, build the DMG, sign it and notarize it, then upload it to the R2 bucket. After that, update latest..json with the new version and purge both URLs on Cloudflare because the DMG link is cached for four hours. If notarization fails again with that entitlements error, don't try to fix it yourself. Just stop and tell me what Apple said. Also write a short changelog from the commits since the last tag. I will check back after lunch.",
          },
        ],
      },
      {
        app: "FreeFlow",
        logo: "freeflow",
        accuracy: 100,
        accuracyTone: "g",
        speed: 2.9,
        speedTone: "r",
        segments: [
          {
            kind: "ok",
            text: "Ok, so I want to ship the next CallLane release today, bump the version to 1.4, build the DMG, sign it and notarize it, then upload it to the R2 bucket. After that, update latest.json with the new version and purge both URLs on Cloudflare because the DMG link is cached for 4 hours. If notarization fails again with that entitlements error, don't try to fix it yourself, just stop and tell me what Apple said. Also write a short changelog from the commits since the last tag. I will check back after lunch.",
          },
        ],
      },
      {
        app: "Superwhisper",
        logo: "superwhisper",
        accuracy: 98,
        accuracyTone: "g",
        speed: 1.6,
        speedTone: "w",
        segments: [
          {
            kind: "ok",
            text: "Okay, so I want to ship the next call ",
          },
          {
            kind: "wrong",
            text: "in",
          },
          {
            kind: "ok",
            text: " release today, bump the version to 1.4, build the DMG, sign it, and notarize it, then upload it to the R2 bucket. After that, update latest dot JSON with the new version and purge both URLs on Cloudflare because the ",
          },
          {
            kind: "wrong",
            text: "DMZ",
          },
          {
            kind: "ok",
            text: " link is cached for 4 hours. If notarization fails again with that entitlements error, don't try to fix it yourself; just stop and tell me what Apple said. Also, write a short changelog from the commits since the last tag. I will check back after lunch.",
          },
        ],
      },
      {
        app: "TypeWhisper",
        logo: "typewhisper",
        accuracy: 96,
        accuracyTone: "w",
        speed: 0.6,
        speedTone: "g",
        segments: [
          {
            kind: "ok",
            text: "Okay, so I want to ship the next call ",
          },
          {
            kind: "wrong",
            text: "in",
          },
          {
            kind: "ok",
            text: " release today, bump the version to 1.4, build the DMG, sign it and notarize it, then upload it to the R2 bucket. After that, update latest dot JSON with the new version and purge both URLs on Cloudflare because the DMG link is ",
          },
          {
            kind: "wrong",
            text: "cacheted",
          },
          {
            kind: "ok",
            text: " for four hours. If notarization fails again with that entitlements error don't try to fix it yourself. Just stop and tell me what Apple said. Also write a short ",
          },
          {
            kind: "wrong",
            text: "change",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "log",
          },
          {
            kind: "ok",
            text: " from the commits since the last tag. I will check back after lunch.",
          },
        ],
      },
      {
        app: "VoiceInk",
        logo: "voiceink",
        accuracy: 95,
        accuracyTone: "w",
        speed: 0.8,
        speedTone: "g",
        segments: [
          {
            kind: "ok",
            text: "Okay so I want to ship the next call ",
          },
          {
            kind: "wrong",
            text: "in",
          },
          {
            kind: "ok",
            text: " release today, bump the version to 1.4, build the DMG, sign it and notarize it, then upload it to the R2 bucket. After that update latest.json with the new version and purge both URLs on Cloudflare because the DMG link is ",
          },
          {
            kind: "wrong",
            text: "cacheted",
          },
          {
            kind: "ok",
            text: " for four hours. If notarization fails again with that entitlements error don't try to fix it yourself. Just stop and tell me what Apple said. ",
          },
          {
            kind: "wrong",
            text: "So",
          },
          {
            kind: "ok",
            text: " write a short ",
          },
          {
            kind: "wrong",
            text: "change",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "log",
          },
          {
            kind: "ok",
            text: " from the commits since the last tag. I will check back after lunch.",
          },
        ],
      },
      {
        app: "Parakeety",
        logo: "parakeety",
        accuracy: 93,
        accuracyTone: "w",
        speed: 0.6,
        speedTone: "g",
        segments: [
          {
            kind: "ok",
            text: "Okay, so I want to ship the next call ",
          },
          {
            kind: "wrong",
            text: "in",
          },
          {
            kind: "ok",
            text: " release today, bump the version to 1.4, build the DMG, sign it and notarize it, then upload it to the R2 bucket. After that, update latest dot ",
          },
          {
            kind: "wrong",
            text: "JS",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "withO",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "theN",
          },
          {
            kind: "ok",
            text: " new version and purge both URLs on Cloudflare because the DMG link is ",
          },
          {
            kind: "wrong",
            text: "cacheted",
          },
          {
            kind: "ok",
            text: " for four hours. If notarization fails again with that entitlements error don't try to fix it yourself. Just stop and tell me what Apple said. Also, write a short ",
          },
          {
            kind: "wrong",
            text: "change",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "log",
          },
          {
            kind: "ok",
            text: " from the commits since the last tag. I will check back after lunch.",
          },
        ],
      },
      {
        app: "Willow",
        logo: "willow",
        accuracy: 93,
        accuracyTone: "w",
        speed: 1.4,
        speedTone: "w",
        segments: [
          {
            kind: "ok",
            text: "Okay, I want to ship the next ",
          },
          {
            kind: "wrong",
            text: "Corlion",
          },
          {
            kind: "ok",
            text: " release today: - Bump the version to 1.4 - Build the DMG - Sign it - Notarize it - Upload it to the R2 bucket After that, update latest.json with the new version and purge both URLs on Cloudflare because the DMG link is cached for four hours. If notarization fails again with that entitlements error, don't try to fix it yourself. Just stop and tell me what Apple said. Also, write a short ",
          },
          {
            kind: "wrong",
            text: "change",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "log",
          },
          {
            kind: "ok",
            text: " from the commits since the last tag. I will check back after lunch. ",
          },
          {
            kind: "missing",
            text: "so call and then",
          },
        ],
      },
      {
        app: "Apple Dictation",
        logo: null,
        accuracy: 92,
        accuracyTone: "w",
        speed: 0.8,
        speedTone: "g",
        segments: [
          {
            kind: "ok",
            text: "okay, so I want to ship the next call ",
          },
          {
            kind: "wrong",
            text: "in",
          },
          {
            kind: "ok",
            text: " release today. Bump the version to 1.4, build the DMG, sign it, and ",
          },
          {
            kind: "wrong",
            text: "notarise",
          },
          {
            kind: "ok",
            text: " it, then upload it to the R2 bucket. After that, update ",
          },
          {
            kind: "wrong",
            text: "latest.Jason",
          },
          {
            kind: "ok",
            text: " with the new version and purge both URLs on Cloudflare because the DMG link is ",
          },
          {
            kind: "wrong",
            text: "cache-aid",
          },
          {
            kind: "ok",
            text: " for four hours. If ",
          },
          {
            kind: "wrong",
            text: "notarisation",
          },
          {
            kind: "ok",
            text: " fails again with that entitlements error, don't try to fix it yourself. Just stop and tell me what Apple said. Also, write a short ",
          },
          {
            kind: "wrong",
            text: "change",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "log",
          },
          {
            kind: "ok",
            text: " from the commits since the last tag. I will check back after lunch.",
          },
        ],
      },
      {
        app: "Wispr Flow",
        logo: "wisprflow",
        accuracy: 87,
        accuracyTone: "r",
        speed: 1.4,
        speedTone: "w",
        segments: [
          {
            kind: "ok",
            text: "I want to ship the next CallLane release today. ",
          },
          {
            kind: "wrong",
            text: "1.",
          },
          {
            kind: "ok",
            text: " Bump the version to 1.4. ",
          },
          {
            kind: "wrong",
            text: "2.",
          },
          {
            kind: "ok",
            text: " Build the DMG. ",
          },
          {
            kind: "wrong",
            text: "3.",
          },
          {
            kind: "ok",
            text: " Sign it and notarize it. ",
          },
          {
            kind: "wrong",
            text: "4.",
          },
          {
            kind: "ok",
            text: " Upload it to the R2 bucket. ",
          },
          {
            kind: "wrong",
            text: "5.",
          },
          {
            kind: "ok",
            text: " Update latest.json with the new version. ",
          },
          {
            kind: "wrong",
            text: "6.",
          },
          {
            kind: "ok",
            text: " Purge both URLs on Cloudflare because the DMG link is cached for 4 hours. ",
          },
          {
            kind: "wrong",
            text: "7.",
          },
          {
            kind: "ok",
            text: " If notarization fails again with that entitlements error, don't try to fix it yourself. Just stop and tell me what Apple said. ",
          },
          {
            kind: "wrong",
            text: "8.",
          },
          {
            kind: "ok",
            text: " Write a short ",
          },
          {
            kind: "wrong",
            text: "change",
          },
          {
            kind: "ok",
            text: " ",
          },
          {
            kind: "wrong",
            text: "log",
          },
          {
            kind: "ok",
            text: " from the commits since the last tag. I will check back after lunch. ",
          },
          {
            kind: "missing",
            text: "okay so after",
          },
        ],
      },
    ],
  },
];
