export interface ThemeHeaderRecord {
  _id: string;
  themename: string;
  isolation_group?: string;
  public: boolean;
  reactclass: object;
}

export interface ThemeDataRecord {
  _id: string;
  theme: string; // Parent theme id
  parentClassName: string; // if this parent exists, load that then this
  className: string; // button or activebutton
  styleobject: object; // The stuff
}

export interface ThemeRecord {
  _id: string;
  themename: string;
  isolation_group?: string;
  public: boolean;
  variables: { [key: string]: string | number }
  css?: string,
  staticResources?: { [key: string]: string }
}
