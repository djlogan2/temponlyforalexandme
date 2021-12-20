import Singleton from "./Singleton";

export default abstract class AbstractCommonDirectMessage extends Singleton {
    constructor() {
        super("commondirectmessage");
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

    protected abstract processDirectMessage(sessionid: string, messagetype: string, messageobject: any): void;
}
