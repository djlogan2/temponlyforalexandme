export default interface ConnectionRecord {
  _id: string;
  instanceid: string;
  connectionid: string;
  startTime: Date;
  userid?: string;
}
