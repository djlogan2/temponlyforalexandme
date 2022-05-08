import { BasicMoveListNode, MoveZero } from "/lib/records/GameRecord";

export type UserStatus = "online" | "idle" | "unavailable" | "offline";
export type MoveItem = BasicMoveListNode & MoveZero;

export type I18NDoc = {
  locale: string;
  text: string;
  token: string;
  _id: string;
};

export type ChallengeButton = {
  id: string;
  name: string;
  time: number;
  opponentTime?: number;
};
