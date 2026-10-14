import type { AppLogo } from "./data";

// Outbound link for each app name in the results table.
// When an affiliate program approves, swap its URL in here and set affiliate: true.
// Apps without an entry render as plain text.
export const appLinks: Partial<
  Record<AppLogo, { url: string; affiliate: boolean }>
> = {
  aquavoice: { url: "https://aquavoice.com/", affiliate: false },
  superwhisper: { url: "https://superwhisper.com/", affiliate: false },
  freeflow: { url: "https://freeflow.zachlatta.com/", affiliate: false },
  voiceink: { url: "https://tryvoiceink.com/?atp=rav4nn", affiliate: true },
  willow: { url: "https://willowvoice.com/", affiliate: false },
  parakeety: { url: "https://www.parakeety.com/", affiliate: false },
  typewhisper: { url: "https://www.typewhisper.com/", affiliate: false },
  wisprflow: { url: "https://wisprflow.ai/", affiliate: false },
};
