import CommonICCServer from "../commoniccserver";
import ClientTimestamp from "./clienttimetamp";

class ClientICCServer extends CommonICCServer {
  // eslint-disable-next-line no-use-before-define
  private static instance: ClientICCServer;

  public timestamp: ClientTimestamp;

  public static getInstance(): ClientICCServer {
    if (!ClientICCServer.instance) {
      ClientICCServer.instance = new ClientICCServer();
    }

    return ClientICCServer.instance;
  }
}

export default ClientICCServer.getInstance();
