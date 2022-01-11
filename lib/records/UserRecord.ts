export interface HashToken {
  hashtoken: string;
  lastUsed: Date;
}

export default interface UserRecord {
  _id: string;
  createdAt: Date;
  username?: string;
  isolation_group: string;
  idleSince?: Date;
  hashTokens: HashToken[];
}

export const STANDARD_MEMBER_FIELDS: Array<keyof UserRecord> = [
  "_id",
  "username",
];
