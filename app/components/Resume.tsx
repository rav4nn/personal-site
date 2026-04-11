import { Timeline } from "./Timeline";
import { parseHighlights } from "./Highlight";

interface ResumeProps {
  ytStars?: number;
}

export function Resume({ ytStars = 62 }: ResumeProps) {
  const experiences = [
    {
      company: "Stealth SaaS",
      period: "2026 – Present",
      title: "Freelance",
      description: [
        `Sole engineer with {{end-to-end ownership}} — architecture, build, and production deployment of a {{full-stack SaaS}} product for a UK-based client. Scope includes AI-powered features and agentic workflows.`,
      ],
    },
    {
      company: "Independent",
      period: "2025 – Present",
      title: "AI Engineer",
      description: [
        `AI engineering, self-directed. Built and shipped {{0→1}} AI products with {{organic growth}} and real user traction — coffeecoach.app (65 daily active users), youtube-rag-scraper (${ytStars} GitHub stars), FluxRAG, buildinpublic-x, and Splitwala (2,000+ users across 117 groups).`,
        `Spent 2023–24 learning the stack — Python, FastAPI, LLM APIs — before shipping the first product in early 2026.`,
      ],
    },
    {
      company: "CovidWin",
      period: "2021",
      title: "Operations Lead",
      description: [
        `Operations Lead on a COVID-19 crisis volunteer platform. Coordinated cross-functional operations in a high-pressure environment at scale.`,
      ],
    },
    {
      company: "Digital Marketing",
      period: "2018 – 2024",
      title: "Freelance",
      description: [
        `Independent client work across digital marketing and growth. Transitioned out to pursue software and AI engineering full time.`,
      ],
    },
    {
      company: "IIT Delhi",
      period: "2013 – 2018",
      title: "B.Tech, Chemical Engineering",
      description: [
        `Chemical Engineering degree providing the {{analytical foundation}} for systems thinking and constraints-based problem solving.`,
      ],
    },
  ];

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative">
          <div className="divide-y divide-gray-100">
            {experiences.map((experience) => (
              <div
                key={`${experience.company}-${experience.period}`}
                className="grid grid-cols-[1fr,5fr] gap-6 py-12 first:pt-0 last:pb-0 md:grid-cols-[2fr,1fr,4fr]"
              >
                <div className="hidden md:block">
                  <h3 className="text-xl font-bold">{experience.company}</h3>
                  <p className="text-sm text-gray-600">{experience.period}</p>
                </div>

                <div />

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">{experience.title}</h4>
                  <div className="space-y-3">
                    {experience.description.map((desc, i) => (
                      <p key={i} className="text-gray-600">
                        {parseHighlights(desc, "bold")}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-0 h-full w-8 md:left-[calc(28%_-_1rem)]">
            <Timeline avatarUrl="/hero_icon.webp" />
          </div>
        </div>
      </div>
    </div>
  );
}
