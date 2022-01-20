import { Meteor } from "meteor/meteor";
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import { Mongo } from "meteor/mongo";
import UserRecord, { STANDARD_MEMBER_FIELDS } from "/lib/records/UserRecord";
import ServerLogger from "/lib/server/ServerLogger";
import Stoppable from "/lib/Stoppable";
import ConnectionRecord from "/lib/records/ConnectionRecord";
import ThemeService from "/imports/server/service/ThemeService";

export default class UserService extends Stoppable {
  private userdao: WritableUserDao;

  private themeservice: ThemeService;

  private logger;

  constructor(
    parent: Stoppable | null,
    userdao: WritableUserDao,
    themeservice: ThemeService,
  ) {
    super(parent);
    this.logger = new ServerLogger(this, "UserService_ts");
    this.userdao = userdao;
    this.themeservice = themeservice;
    if (globalThis.ICCServer.services.userservice)
      throw new Meteor.Error("USERSERVICE_ALREADY_DEFINED");
    globalThis.ICCServer.services.userservice = this;
  }

  public logon(hashtoken: string, locale: string): string {
    this.logger.debug(() => `logon hashtoken=${hashtoken}`);
    const userdb = this.getUserFromHashToken(hashtoken, locale);
    return userdb._id;
  }

  private createAnonymousUser(hashToken: string, locale: string): UserRecord {
    this.logger.debug(() => "creating anonymous user");
    const userrecord: Mongo.OptionalId<UserRecord> = {
      createdAt: new Date(),
      isolation_group: "public",
      locale,
      theme: this.themeservice.getDefaultTheme(),
      hashTokens: [{ hashtoken: hashToken, lastUsed: new Date() }],
    };
    userrecord._id = this.userdao.insert(userrecord);
    return userrecord as UserRecord;
  }

  private getUserFromHashToken(hashtoken: string, locale: string): UserRecord {
    this.logger.debug(() => `getUserFromHashToken hashtoken=${hashtoken}`);
    const userrecord = this.userdao.readOne({
      "hashTokens.hashtoken": hashtoken,
    });
    this.logger.debug(
      () => `userrecord=${userrecord?._id || "NO RECORD FOUND IN DATABASE"}`,
    );

    if (!userrecord) return this.createAnonymousUser(hashtoken, locale);
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

/*
   So yea, a complicated publication, that will basically watch a connection record,
   and publish the user record to the client. The user record will change depending on
   what, if any, userid is in the connection record.
 */
Meteor.publish(null, function () {
  const publishthis = this;
  let publishedId: string | null = null;

  let userHandle: Meteor.LiveQueryHandle | null = null;
  let userCursor: Mongo.Cursor<UserRecord> | null = null;

  const publishUser = function () {
    userCursor = globalThis.ICCServer.utilities
      .getCollection("users")
      .find({ _id: publishedId }, { fields });
    userHandle = userCursor.observeChanges({
      added(id, doc) {
        publishthis.added("users", id, doc);
        publishthis.ready();
      },
      changed(id, doc) {
        publishthis.changed("users", id, doc);
        publishthis.ready();
      },
      removed(id) {
        publishthis.removed("users", id);
        publishedId = null;
        publishthis.ready();
        publishthis.stop();
      },
    });
  };

  function updateUsers(id: string | null) {
    if (userHandle) userHandle.stop();
    publishedId = id;
    if (id) publishUser();
  }

  const connectionCusor = globalThis.ICCServer.utilities
    .getCollection("connections")
    .find({
      connectionid: this.connection.id,
    }) as Mongo.Cursor<ConnectionRecord>;
  const connectionHandle = connectionCusor.observeChanges({
    added(id, doc) {
      if ("userid" in doc) {
        updateUsers(doc.userid as string);
      }
    },
    changed(id, doc) {
      if ("userid" in doc) {
        updateUsers(doc.userid as string);
      }
    },
    removed(_id) {
      updateUsers(null);
    },
  });

  this.onStop(() => {
    if (userHandle) userHandle.stop();
    connectionHandle.stop();
  });
});
