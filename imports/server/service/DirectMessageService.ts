import { AbstractDirectMessageProcessor } from "/lib/AbstractDirectMessageProcessor";
import AbstractCommonDirectMessage from "/lib/CommonDirectMessage";

export default class DirectMessageService extends AbstractCommonDirectMessage {
    private directmessageprocessors: AbstractDirectMessageProcessor[] = [];

    protected processDirectMessage(sessionid: string, messagetype: string, messageobject: any): void {
        this.directmessageprocessors.forEach((handler) => handler.onDirectMessage(sessionid, messagetype, messageobject));
    }

    public onDirectMessage(handler: AbstractDirectMessageProcessor): void {
        this.directmessageprocessors.push(handler);
    }
}
