import { HorizontalLine } from "@/app/components/HorizontalLine";
import { getTimeOfDayGreeting } from "app/lib/utils";
import React from "react";
import { ShadowBox } from "@/app/components/ShadowBox";
import { GridWrapper } from "@/app/components/GridWrapper";
import { Photo } from "@/app/components/Photo";
import { AboutTrackPattern } from "@/app/components/AboutTrackPattern";

export default function AboutPage() {
  const timeOfDayGreeting = getTimeOfDayGreeting();

  return (
    <div className="relative mt-14">
      <title>About | Hardeep Singh</title>
      <div className="relative space-y-10 md:space-y-16">
        {/* Title */}
        <GridWrapper className="space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-around lg:px-24">
            <div className="order-2 mx-auto max-w-lg lg:order-1 lg:m-0 lg:max-w-3xl lg:pr-12">
              <div className="text-center text-sm font-medium text-indigo-600 lg:text-left">
                <span>{timeOfDayGreeting}</span>
              </div>
              <h1 className="mx-auto max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-5xl lg:text-left lg:text-6xl lg:leading-[64px]">
                I&apos;m Hardeep, a builder and former chemical engineer.
              </h1>
            </div>
            <div className="order-1 my-12 flex-shrink-0 lg:order-2 lg:my-0">
              <div className="relative mx-auto w-full max-w-[400px]">
                <div className="relative grid grid-cols-3">
                  <div className="relative z-20 -translate-y-2">
                    <Photo
                      width={140}
                      height={140}
                      src="/chess.jpg"
                      alt="Hardeep playing chess"
                      direction="left"
                    />
                  </div>
                  <div className="relative z-30">
                    <Photo
                      width={140}
                      height={140}
                      src="/hero.jpg"
                      alt="Hardeep Singh"
                      direction="right"
                    />
                  </div>
                  <div className="relative z-20 translate-y-4">
                    <Photo
                      width={140}
                      height={140}
                      src="/mountains-dog.jpg"
                      alt="Hardeep with a mountain dog"
                      direction="left"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GridWrapper>

        <span className="absolute left-1/2 top-40 -translate-y-1/2 translate-x-1/2">
          <HorizontalLine />
        </span>

        {/* About */}
        <div className="relative space-y-8 text-center">
          <div className="space-y-4">
            <GridWrapper>
              <div className="text-center text-sm font-medium text-indigo-600">
                <span>About</span>
              </div>
            </GridWrapper>
            <GridWrapper>
              <h2 className="mx-auto max-w-xl text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                Here&apos;s a quick intro about me and what I love to do
              </h2>
            </GridWrapper>
          </div>
          <div className="relative h-fit w-full overflow-hidden">
            <div className="absolute left-0 top-0 w-full md:left-4 lg:left-[355px] xl:left-[455px]">
              <AboutTrackPattern />
            </div>

            {/* Section 1 */}
            <div className="grid grid-cols-1 gap-8 py-12 pr-12 lg:grid-cols-2 lg:items-center lg:justify-between lg:py-32 lg:pb-20 xl:py-32">
              <div className="flex flex-col items-center text-left lg:order-2 lg:items-start">
                <div className="mb-8 lg:hidden">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <img
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                      src="/hero.jpg"
                      alt="Hardeep Singh"
                    />
                  </div>
                </div>
                <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                  From the lab to the internet
                </h2>
                <p className="mb-6 text-base leading-8 text-text-secondary">
                  I studied Chemical Engineering at IIT Delhi — a degree that
                  taught me to think in systems and optimise under constraints.
                  What I didn&apos;t expect was that the most interesting
                  problems I&apos;d encounter were messy, unstructured, and
                  sitting inside data. That&apos;s what pulled me toward
                  software.
                </p>
                <p className="mb-6 text-base leading-8 text-text-secondary">
                  Now I build AI products that take that mess and make it
                  usable — pipelines, tooling, apps. The engineering mindset
                  didn&apos;t go anywhere; it just found a better outlet.
                </p>
              </div>
              <div className="hidden lg:order-1 lg:block">
                <div className="relative mx-auto w-fit">
                  <ShadowBox width={188} height={278}></ShadowBox>
                  <img
                    className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                    src="/hero.jpg"
                    alt="Hardeep Singh"
                  />
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="grid grid-cols-1 gap-8 py-24 lg:grid-cols-2 lg:items-center lg:justify-between lg:pl-12">
              <div className="flex flex-col items-center text-left lg:items-start">
                <div className="mb-8 lg:hidden">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <img
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                      src="/mountains-dog.jpg"
                      alt="Hardeep with a mountain dog"
                    />
                  </div>
                </div>
                <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                  Building things I actually want to exist
                </h2>
                <p className="mb-6 text-base leading-8 text-text-secondary">
                  I like building things that solve problems I actually have,
                  and seeing them become products other people use. CoffeeCoach
                  got 64 users in a week without a single paid promotion.
                  youtube-rag-scraper hit 55 GitHub stars because apparently
                  a lot of people had the same frustration with video content
                  being impossible to query.
                </p>
                <p className="mb-6 text-base leading-8 text-text-secondary">
                  The pattern is the same every time: a personal itch, a quick
                  build, a real audience. That feedback loop is what keeps me
                  going.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="relative mx-auto w-fit">
                  <ShadowBox width={188} height={278}></ShadowBox>
                  <img
                    className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                    src="/mountains-dog.jpg"
                    alt="Hardeep with a mountain dog"
                  />
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="grid grid-cols-1 gap-8 pr-12 lg:grid-cols-2 lg:items-center lg:justify-between xl:py-24">
              <div className="flex flex-col items-center text-left lg:order-2 lg:items-start">
                <div className="mb-8 lg:hidden">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <img
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                      src="/surgery.jpg"
                      alt="ACL recovery"
                    />
                  </div>
                </div>
                <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                  Life beyond the screen
                </h2>
                <p className="mb-6 text-base leading-8 text-text-secondary">
                  I play chess obsessively. I played football every week until
                  I tore my ACL last year — still in recovery, still bitter
                  about it. I befriend every mountain dog I meet. And I&apos;m
                  on an ongoing, probably never-ending hunt for the best chhole
                  bhature in Delhi.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="relative mx-auto w-fit">
                  <ShadowBox width={188} height={278}></ShadowBox>
                  <img
                    className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                    src="/surgery.jpg"
                    alt="ACL recovery"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
