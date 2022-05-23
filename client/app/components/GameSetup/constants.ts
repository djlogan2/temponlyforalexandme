import AnyonePlay from "./AnyonePlay";
import ComputerPlay from "./ComputerPlay";
import Share from "./Share";
import CustomChallenge from "./CustomChallenge";
import { Components } from "./types";
import PlayWithFriends from "./PlayWithFriends";
import ChallengeLaunched from "./ChallengeLaunched";

export const options = [
  Components.ANYONE,
  Components.FRIENDS,
  Components.COMPUTER,
] as const;
export const challengeTypes = ["challenge", "seekgraph"] as const;

export const title = {
  anyone: "play",
  friends: "createChallenge",
  computer: "playComputer",
  custom: "customChallenge",
  share: "shareChallenge",
  challenge: "challengeLaunched",
};

export const gameSetupComponents = {
  anyone: AnyonePlay,
  custom: CustomChallenge,
  computer: ComputerPlay,
  share: Share,
  friends: PlayWithFriends,
  challenge: ChallengeLaunched,
};
