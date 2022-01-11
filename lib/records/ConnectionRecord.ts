export default interface ConnectionRecord {
  _id: string;
  instanceid: string;
  connectionid: string;
  startTime: Date;
  userid?: string;
  /* status will eventually go here too */
  useragent: string;
  ipaddress: string;
  focused: boolean;
  idleseconds: number;
}
