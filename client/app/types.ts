import { BasicMoveListNode, MoveZero } from "/lib/records/GameRecord";

export type TUserStatus = "online" | "idle" | "unavailable" | "offline";
export type TMoveItem = BasicMoveListNode & MoveZero;

export type TI18NDoc = {
  locale: string;
  text: string;
  token: string;
  _id: string;
};

export type TChallengeButton = {
  id: string;
  name: string;
  time: number;
  opponentTime?: number;
};
