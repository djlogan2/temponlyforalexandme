export type IncrementType = {
  type: "us" | "inc" | "bronstein";
  incseconds: number;
};
export type ClockSettings = { minutes: number; adjust?: IncrementType };
export type PieceColor = "b" | "w";

export interface BasicChallengeRecord {
  clock: ClockSettings;
  opponentclocks?: ClockSettings;
  color?: PieceColor;
}

export interface ComputerChallengeRecord extends BasicChallengeRecord {
  skill_level: number;
}

export interface UserChallengeRecord extends BasicChallengeRecord {
  _id: string;
  owner: string;
  isolation_group: string;
  instance_id: string;
  connection_id: string;
  who: string[];
  rated: boolean;
  qualifies: string[];
  declined: string[];
}
