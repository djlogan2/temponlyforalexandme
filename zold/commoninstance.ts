import { InstanceRecord } from '../imports/models/instancerecord';

export abstract class CommonInstance {
}

export class LocalInstance implements InstanceRecord {
  _id: string;

  lastPing: Date;

  started: Date;

  pid: number;

  ipAddress: string;

  current_release: string;

  current_version: string;

  shuttingDown?: boolean;

  beingHandled?: string;
}

export class RemoteInstance implements InstanceRecord {
  _id: string;

  lastPing: Date;

  shuttingDown?: boolean;

  beingHandled?: string;

  started: Date;

  pid: number;

  ipAddress: string;

  current_release: string;

  current_version: string;
}
