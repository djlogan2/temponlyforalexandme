export interface ThemeRecord {
  _id: string;
  themename: string;
  isolation_group?: string;
  public: boolean;
  variables: { [key: string]: string | number };
  css?: string;
  staticResources?: { [key: string]: string };
}
