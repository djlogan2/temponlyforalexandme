import WritableUserDao from "/imports/server/dao/WritableUserDao";
import { Mongo } from "meteor/mongo";
import UserRecord, { STANDARD_MEMBER_FIELDS } from "/lib/records/UserRecord";
import ServerUser from "/lib/server/ServerUser";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import ServerLogger from "/lib/server/ServerLogger";
import Stoppable from "/lib/Stoppable";
import ConnectionRecord from "/lib/records/ConnectionRecord";

export type LogonCallback = (user: ServerUser) => void;

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

  public logon(hashtoken: string): void {
    this.logger.debug(() => `logon hashtoken=${hashtoken}`);
    const userdb = this.getUserFromHashToken(hashtoken);
  }

  private createAnonymousUser(hashToken: string): UserRecord {
    this.logger.debug(() => "creating anonymous user");
    const userrecord: Mongo.OptionalId<UserRecord> = {
      createdAt: new Date(),
      isolation_group: "public",
      hashTokens: [{ hashtoken: hashToken, lastUsed: new Date() }],
    };
    userrecord._id = this.userdao.insert(userrecord);
    return userrecord as UserRecord;
  }

  private getUserFromHashToken(hashtoken: string): UserRecord {
    this.logger.debug(() => `getUserFromHashToken hashtoken=${hashtoken}`);
    const userrecord = this.userdao.readOne({
      "hashTokens.hashtoken": hashtoken,
    });
    this.logger.debug(
      () => `userrecord=${userrecord?._id || "NO RECORD FOUND IN DATABASE"}`,
    );

    if (!userrecord) return this.createAnonymousUser(hashtoken);
    this.userdao.update(
      { "hashTokens.hashtoken": hashtoken },
      { $set: { "hashTokens.$.lastUsed": new Date() } },
    );
    return this.userdao.get(userrecord._id) as UserRecord;
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
  const connectionrecord = globalThis.ICCServer.utilities
    .getCollection("connections")
    .findOne({ connectionid: this.connection.id }) as ConnectionRecord;
  return globalThis.ICCServer.utilities
    .getCollection("users")
    .find({ _id: connectionrecord.userid });
});
