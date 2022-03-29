import { options, timeOptions, challengeTypes } from "./constants";

export enum EComponents {
  ANYONE = "anyone",
  FRIENDS = "friends",
  COMPUTER = "computer",
  CUSTOM = "custom",
  SHARE = "share",
  CHALLENGE = "challenge",
}

export type TOptions = typeof options[number];
export type TTimeOption = typeof timeOptions[number];
export type TChallenge = typeof challengeTypes[number];

export interface ICommonGameSetup {
  navigate: (tab: EComponents) => void;
  onCloseModal: () => void;
}
