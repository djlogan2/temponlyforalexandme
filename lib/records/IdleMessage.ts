export interface IdleMessage {
  type: "idle";
  idleseconds: number;
  focused: boolean;
}
