export interface PingMessage {
    id: string;
    type: string;
    originate: number;
}

export interface PongMessage {
    id: string;
    type: string;
    originate: number;
    receive: number;
    transmit: number;
}

export interface PongResponse {
    id: string;
    type: string;
    delay: number;
    clock_offset: number;
}
