import React from "react";

type HighlightVariant = "bold" | "text-only";

export function Highlight({
  children,
  variant = "bold",
}: {
  children: React.ReactNode;
  variant?: HighlightVariant;
}) {
  return <span className="font-semibold text-[#6C47FF]">{children}</span>;
}

/**
 * Parses a string with {{highlighted}} markers into JSX,
 * wrapping marked text in the Highlight component.
 */
export function parseHighlights(
  text: string,
  variant: HighlightVariant = "text-only"
): React.ReactNode[] {
  const parts = text.split(/\{\{(.+?)\}\}/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <Highlight key={i} variant={variant}>
        {part}
      </Highlight>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}
