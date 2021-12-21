import { Mongo } from "meteor/mongo";
import ClientConnection from "/lib/client/ClientConnection";
import Stoppable from "/lib/Stoppable";

export default class ICCServer extends Stoppable {
    private connection: ClientConnection;

    private collections: { [key: string]: Mongo.Collection<any> } = {};

    private dao: { [key: string]: any } = {};

    private constructor() {
        super("iccserver", null);
        this.connection = new ClientConnection(this);
    }

    public static getInstance(): ICCServer {
        if (!global.iccserver) global.iccserver = new ICCServer();
        return global.iccserver;
    }

    protected stopping(): void {
        // Nothing to stop as of yet
    }
}
