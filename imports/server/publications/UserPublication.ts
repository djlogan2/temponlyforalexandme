import UserRecord, { STANDARD_MEMBER_FIELDS } from "/lib/records/UserRecord";
import Stoppable from "/lib/Stoppable";
import { Subscription } from "meteor/meteor";
import ServerConnection from "/lib/server/ServerConnection";
import ServerLogger from "/lib/server/ServerLogger";
import Publication from "/imports/server/service/Publication";
import ServerUser from "/lib/server/ServerUser";

export default class UserPublication extends Publication<UserRecord> {
  private logger2: ServerLogger;

  private readonly connectionid?: string;

  constructor(
    parent: Stoppable | null,
    pub: Subscription,
    connection: ServerConnection | null,
  ) {
    super(parent, pub, "users");
    this.logger2 = new ServerLogger(this, "UserPublication_js");
    this.logger2.debug(() => `${connection?._id} New UserPublication`);
    if (!connection) return;
    this.connectionid = connection._id;
    connection.events.on("userlogin", (user: ServerUser) => {
      this.logger2.debug(
        () => `${connection._id} event::userlogin userid=${user.id}`,
      );
      this.setUser(user.id);
    });
    connection.events.on("userlogout", () => {
      this.logger2.debug(() => `${connection._id} event::userlogout`);
      this.unsetUser();
    });
    if (connection.user) {
      this.logger2.debug(
        () =>
          `${connection._id} constructor setting initial user=${connection.user?.id}`,
      );
      this.setUser(connection.user.id);
    } else {
      this.logger2.debug(
        () =>
          `${connection._id} constructor signalling ready with no logged on user`,
      );
      this.ready();
    }
  }

  private setUser(id: string): void {
    this.logger2.debug(() => `${this.connectionid} setUser id=${id}`);
    this.setSelector({ _id: id }, "include", STANDARD_MEMBER_FIELDS);
  }

  private unsetUser(): void {
    this.logger2.debug(() => `${this.connectionid} unsetUser`);
    this.killCursor();
  }
}
