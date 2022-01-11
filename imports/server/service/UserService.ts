import WritableUserDao from "/imports/server/dao/WritableUserDao";
import { Mongo } from "meteor/mongo";
import UserRecord, {
  LoggedInConnection,
  STANDARD_MEMBER_FIELDS,
} from "/lib/records/UserRecord";
import ServerUser from "/lib/server/ServerUser";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import ServerLogger from "/lib/server/ServerLogger";
import Stoppable from "/lib/Stoppable";

export type LogonCallback = (user: ServerUser) => void;

interface HttpHeadersICareAbout {
  "user-agent": string;
}

export default class UserService extends Stoppable {
  private userdao: WritableUserDao;

  private logger;

  constructor(parent: Stoppable | null, userdao: WritableUserDao) {
    super(parent);
    this.logger = new ServerLogger(this, "UserService_ts");
    this.userdao = userdao;
    if (globalThis.ICCServer.services.userservice)
      throw new Meteor.Error("USERSERVICE_ALREADY_DEFINED");
    globalThis.ICCServer.services.userservice = this;
  }

  public logon(
    hashtoken: string,
    connection: string,
    useragent: string,
    ipaddress: string,
    callback?: LogonCallback,
  ): void {
    this.logger.debug(
      () =>
        `logon hashtoken=${hashtoken} connection=${connection} useragent=${useragent} ipaddress=${ipaddress} callback=${!!callback}`,
    );
    const userdb = this.getUserFromHashToken(hashtoken);
    const newConnection: LoggedInConnection = {
      loginDate: new Date(),
      focused: true,
      idleseconds: 0,
      connection,
      useragent,
      ipaddress,
    };
    this.userdao.login(
      userdb._id,
      hashtoken,
      newConnection,
      (id, _newlogin) => {
        if (callback) callback(new ServerUser(id, this.userdao));
      },
    );
  }

  private createAnonymousUser(): UserRecord {
    this.logger.debug(() => "creating anonymous user");
    const userrecord: Mongo.OptionalId<UserRecord> = {
      createdAt: new Date(),
      isolation_group: "public",
      loggedin: false,
      logins: [],
    };
    userrecord._id = this.userdao.insert(userrecord);
    return userrecord as UserRecord;
  }

  private getUserFromHashToken(hashtoken: string): UserRecord {
    this.logger.debug(() => `getUserFromHashToken hashtoken=${hashtoken}`);
    let userrecord = this.userdao.readOne({ hashTokens: hashtoken });
    this.logger.debug(
      () => `userrecord=${userrecord?._id || "NO RECORD FOUND IN DATABASE"}`,
    );

    if (!userrecord) userrecord = this.createAnonymousUser();

    return userrecord;
  }

  public updateIdle(
    connection: string,
    focused: boolean,
    idleseconds: number,
  ): void {
    this.userdao.updateIdle(connection, focused, idleseconds);
  }

  protected stopping(): void {
    // Nothing to stop yet
  }
}

const fields: Mongo.FieldSpecifier = {};
STANDARD_MEMBER_FIELDS.forEach((field) => {
  fields[field] = 1;
});

Meteor.publish(null, function () {
  return globalThis.ICCServer.utilities
    .getCollection("users")
    .find({ "logins.connections.connection": this.connection.id }, { fields });
});

Meteor.methods({
  newUserLogin(hashtoken: string) {
    check(hashtoken, String);
    if (!this.connection) throw new Meteor.Error("NULL_CONNECTION");
    if (!globalThis.ICCServer.services.userservice)
      throw new Meteor.Error("USERSERVICE_NOT_DEFINED");
    globalThis.ICCServer.services.userservice.logon(
      hashtoken,
      this.connection.id,
      (this.connection.httpHeaders as HttpHeadersICareAbout)["user-agent"],
      this.connection.clientAddress,
      (user) => user.id,
    );
  },
});
