export type IncrementType = {
  type: "us" | "inc" | "bronstein";
  incseconds: number;
};
export type ClockSettings = { minutes: number; adjust?: IncrementType };
export type PieceColor = "b" | "w";

export interface BasicChallengeRecord {
  _id: string;
  clock: ClockSettings;
  opponentclocks?: ClockSettings;
  color?: PieceColor;
}

export interface ComputerChallengeRecord extends BasicChallengeRecord {
  type: "computer";
  skill_level: number;
}

export interface AnyoneChallengeRecord {
  type: "seek";
  rated: boolean;
}

export interface SpecificChallengeRecord {
  type: "match";
  who: string;
  rated: boolean;
}
