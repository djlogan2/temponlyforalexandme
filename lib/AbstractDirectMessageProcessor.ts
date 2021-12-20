export interface AbstractDirectMessageProcessor {
    onDirectMessage(sessionid: string, messagetype: string, messageobject: any): void;
}
