export interface InstanceRecord {
  _id: string;
  ipaddress: string;
  startupdate: Date;
  lastping: Date;
  shuttingdown?: boolean;
  beinghandledby?: string;
}
