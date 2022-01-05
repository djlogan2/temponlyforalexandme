import EventEmitter from "eventemitter3";
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

window.ClientServer = new ClientServer();

const App = (props, context) => {
    // const eventEmitter = window.ClientServer.connection.getEventEmitter();
    console.log(window.ClientServer);
    // eventEmitter.on("lagChanged", (delay) => {
    //    const lag = window.ClientServer.connection.getLag();
    //    console.log("current lag: ", lag, " delay: ", delay);
    // });
    return <div>Here!</div>;
};

export default App;
