export interface PongMessage {
    id: string;
    type: "pong";
    originate: number;
    receive: number;
    transmit: number;
}
