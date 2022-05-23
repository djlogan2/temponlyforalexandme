import { options, challengeTypes } from "./constants";

export enum Components {
  ANYONE = "anyone",
  FRIENDS = "friends",
  COMPUTER = "computer",
  CUSTOM = "custom",
  SHARE = "share",
  CHALLENGE = "challenge",
}

export type Options = typeof options[number];
export type Challenge = typeof challengeTypes[number];

export type CommonGameSetup = {
  navigate: (tab: Components) => void;
  onCloseModal: () => void;
};
