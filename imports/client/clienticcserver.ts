import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import CommonICCServer from "../commoniccserver";
import ClientTimestamp from "./clienttimetamp";

type TError = Error | Meteor.Error | Meteor.TypedError | undefined;

class ClientICCServer extends CommonICCServer {
  // eslint-disable-next-line no-use-before-define
  private static instance: ClientICCServer;

  public timestamp: ClientTimestamp | null = null;

  public static getInstance(): ClientICCServer {
    if (!ClientICCServer.instance) {
      ClientICCServer.instance = new ClientICCServer();
    }

    return ClientICCServer.instance;
  }

  public async loginWithPassword({
    email,
    password,
    callback,
  }: {
    email: string;
    password: string;
    callback?: (err: TError) => void;
  }) {
    Meteor.loginWithPassword(email, password, (err) => {
      callback && callback(err);
    });
  }

  public createUser({
    email,
    username,
    password,
    callback,
  }: {
    email: string;
    username: string;
    password: string;
    callback?: (err: TError) => void;
  }) {
    Accounts.createUser({ email, username, password }, (err) => {
      if (callback) {
        callback(err);
      }
    });
  }

  public logout(callback: (err: TError) => void) {
    Meteor.logout((err) => {
      if (callback) {
        callback(err);
      }
    });
  }

  public getUserId() {
    return Meteor.userId();
  }
}

export default ClientICCServer.getInstance();
