import ClientConnection from "/lib/client/ClientConnection";
import Stoppable from "/lib/Stoppable";

export default class ClientServer extends Stoppable {
    public connection: ClientConnection;

    constructor() {
        super(null);
        this.connection = new ClientConnection(this);
    }

    protected stopping(): void {
        // Nothing to stop yet
    }
}
