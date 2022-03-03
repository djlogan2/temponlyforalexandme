import { EComponents } from "./types";

export const timeOptions = [1, 3, 5, 15, 25, 30, 40, "custom"] as const;
export const options = [
  EComponents.ANYONE,
  EComponents.FRIENDS,
  EComponents.COMPUTER,
] as const;
export const challengeTypes = ["Challenge", "Seekgraph"] as const;

export const title = {
  Anyone: "Play",
  Friends: "Create challenge",
  Computer: "Play with computer",
  Custom: "Custom Challenge",
  Share: "Share challenge",
  Challenge: "Challenge launched",
};
