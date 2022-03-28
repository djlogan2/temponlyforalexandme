import { Meteor, Subscription } from "meteor/meteor";
import Publication from "/imports/server/service/Publication";
import { CollectionNames } from "/lib/CollectionNames";
import Stoppable from "/lib/Stoppable";
import ServerConnection from "/lib/server/ServerConnection";
import ServerUser from "/lib/server/ServerUser";

export default abstract class UserChangePublication<
  T extends { _id: string },
> extends Publication<T> {
  private readonly pUserLogin: (user: ServerUser) => void;

  private readonly pUserLogout: () => void;

  private readonly connection: ServerConnection | null;

  protected constructor(
    parent: Stoppable | null,
    pub: Subscription,
    collection: CollectionNames,
    connection: ServerConnection | null,
  ) {
    super(parent, pub, collection);
    this.pUserLogin = (user: ServerUser) => this.userLogin(user);
    this.pUserLogout = () => this.userLogout();

    this.connection = connection;

    if (connection) {
      connection.events.on("userlogin", this.pUserLogin);
      connection.events.on("userlogout", this.pUserLogout);

      Meteor.defer(() => {
        if (connection.user) {
          this.userLogin(connection.user);
        }
      });
    }
  }

  protected abstract userLogin(user: ServerUser): void;

  protected abstract userLogout(): void;

  protected stopping() {
    super.stopping();
    if (this.connection) {
      this.connection.events.off("userlogin", this.pUserLogin);
      this.connection.events.on("userlogout", this.pUserLogout);
    }
  }
}
