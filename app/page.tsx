import { CalendarBento } from "./components/CalendarBento";
import { ToolboxBento } from "./components/ToolboxBento";
import { GithubActivityBento } from "./components/GithubActivityBento";
import { AnimatedProfilePicture } from "./components/AnimatedProfilePicture";
import { AnimatedText } from "./components/AnimatedText";
import { PhotoGallery } from "./components/PhotoGallery";
import { AboutMeBento } from "./components/AboutMeBento";
import { AnimatedMobilePhotos } from "./components/AnimatedMobilePhotos";
import { GridWrapper } from "./components/GridWrapper";
import { GetInTouch } from "./components/GetInTouch";

export default async function Home() {
  const PROFILE_DELAY = 0;
  const HEADING_DELAY = PROFILE_DELAY + 0.2;
  const PARAGRAPH_DELAY = HEADING_DELAY + 0.1;
  const PHOTOS_DELAY = PARAGRAPH_DELAY + 0.1;

  return (
    <section>
      <AnimatedProfilePicture delay={PROFILE_DELAY} />
      <div className="mt-6 space-y-10 md:mt-0 md:space-y-16">
        <section>
          <div className="relative text-balance">
            <GridWrapper>
              <AnimatedText
                as="h1"
                delay={HEADING_DELAY}
                className="mx-auto max-w-2xl text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]"
              >
                Hey, I&apos;m Hardeep! <br />
              </AnimatedText>
            </GridWrapper>
            <GridWrapper>
              <div className="mt-4 text-center md:mt-8">
                <AnimatedText
                  as="p"
                  delay={PARAGRAPH_DELAY}
                  className="leading-8 text-text-secondary"
                >
                  Chemical engineer @ IIT Delhi → AI builder <br /> I work
                  with LLMs, RAG, ML & AI agents while shipping full-stack AI
                  products that people use daily.
                </AnimatedText>
              </div>
            </GridWrapper>
          </div>
          <div>
            {/* Desktop Photos */}
            <div className="relative hidden h-fit w-full items-center justify-center lg:flex">
              <PhotoGallery animationDelay={PHOTOS_DELAY} />
            </div>

            {/* Mobile Photos */}
            <AnimatedMobilePhotos delay={PHOTOS_DELAY} />
          </div>
        </section>

        {/* Grid Section */}
        <section className="relative space-y-10 pb-20 md:space-y-16 md:pb-24">
          <GridWrapper>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-12 lg:grid-rows-[14]">
              <div className="col-span-1 md:col-span-5 lg:col-span-5 lg:row-span-6">
                <AboutMeBento linkTo="/about" />
              </div>

              <div className="md:col-span-12 lg:col-span-7 lg:row-span-8">
                <GithubActivityBento linkTo="https://github.com/rav4nn" />
              </div>

              <div className="md:col-span-7 md:row-start-1 lg:col-span-5 lg:row-span-7">
                <ToolboxBento linkTo="/toolbox" />
              </div>

              <div className="md:col-span-12 lg:col-span-7 lg:row-span-5">
                <CalendarBento />
              </div>
            </div>
          </GridWrapper>
        </section>

        {/* My Site Section - hidden for now */}
        {/* <section className="relative space-y-10 md:space-y-16">
          <div className="space-y-4 text-balance">
            <GridWrapper>
              <div className="text-center text-sm font-medium text-indigo-600">
                <span>My Site</span>
              </div>
            </GridWrapper>
            <GridWrapper>
              <h2 className="text-center text-3xl font-medium leading-10 tracking-tighter text-text-primary md:mx-auto md:max-w-lg md:text-4xl">
                My site is a playful sandbox. Explore, experiment, && say hello
              </h2>
            </GridWrapper>
          </div>
          <GridWrapper>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <span className="col-span-1 h-[276px] sm:block md:hidden lg:block">
                <ChangelogBento />
              </span>
              <SpeakingBento />
              <CommunityWallBento />
            </div>
          </GridWrapper>
        </section> */}

        {/* Get In Touch */}
        <section>
          <GetInTouch />
        </section>
      </div>
    </section>
  );
}
