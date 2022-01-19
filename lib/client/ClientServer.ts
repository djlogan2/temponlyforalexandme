import ClientConnection from "/lib/client/ClientConnection";
import Stoppable from "/lib/Stoppable";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";

export default class ClientServer extends Stoppable {
  public connection: ClientConnection;

  constructor(userdao: CommonReadOnlyUserDao) {
    super(null);
    this.connection = new ClientConnection(this, userdao);
  }

  protected stopping(): void {
    // Nothing to stop yet
  }
}
