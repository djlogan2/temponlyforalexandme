export interface IdleMessage {
    tab: string,
    type: "idle",
    idleseconds: number,
    focused: boolean
}
