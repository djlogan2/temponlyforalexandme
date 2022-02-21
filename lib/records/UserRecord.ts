import { UserRoles } from "../enums/Roles";

export interface HashToken {
  hashtoken: string;
  lastUsed: Date;
}

export interface RatingObject {
  rating: number;
  won: number;
  draw: number;
  lost: number;
}

export type RatingTypes = "bullet" | "blitz" | "standard" | "computer";

export default interface UserRecord {
  _id: string;
  createdAt: Date;
  username?: string;
  isolation_group: string;
  idleSince?: Date;
  locale: string;
  theme: string;
  hashTokens: HashToken[];
  isdeveloper?: boolean;
  roles: UserRoles[];
  titles?: string[];
  online: boolean;
  ratings: {
    bullet: RatingObject;
    blitz: RatingObject;
    standard: RatingObject;
    computer: RatingObject;
  };
}

export type ModifiableUserRecordFields = keyof Pick<
  UserRecord,
  "username" | "isolation_group" | "locale" | "theme" | "isdeveloper" | "titles"
>;

export const STANDARD_MEMBER_FIELDS: Array<keyof UserRecord> = [
  "_id",
  "username",
  "ratings",
];

export const PUBLIC_MEMBER_FIELDS: Array<keyof UserRecord> = [
  "_id",
  "username",
  "ratings",
];
