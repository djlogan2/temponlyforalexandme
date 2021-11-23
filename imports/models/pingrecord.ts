import SimpleSchema from 'simpl-schema';
import { PingMessage } from './timestamp';

export default interface PingRecord {
    _id?: string;
    connection_id: string;
    lastPing: Date;
    pendingrequests: {[key: string]: PingMessage};
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

export const PingRecordSchema = new SimpleSchema({
  connection_id: String,
  lastPing: Date,
  pendingrequests: { type: Object },
  localvalues: new SimpleSchema({ current_clock_offset: Number, delay: { type: Number, optional: true }, clock_offset: { type: Number, optional: true } }),
  remotevalues: new SimpleSchema({ current_clock_offset: Number, delay: { type: Number, optional: true }, clock_offset: { type: Number, optional: true } }),
  pingcount: Number,
  pingtimes: Number,
});
