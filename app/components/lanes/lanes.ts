import type { ComponentType } from "react";
import { CallLaneTile } from "./CallLaneTile";
import { GuardLaneTile } from "./GuardLaneTile";
import { MacLaneTile } from "./MacLaneTile";

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
    name: "MacLane",
    line: "Your Mac, for cloud agents",
    status: "beta",
    Tile: MacLaneTile,
  },
  {
    name: "GuardLane",
    line: "Agent tools, kept safe",
    status: "soon",
    Tile: GuardLaneTile,
  },
];
