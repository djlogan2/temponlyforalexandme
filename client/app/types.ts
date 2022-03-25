import { BasicMoveListNode, MoveZero } from "/lib/records/GameRecord";

export type TUserStatus = "online" | "idle" | "unavailable" | "offline";
export type TMoveItem = BasicMoveListNode & MoveZero;
