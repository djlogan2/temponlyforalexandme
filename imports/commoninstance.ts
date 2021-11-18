import {InstanceRecord, InstanceRecordSchema} from "./models/instancerecord";
export abstract class CommonInstance {
}

export class LocalInstance implements InstanceRecord {
    _id: string;
    lastPing: Date;
    shuttingDown?: boolean;
    beingHandled?: string;
    started: Date;
    ipAddress: string;
    current_release: string;
    current_version: string;
}

export class RemoteInstance implements InstanceRecord {
    _id: string;
    lastPing: Date;
    shuttingDown?: boolean;
    beingHandled?: string;
    started: Date;
    ipAddress: string;
    current_release: string;
    current_version: string;
}
