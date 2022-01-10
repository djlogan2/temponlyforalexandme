export interface UserRecord {
  _id: string;
  createdAt: Date;
  username?: string;
  isolation_group: string;
  hashTokens?: string[];
  login?: {
    loginDate: Date;
    useragent: string;
    ipaddress: string;
  };
}
