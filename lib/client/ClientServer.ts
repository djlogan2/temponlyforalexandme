import ClientConnection from "/lib/client/ClientConnection";
import Stoppable from "/lib/Stoppable";

export default class ClientServer extends Stoppable {
    private connection: ClientConnection;

    constructor() {
        super(null);
        this.connection = new ClientConnection(this);
    }

    protected stopping(): void {
        throw new Error("Method not implemented.");
    }
}

window.ClientServer = new ClientServer();
