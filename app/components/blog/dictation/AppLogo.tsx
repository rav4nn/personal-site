import Image from "next/image";
import clsx from "clsx";
import type { AppLogo as AppLogoName } from "./data";

type AppLogoProps = {
  logo: AppLogoName | null;
  size: number;
  className?: string;
};

// App icon from /public/blog/<post>/. Apple Dictation has no app icon, so it
// gets a grey badge with a mic.
export function AppLogo({ logo, size, className }: AppLogoProps) {
  if (!logo) {
    return (
      <span
        aria-hidden="true"
        style={{ width: size, height: size }}
        className={clsx(
          "grid shrink-0 place-items-center bg-slate-200 text-slate-500",
          className,
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: size * 0.6, height: size * 0.6 }}
        >
          <rect x="9" y="3.75" width="6" height="11" rx="3" />
          <path d="M5.75 11.5a6.25 6.25 0 0 0 12.5 0M12 17.75v2.5" />
        </svg>
      </span>
    );
  }

  return (
    <Image
      src={`/blog/mac-dictation-apps-agent-prompts/${logo}.png`}
      alt=""
      width={size}
      height={size}
      className={clsx("shrink-0", className)}
    />
  );
}
