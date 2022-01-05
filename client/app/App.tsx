import React from "react";
import ClientConnection from "/lib/client/ClientConnection";
import Stoppable from "/lib/Stoppable";

class ClientServer extends Stoppable {
    private connection: ClientConnection;

    constructor() {
        super(null);
        this.connection = new ClientConnection(this);
    }

    protected stopping(): void {
        throw new Error("Method not implemented.");
    }
}

window.cServer = new ClientServer();

const App = () => {
    const eventEmitter = ClientServer.connection.getEmitter;

    eventEmitter.on("lagChanged", () => {
       const lag = ClientServer.connection.getLag();
       console.log("current lag: ", lag);
    });

    return <div>Here!</div>;
};

export default App;
