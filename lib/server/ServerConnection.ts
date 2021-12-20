import ConnectionRecord from "/lib/records/ConnectionRecord";
import Stoppable from "/lib/server/Stoppable";
import AbstractDirectMessageHandler from "/lib/AbstractDirectMessageHandler";

export default class ServerConnection extends Stoppable {
    private connectionrecord: ConnectionRecord;

    private registerdDirectMessages: {[key: string]: AbstractDirectMessageHandler<any>} = {};

    private closefunctions: (() => void)[] = [];

    public get _id(): string {
        return this.connectionrecord._id;
    }

    public get connectionid(): string {
        return this.connectionrecord.connectionid;
    }

    protected stopping(): void {
        this.closing();
    }

    public handleDirectMessage(messagetype: string, message: any) {
        const handler = this.registerdDirectMessages[messagetype];
        if (!handler) {
            // TODO: Handle this error
            return;
        }
        handler.onReceived(message);
    }

    protected registerDirectMessage<T>(name: string, node: AbstractDirectMessageHandler<T>) {
        // TODO: Check for an already registered message
        this.registerdDirectMessages[name] = node;
    }

    constructor(parent: Stoppable, connectionrecord: ConnectionRecord) {
        super(`connection:${connectionrecord._id}`, parent);
        this.connectionrecord = connectionrecord;
    }

    public closing(): void {
        this.closefunctions.forEach((func) => func());
    }

    public onClose(func: () => void): void {
        this.closefunctions.push(func);
    }
}
