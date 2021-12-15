import SimpleSchema from 'simpl-schema';

export interface InstanceRecord {
    _id: string;
    lastPing: Date;
    shuttingDown?: boolean;
    handlingInstance?: string;
    started: Date;
    ipAddress: string;
    pid: number;
    current_release: string;
    current_version: string;
}

export const InstanceRecordSchema = new SimpleSchema({
  lastPing: Date,
  shuttingDown: { type: Boolean, optional: true },
  handlingInstance: { type: String, optional: true },
  started: Date,
  ipAddress: String,
  pid: Number,
  current_release: String,
  current_version: String,
});
