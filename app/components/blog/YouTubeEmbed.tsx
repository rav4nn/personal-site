"use client";
import { useState } from "react";

// YouTube video that shows only a thumbnail until the reader clicks play.
// The player (and YouTube's scripts) load on click, from youtube-nocookie.com.
export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="not-prose my-8 aspect-video w-full overflow-hidden rounded-2xl border border-border-primary bg-slate-900 shadow-code-shadow">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group relative block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-purple-primary"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/10 transition group-hover:bg-black/20">
            <svg
              viewBox="0 0 68 48"
              aria-hidden="true"
              className="h-12 w-[68px] drop-shadow-lg transition group-hover:scale-110"
            >
              <path
                d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.2.3 34 .3 34 .3s-21.2 0-26.5 1.4a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6C12.8 47.7 34 47.7 34 47.7s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3Z"
                fill="#f00"
              />
              <path d="M45 24 27 14v20l18-10Z" fill="#fff" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
