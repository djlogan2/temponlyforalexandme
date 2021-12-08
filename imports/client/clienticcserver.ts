import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
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

  public async loginWithPassword({ email, password, callback }) {
    Meteor.loginWithPassword(email, password, (err) => {
      // eslint-disable-next-line no-unused-expressions
      callback && callback(err);
    });
  }

  public createUser({
    email, username, password, callback,
  }) {
    Accounts.createUser({ email, username, password }, (err) => {
      if (callback) {
        callback(err);
      }
    });
  }

  public logout(callback) {
    Meteor.logout((err) => {
      if (callback) {
        callback(err);
      }
    });
  }
}

export default ClientICCServer.getInstance();
