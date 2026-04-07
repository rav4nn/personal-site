import { ResumeData } from "../lib/resume/types";
import { Timeline } from "./Timeline";

const resumeData: ResumeData = {
  experiences: [
    {
      company: "Independent",
      period: "2024 - Present",
      positions: [
        {
          title: "Builder / Indie Developer",
          description: [
            "Building AI products that turn messy real-world data into usable systems.",
            "Shipped coffeecoach.app (64 users in first week, zero paid promotion), youtube-rag-scraper (55 GitHub stars), buildinpublic-x, and splitwala — each solving a problem I personally had.",
          ],
        },
      ],
    },
    {
      company: "IIT Delhi",
      period: "2020 - 2024",
      positions: [
        {
          title: "B.Tech, Chemical Engineering",
          description: [
            "Studied Chemical Engineering with a focus on systems thinking and process optimisation.",
            "The engineering background informed how I approach software — constraints, feedback loops, and making messy systems tractable.",
          ],
        },
      ],
    },
  ],
  avatarUrl: "/hero.jpg",
};

export function Resume() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative">
          <div className="divide-y divide-gray-100">
            {resumeData.experiences.map((experience) => (
              <div
                key={experience.company}
                className="grid grid-cols-[1fr,5fr] gap-6 py-12 first:pt-0 last:pb-0 md:grid-cols-[2fr,1fr,4fr]"
              >
                <div className="hidden md:block">
                  <h3 className="text-xl font-bold">{experience.company}</h3>
                  <p className="text-sm text-gray-600">{experience.period}</p>
                </div>

                <div />

                <div className="space-y-6">
                  {experience.positions.map((position, index) => (
                    <div
                      key={`${experience.company}-${index}`}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-semibold">
                        {position.title}
                      </h4>
                      <div className="space-y-3">
                        {position.description.map((desc, i) => (
                          <p key={i} className="text-gray-600">
                            {desc}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-0 h-full w-8 md:left-[calc(28%_-_1rem)]">
            <Timeline avatarUrl={resumeData.avatarUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
