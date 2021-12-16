export interface PongMessage {
    id: string;
    type: string;
    originate: number;
    receive: number;
    transmit: number;
}
