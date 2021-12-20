import { AbstractDirectMessageProcessor } from "/lib/AbstractDirectMessageProcessor";

export default class DirectMessageService {
    private directmessageprocessors: AbstractDirectMessageProcessor[] = [];

    constructor() {
        const self = this;

        function processDirectStreamMessage(message: any, sessionId: string) {
            try {
                const msg = JSON.parse(message);
                if (typeof msg !== "object" || !("iccdm" in msg)) return;
                // @ts-ignore
                // eslint-disable-next-line no-invalid-this
                this.preventCallingMeteorHandler();
                self.processDirectMessage(sessionId, msg.iccdm, msg.iccmsg);
                // @ts-ignore
            } catch (e) {
                // If we cannot parse the string into an object, it's not for us.
            }
        }

        // @ts-ignore
        Meteor.directStream.onMessage(processDirectStreamMessage);
    }

    private processDirectMessage(seesionid: string, messagetype: string, messageobject: any): void {
        this.directmessageprocessors.forEach((handler) => handler.onDirectMessage(seesionid, messagetype, messageobject));
    }

    public onDirectMessage(handler: AbstractDirectMessageProcessor): void {
        this.directmessageprocessors.push(handler);
    }
}
