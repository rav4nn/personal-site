import type { ComponentType } from "react";
import { CallLaneTile } from "./CallLaneTile";
import { GuardLaneTile } from "./GuardLaneTile";
import { MacLaneTile } from "./MacLaneTile";
import { QuickSpaceSwitchTile } from "./QuickSpaceSwitchTile";

export type LaneStatus = "live" | "beta" | "soon";

export type Lane = {
  name: string;
  line: string;
  status: LaneStatus;
  href?: string;
  Tile: ComponentType;
};

export const statusDot: Record<LaneStatus, { colour: string; label: string }> = {
  live: { colour: "#22c55e", label: "Live" },
  beta: { colour: "#6366f1", label: "Beta" },
  soon: { colour: "#f59e0b", label: "Coming soon" },
};

export const lanes: readonly Lane[] = [
  {
    name: "CallLane",
    line: "Music stays loud on calls",
    status: "live",
    href: "https://calllane.app",
    Tile: CallLaneTile,
  },
  {
    name: "Quick Space Switch",
    line: "Spaces switch instantly",
    status: "live",
    href: "https://github.com/rav4nn/quick-space-switch",
    Tile: QuickSpaceSwitchTile,
  },
  {
    name: "MacLane",
    line: "Your Mac, for cloud agents",
    status: "soon",
    Tile: MacLaneTile,
  },
  {
    name: "GuardLane",
    line: "Agent tools, kept safe",
    status: "soon",
    Tile: GuardLaneTile,
  },
];
