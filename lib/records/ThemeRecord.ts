export interface ThemeHeaderRecord {
  _id: string;
  themename: string;
  isolation_group?: string;
  public: boolean;
}

export interface ThemeData {
  _id: string;
  theme: string; // Parent theme id
  parentClassName: string; // if this parent exists, load that then this
  className: string; // button or activebutton
  styleobject: object; // The stuff
}
