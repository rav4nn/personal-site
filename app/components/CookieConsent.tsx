// app/components/CookieConsent.tsx
"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./Button";

const POSTHOG_TOKEN = "phc_zpowEna9y5tRYDHwSbp477FazHxrHbaLeawGbABaFTsR";

// Visits are counted cookieless until the visitor accepts; Reject keeps them
// cookieless. Pageviews and pageleaves only: no autocapture, replay or surveys.
function loadPostHog() {
  return import("posthog-js").then(({ default: posthog }) => {
    if (!posthog.__loaded) {
      posthog.init(POSTHOG_TOKEN, {
        api_host: "https://eu.i.posthog.com",
        defaults: "2026-08-30",
        cookieless_mode: "on_reject",
        opt_out_capturing_by_default: true,
        opt_out_persistence_by_default: true, // opting out also deletes its storage (same as CallLane)
        cross_subdomain_cookie: false, // own cookie per *.hardeep.cv site; no cross-site interference
        opt_out_capturing_persistence_type: "localStorage",
        person_profiles: "identified_only",
        autocapture: false,
        disable_session_recording: true,
        disable_surveys: true,
      });
    }
    return posthog;
  });
}

// Removes what PostHog stored: ph_* / __ph_* cookies (on this host and its
// parent domains) and the same keys in localStorage and sessionStorage.
function clearPostHogStorage() {
  const ours = (k: string) => k.startsWith("ph_") || k.startsWith("__ph_");
  const parts = location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) {
    domains.push(`; domain=.${parts.slice(i).join(".")}`);
  }
  for (const c of document.cookie.split("; ")) {
    const name = c.split("=")[0];
    if (!ours(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
  // The storage getters themselves throw when the browser blocks storage.
  for (const getStore of [() => localStorage, () => sessionStorage]) {
    try {
      const store = getStore();
      for (const k of Object.keys(store)) if (ours(k)) store.removeItem(k);
    } catch {}
  }
}

/** Starts PostHog and shows the cookie card while the choice is pending. */
export function CookieConsent() {
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    loadPostHog()
      .then((posthog) => {
        if (!cancelled && posthog.get_explicit_consent_status() === "pending") {
          setShow(true);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const decide = (accept: boolean) => {
    setShow(false);
    loadPostHog()
      .then((posthog) => {
        if (accept) posthog.opt_in_capturing();
        else posthog.opt_out_capturing();
      })
      .catch(() => {});
  };

  const focusRing =
    "data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-purple-primary";

  return (
    <AnimatePresence>
      {show && (
        <m.div
          key="cookie-consent"
          role="region"
          aria-label="Cookie choice"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={
            reduceMotion
              ? { duration: 0.15 }
              : { type: "spring", stiffness: 260, damping: 24 }
          }
          /* `!fixed` beats the `position: relative` from `.drama-shadow` (see
             VisitorCounter). Bottom-left on desktop; on mobile it sits above the
             visitor pill, which owns the bottom-right corner. */
          className="drama-shadow !fixed inset-x-3 bottom-[calc(4rem_+_env(safe-area-inset-bottom))] z-50 rounded-2xl border border-border-primary bg-white p-4 text-[13px] leading-5 text-text-secondary sm:bottom-[calc(1rem_+_env(safe-area-inset-bottom))] sm:left-4 sm:right-auto sm:w-[22rem]"
        >
          <p className="flex gap-2.5">
            <span
              aria-hidden
              className="mt-[7px] h-[7px] w-[7px] flex-none rounded-full bg-purple-primary shadow-[0_0_0_3px_rgba(108,71,255,0.15),0_0_10px_rgba(108,71,255,0.25)]"
            />
            <span>
              I count visits without cookies. Can PostHog also set an analytics
              cookie? It shows return visits and which country you visit from.
              No ads, no screen recording.
            </span>
          </p>
          <div className="mt-3 flex justify-end gap-2">
            <Button
              variant="outline"
              className={focusRing}
              onClick={() => decide(false)}
            >
              Reject
            </Button>
            <Button
              variant="secondary"
              className={focusRing}
              onClick={() => decide(true)}
            >
              Accept
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

/** Footer link: withdraws the choice, clears PostHog storage, asks again. */
export function CookieSettingsButton() {
  const reset = () => {
    loadPostHog()
      .then((posthog) => posthog.clear_opt_in_out_capturing())
      .catch(() => {})
      .finally(() => {
        try {
          clearPostHogStorage();
        } finally {
          location.reload();
        }
      });
  };

  return (
    <button
      type="button"
      onClick={reset}
      className="rounded-sm text-gray-500 hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-primary"
    >
      Cookie settings
    </button>
  );
}
