import AnyonePlay from "./AnyonePlay";
import ComputerPlay from "./ComputerPlay";
import Share from "./Share";
import CustomChallenge from "./CustomChallenge";
import { EComponents } from "./types";
import PlayWithFriends from "./PlayWithFriends";
import ChallengeLaunched from "./ChallengeLaunched";

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

export const gameSetupComponents = {
  Anyone: AnyonePlay,
  Custom: CustomChallenge,
  Computer: ComputerPlay,
  Share,
  Friends: PlayWithFriends,
  Challenge: ChallengeLaunched,
};
