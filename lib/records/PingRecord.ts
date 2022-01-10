import { PingMessage } from "/lib/records/PingMessage";

export interface PingRecord {
  _id?: string;
  connection_id: string;
  lastPing: Date;
  pendingrequests: { [key: string]: PingMessage };
  localvalues: {
    current_clock_offset: number;
    delay?: number;
    clock_offset?: number;
  };
  remotevalues: {
    current_clock_offset: number;
    delay?: number;
    clock_offset?: number;
  };
  pingcount: number;
  pingtimes: number[];
}
