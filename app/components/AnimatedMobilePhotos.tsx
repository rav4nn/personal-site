"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ShadowBox } from "./ShadowBox";

interface AnimatedMobilePhotosProps {
  delay: number;
}

const photos = [
  {
    src: "/mountains-dog.webp",
    alt: "Hardeep petting a mountain dog on a trek",
    boxW: 170,
    boxH: 252,
    imgClass:
      "absolute left-0 top-2 h-[245px] w-[163px] rotate-[-5deg] rounded-lg object-cover",
  },
  {
    src: "/hero_2.webp",
    alt: "Hardeep at a café in a pink polo, holding coffee with a bookshelf behind",
    boxW: 188,
    boxH: 278,
    imgClass:
      "absolute left-0 top-0 h-[280px] w-[190px] rotate-[-8deg] rounded-lg object-cover shadow-lg shadow-black/20",
  },
  {
    src: "/cb.webp",
    alt: "Hardeep in a candid photo",
    boxW: 170,
    boxH: 252,
    imgClass:
      "absolute left-0 top-0 h-[245px] w-[163px] rotate-[10deg] rounded-lg object-cover shadow-lg shadow-black/20",
  },
];

export function AnimatedMobilePhotos({ delay }: AnimatedMobilePhotosProps) {
  const [paused, setPaused] = useState(false);
  const sequence = [...photos, ...photos];

  return (
    <div className="relative -mx-12 lg:hidden">
      <div className="relative w-full overflow-hidden py-12">
        <div
          className={`flex w-fit animate-marquee-loop items-center will-change-transform ${
            paused ? "[animation-play-state:paused]" : "[animation-play-state:running]"
          }`}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onTouchCancel={() => setPaused(false)}
        >
          {sequence.map((photo, i) => (
            <motion.div
              key={i}
              className="relative mr-14 w-fit shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: delay + (i % photos.length) * 0.1,
              }}
            >
              <ShadowBox width={photo.boxW} height={photo.boxH}></ShadowBox>
              <img
                className={photo.imgClass}
                src={photo.src}
                alt={photo.alt}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
