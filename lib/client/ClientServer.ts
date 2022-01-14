import CommonReadOnlyThemeDao from "/imports/dao/CommonReadOnlyThemeDao";
import ClientConnection from "/lib/client/ClientConnection";
import Stoppable from "/lib/Stoppable";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";

export default class ClientServer extends Stoppable {
  public connection: ClientConnection;

  constructor(
    userdao: CommonReadOnlyUserDao,
    themedao: CommonReadOnlyThemeDao,
  ) {
    super(null);
    this.connection = new ClientConnection(this, userdao, themedao);
  }

  protected stopping(): void {
    // Nothing to stop yet
  }
}
