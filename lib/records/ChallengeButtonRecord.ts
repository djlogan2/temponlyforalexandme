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
export interface OneChallengeButton {
  name: string;
  _id: string;
  user_id: string;
  challenge: OCB1;
}

export interface ChallengeButtonRecord {
  _id: string;
  // TODO: Not sure how all we are going to want to theme these yet
  isolation_group?: string;
  user_id?: string;
  button: OneChallengeButton[];
}
