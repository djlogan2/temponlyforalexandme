import { UserChallengeRecord } from "/lib/records/ChallengeRecord";

type OCB1 = Omit<
  UserChallengeRecord,
  | "_id"
  | "connection_id"
  | "declined"
  | "instance_id"
  | "owner"
  | "qualifies"
  | "who"
>;
type OCB2 = OCB1 & Pick<OCB1, "color" | "isolation_group" | "opponentclocks">;

export interface OneChallengeButton {
  name: string; // TODO: What does FE need?
  challenge: OCB2;
}

export interface ChallengeButtonRecord {
  _id: string;
  // TODO: Not sure how all we are going to want to theme these yet
  isolation_group?: string;
  user_id?: string;
  button: OneChallengeButton[];
}
