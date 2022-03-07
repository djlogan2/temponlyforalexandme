import { options, timeOptions, challengeTypes } from "./constants";

export enum EComponents {
  ANYONE = "Anyone",
  FRIENDS = "Friends",
  COMPUTER = "Computer",
  CUSTOM = "Custom",
  SHARE = "Share",
  CHALLENGE = "Challenge",
}

export type TOptions = typeof options[number];
export type TTimeOption = typeof timeOptions[number];
export type TChallenge = typeof challengeTypes[number];

export interface ICommonGameSetup {
  navigate: (tab: EComponents) => void;
  onCloseModal: () => void;
}
