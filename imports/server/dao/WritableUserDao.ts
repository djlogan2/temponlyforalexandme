import Stoppable from "/lib/Stoppable";
import WritableReactiveDao from "/imports/server/dao/WritableReactiveDao";
import UserRecord, { LoggedInConnection } from "/lib/records/UserRecord";
import { Meteor } from "meteor/meteor";
import InstanceService from "/imports/server/service/InstanceService";
import ServerLogger from "/lib/server/ServerLogger";

export type LogonCallback = (id: string, newlogin: boolean) => void;
export type LogoffCallback = (loggedout: boolean) => void;

export default class WritableUserDao extends WritableReactiveDao<UserRecord> {
  private instanceid: string;

  private logger: ServerLogger;

  private waitingForLock: {
    id: string;
    hashToken: string;
    connection: LoggedInConnection | string;
    callback?: LogonCallback | LogoffCallback;
  }[] = [];

  public login(
    id: string,
    hashToken: string,
    connection: LoggedInConnection,
    callback?: LogonCallback,
  ): void {
    this.logger.debug(
      () =>
        `login id=${id} hashToken=${hashToken} connection=${JSON.stringify(
          connection,
        )}`,
    );
    const updated = this.update(
      { $and: [{ _id: id }, { updatelock: { $exists: false } }] },
      { $set: { updatelock: this.instanceid } },
    );
    this.logger.debug(() => `login   updated=${updated}`);
    if (updated) {
      this.logger.debug(() => "calling finishLogin now");
      this.finishLogin(id, hashToken, connection, callback);
    } else {
      this.logger.debug(() => "Waiting for lock!");
      this.waitingForLock.push({ id, hashToken, connection, callback });
    }
  }

  public logout(
    id: string,
    hashToken: string,
    connectionid: string,
    callback?: LogoffCallback,
  ): void {
    const updated = this.update(
      { $and: [{ _id: id }, { updatelock: { $exists: false } }] },
      { $set: { updatelock: this.instanceid } },
    );
    if (updated) {
      this.finishLogout(id, hashToken, connectionid, callback);
    } else {
      this.waitingForLock.push({
        id,
        hashToken,
        connection: connectionid,
        callback,
      });
    }
  }

  public updateIdle(
    _connectionid: string,
    _focused: boolean,
    _idleSeconds: number,
  ): void {}

  private finishLogout(
    id: string,
    hashToken: string,
    connectionid: string,
    callback?: LogoffCallback,
  ): void {
    const user = this.get(id);

    if (!user) throw new Meteor.Error("NO_USER_RECORD");

    let existingConnection;

    const existingHash = user.logins.find(
      (login) => login.hashtoken === hashToken,
    );

    if (existingHash && existingHash.connections)
      existingConnection = existingHash.connections.find(
        (c) => c.connection === connectionid,
      );
    else throw new Meteor.Error("NO_EXISTING_CONNECTION");

    // Where is it?
    if (!existingConnection) throw new Meteor.Error("NO_EXISTING_CONNECTION");

    const connectedcount = user.logins.reduce<number>(
      (count, login) => (login.connections?.length || 0) + count,
      0,
    );
    const isloggedin = connectedcount > 1;

    this.update(
      { "logins.hashtoken": hashToken },
      {
        $pull: {
          "logins.hashtoken.$.connections": { connection: connectionid },
        },
        $set: { loggedin: isloggedin },
        $unset: { updatelock: 1 },
      },
    );

    if (callback) callback(!isloggedin);
  }

  private finishLogin(
    id: string,
    hashToken: string,
    connection: LoggedInConnection,
    callback?: LogonCallback,
  ): void {
    const user = this.get(id);

    if (!user) throw new Meteor.Error("NO_USER_RECORD");

    let existingConnection;

    const existingHash = user?.logins.find(
      (login) => login.hashtoken === hashToken,
    );

    if (existingHash && existingHash.connections)
      existingConnection = existingHash.connections.find(
        (c) => c.connection === connection.connection,
      );

    // We sure as shit shouldn't already have a connection!
    if (existingConnection) throw new Meteor.Error("EXISTING_CONNECTION");

    if (existingHash) {
      this.update(
        { "login.hashtoken": hashToken },
        {
          $addToSet: { "logins.hashtoken.$.connections": connection },
          $unset: { updatelock: 1 },
          $set: { loggedin: true },
        },
      );
    } else {
      this.update(
        { _id: id },
        {
          $addToSet: {
            logins: { hashtoken: hashToken, connections: [connection] },
          },
          $unset: { updatelock: 1 },
          $set: { loggedin: true },
        },
      );
    }
    if (callback) callback(id, !user.loggedin);
  }

  protected onRecordAdded(_id: string, _record: UserRecord): void {}

  protected onFieldsChanged(id: string, record: UserRecord): void {
    if (
      "updatelock" in record &&
      this.waitingForLock.length &&
      this.waitingForLock[0].id === id
    ) {
      const updated = this.update(
        {
          $and: [
            { _id: this.waitingForLock[0].id },
            { updatelock: { $exists: false } },
          ],
        },
        { $set: { updatelock: this.instanceid } },
      );
      if (updated) {
        const next = this.waitingForLock.shift();
        if (!next) return; // Obviously this should never happen at this point, but f'in typescript complains
        if (typeof next.connection === "string")
          this.finishLogout(
            next.id,
            next.hashToken,
            next.connection,
            next.callback as LogoffCallback,
          );
        else
          this.finishLogin(
            next.id,
            next.hashToken,
            next.connection,
            next.callback as LogonCallback,
          );
      }
    }
  }

  protected onRecordRemoved(_id: string): void {}

  protected onStop(): void {}

  constructor(parent: Stoppable | null, instanceservice: InstanceService) {
    super(parent, "users");
    this.logger = new ServerLogger(this, "WritableUserDao_ts");
    this.instanceid = instanceservice.instanceid;
    this.start({}, undefined, undefined);
  }
}
