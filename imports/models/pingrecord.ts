import SimpleSchema from 'simpl-schema';

export default interface PingRecord {
    _id: string;
    connection_id: string;
    lastPing: Date;
    pings: number[];
}

export const PingRecordSchema = new SimpleSchema({
  connection_id: String,
  lastPing: Date,
  pings: [Number],
});
