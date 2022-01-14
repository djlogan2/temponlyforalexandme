import CommonReadOnlyI18nDao from "/imports/dao/CommonReadOnlyI18nDao";
import CommonReadOnlyThemeDao from "/imports/dao/CommonReadOnlyThemeDao";
import ClientConnection from "/lib/client/ClientConnection";
import Stoppable from "/lib/Stoppable";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";

export default class ClientServer extends Stoppable {
  public connection: ClientConnection;

  constructor(
    userdao: CommonReadOnlyUserDao,
    themedao: CommonReadOnlyThemeDao,
    i18ndao: CommonReadOnlyI18nDao,
  ) {
    super(null);
    this.connection = new ClientConnection(this, userdao, themedao, i18ndao);
  }

  protected stopping(): void {
    // Nothing to stop yet
  }
}
