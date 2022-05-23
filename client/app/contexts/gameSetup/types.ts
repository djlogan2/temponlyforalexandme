import { ComputerChallengeRecord } from "/lib/records/ChallengeRecord";
import { ChallengeButton } from "client/app/types";

export type GameSetupContextValue = {
  challengeButtons: ChallengeButton[];
  startComputerGame: (challenge: ComputerChallengeRecord) => void;
  rematchComputerGame: () => void;
};
