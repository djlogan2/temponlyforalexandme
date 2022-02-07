import WritableUserDao from "/imports/server/dao/WritableUserDao";
import { Mongo } from "meteor/mongo";
import UserRecord from "/lib/records/UserRecord";
import ServerLogger from "/lib/server/ServerLogger";
import Stoppable from "/lib/Stoppable";
import ThemeService from "/imports/server/service/ThemeService";
import PublicationService from "/imports/server/service/PublicationService";
import ServerConnection from "/lib/server/ServerConnection";
import UserPublication from "/imports/server/publications/UserPublication";
import { Subscription } from "meteor/meteor";

export default class UserService extends Stoppable {
  private userdao: WritableUserDao;

  private themeservice: ThemeService;

  private logger;

  constructor(
    parent: Stoppable | null,
    userdao: WritableUserDao,
    themeservice: ThemeService,
    publicationservice: PublicationService,
  ) {
    super(parent);
    this.logger = new ServerLogger(this, "UserService_ts");
    this.userdao = userdao;
    this.themeservice = themeservice;
    publicationservice.publishDao(
      null,
      (
        sub: Subscription,
        connection: ServerConnection | null,
        ...args: string[]
      ) => new UserPublication(this, sub, connection),
    );
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
      roles: ["login"],
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
