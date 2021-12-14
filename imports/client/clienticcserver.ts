import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import CommonICCServer from "../commoniccserver";
import ClientTimestamp from "./clienttimetamp";
import { Tracker } from "meteor/tracker";
import Emitter from "../emitter";
import { EEmitterEvents } from "/client/data/hooks/useEventEmitter/events";

type TError = Error | Meteor.Error | Meteor.TypedError | undefined;

class ClientICCServer extends CommonICCServer {
  private static instance: ClientICCServer;

  public timestamp: ClientTimestamp | null = null;

  public static getInstance(): ClientICCServer {
    if (!ClientICCServer.instance) {
      ClientICCServer.instance = new ClientICCServer();
    }

    return ClientICCServer.instance;
  }

  public userIdSubscribe() {
    return Tracker.autorun(() => {
      const userId = Meteor.userId();

      Emitter.emit(EEmitterEvents.USER_ID_CHANGE, userId);
    });
  }

  public getUserId() {
    return Meteor.userId();
  }

  public loginWithPassword({
    email,
    password,
    callback,
  }: {
    email: string;
    password: string;
    callback?: (err: TError) => void;
  }): void {
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
  }): void {
    Accounts.createUser({ email, username, password }, (err) => {
      if (callback) {
        callback(err);
      }
    });
  }

  public logout(callback: (err: TError) => void): void {
    Meteor.logout((err) => {
      if (callback) {
        callback(err);
      }
    });
  }
}

export default ClientICCServer.getInstance();
