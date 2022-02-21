export type SystemConfigurationKey = "x";

export default interface SystemConfigurationRecord {
  _id: string;
  key: SystemConfigurationKey;
}

export interface scrX extends SystemConfigurationRecord {
  key: "x";
  x: string;
}
