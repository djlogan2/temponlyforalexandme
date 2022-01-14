import { Meteor } from "meteor/meteor";
import ConnectionRecord from "/lib/records/ConnectionRecord";
import InstanceService from "/imports/server/service/InstanceService";
import ConnectionDao from "/imports/server/dao/ConnectionDao";
import { Mongo } from "meteor/mongo";
import ServerConnection from "/lib/server/ServerConnection";
import Stoppable from "/lib/Stoppable";
import ServerLogger from "/lib/server/ServerLogger";
import { IdleMessage } from "/lib/records/IdleMessage";
import { check } from "meteor/check";
import UserService from "/imports/server/service/UserService";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import ThemeService from "./ThemeService";
import CommonReadOnlyThemeDao from "/imports/dao/CommonReadOnlyThemeDao";
import WritableThemeDao from "../dao/WritableThemeDao";
import ClientTheme from "/lib/client/ClientTheme";

interface HttpHeadersICareAbout {
  "user-agent": string;
}

export default class ConnectionService extends Stoppable {
  private connectiondao: ConnectionDao;

  private instanceservice: InstanceService;

  private userservice: UserService;

  private userdao: CommonReadOnlyUserDao;

  private writableuserdao: WritableUserDao;

  private themeservice: ThemeService;

  private themedao: CommonReadOnlyThemeDao;

  private writablethemedao: WritableThemeDao;

  private connections: { [key: string]: ServerConnection } = {};

  private logger = new ServerLogger(this, "server/ConnectionService_ts");

  constructor(
    parent: Stoppable | null,
    instanceservice: InstanceService,
    connectiondao: ConnectionDao,
    userservice: UserService,
    readonlyuserdao: CommonReadOnlyUserDao,
    writableuserdao: WritableUserDao,
  ) {
    super(parent);
    this.userdao = readonlyuserdao;
    this.writableuserdao = writableuserdao;
    this.connectiondao = connectiondao;
    this.instanceservice = instanceservice;
    this.userservice = userservice;

    this.themedao = new CommonReadOnlyThemeDao(null);
    this.writablethemedao = new WritableThemeDao(null);
    this.themeservice = new ThemeService(null, this.writablethemedao);

    Meteor.onConnection((connection) => this.onConnection(connection));

    globalThis.ICCServer.services.connectionservice = this;

    const self = this;

    Meteor.directStream.onMessage(function processDirectStreamMessage(
      message: string,
      sessionId: string,
    ) {
      try {
        self.logger.trace(() => `processDirectMessage/1: ${message}`);
        const msg = JSON.parse(message);
        if (typeof msg !== "object" || !("iccdm" in msg)) return;
        self.logger.trace(() => `processDirectMessage: ${message}`);

        this.preventCallingMeteorHandler();
        self.onDirectMessage(sessionId, msg.iccdm, msg.iccmsg);
      } catch (e) {
        // If we cannot parse the string into an object, it's not for us.
      }
    });

    Meteor.methods({
      idleFunction(msg) {
        check(msg, Object);
        if (this.connection?.id)
          self.idleMessage(this.connection.id, msg as IdleMessage);
      },
    });
  }

  //
  // [{"hashtoken": "JX9frpUPpgHStOX1kkRdnC_zO5cSuYGtOaRHKLuTZpZ", "connections": [{"loginDate": new ISODate("2022-01-11T04:49:35.738Z"), "focused": true, "idleseconds": new NumberInt("0"), "connection": "dKxtHcBwSidbPNRK3", "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36", "ipaddress": "127.0.0.1"}]}]
  //
  private idleMessage(connectionid: string, idle: IdleMessage): void {
    const connection = this.connections[connectionid];
    this.logger.trace(() => `idleMessage connection=${connection}`);
    if (!connection) {
      // TODO: Handle this error
      return;
    }
    connection.idleMessage(idle);
  }

  private onDirectMessage(
    session: string,
    messagetype: string,
    msgobject: any,
  ): void {
    this.logger.trace(
      () =>
        `onDirectMessage session=${session} messagetype=${messagetype} message=${JSON.stringify(
          msgobject,
        )}`,
    );
    const connection = this.connections[session];
    this.logger.trace(() => `onDirectMessage connection=${connection}`);
    if (!connection) {
      // TODO: Handle this error
      return;
    }
    connection.handleDirectMessage(messagetype, msgobject);
  }

  private onClose(ourconnection: ServerConnection): void {
    this.logger.trace(() => `${ourconnection.connectionid} onClose`);
    ourconnection.stop();
    delete this.connections[ourconnection.connectionid];
    this.connectiondao.remove(ourconnection._id);
  }

  private onConnection(connection: Meteor.Connection): void {
    this.logger.trace(() => `onConnection connection=${connection.id}`);
    const connrecord: Mongo.OptionalId<ConnectionRecord> = {
      connectionid: connection.id,
      instanceid: this.instanceservice.instanceid,
      startTime: new Date(),
      useragent: (connection.httpHeaders as HttpHeadersICareAbout)[
        "user-agent"
      ],
      ipaddress: connection.clientAddress,
      focused: true,
      idleseconds: 0,
    };
    connrecord._id = this.connectiondao.insert(connrecord);
    const ourconnection = new ServerConnection(
      this,
      connrecord as ConnectionRecord,
      this.connectiondao,
      this.userservice,
      this.userdao,
      this.writableuserdao,
      this.themeservice,
      this.themedao,
      this.writablethemedao,
    );
    this.connections[connection.id] = ourconnection;
    connection.onClose(() => this.onClose(ourconnection));
  }

  public login(connectionid: string, hashtoken: string): string {
    if (!this.connections[connectionid])
      throw new Meteor.Error("UNABLE_TO_FIND_CONNECTION");
    const userid = this.connections[connectionid].login(hashtoken);
    this.connectiondao.update({ connectionid }, { $set: { userid } });
    return userid;
  }

  private startupDeleteDefunctConnectionRecords() {
    // TODO:
    //  Look for connection records that do not have matching instance records
    //  Delete them
  }

  protected stopping(): void {
    // Nothing to stop at this time
  }
}

Meteor.methods({
  newUserLogin(hashtoken: string): Promise<string> {
    check(hashtoken, String);
    return new Promise<string>((resolve, reject) => {
      if (!this.connection) {
        reject(new Meteor.Error("NULL_CONNECTION"));
        return;
      }
      if (!globalThis.ICCServer?.services?.connectionservice) {
        reject(new Meteor.Error("CONNECTIONSERVICE_NOT_FOUND"));
        return;
      }
      const userid = globalThis.ICCServer.services.connectionservice.login(
        this.connection.id,
        hashtoken,
      );
      console.log(`Returning ${userid} to newUserLogin caller`);
      resolve(userid);
    });
  },
});
