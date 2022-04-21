import { Meteor } from "meteor/meteor";
import ConnectionRecord from "/lib/records/ConnectionRecord";
import InstanceService from "/imports/server/service/InstanceService";
import ConnectionDao from "/imports/server/dao/ConnectionDao";
import { Mongo } from "meteor/mongo";
import ServerConnection from "/lib/server/ServerConnection";
import Stoppable from "/lib/Stoppable";
import ServerLogger from "/lib/server/ServerLogger";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import I18nService from "/imports/server/service/i18nService";
import Writablei18nDao from "/imports/server/dao/Writablei18nDao";
import ThemeService from "/imports/server/service/ThemeService";
import WritableThemeDao from "/imports/server/dao/WritableThemeDao";
import ConnectionLoginMethod, {
  HttpHeadersICareAbout,
} from "/imports/server/clientmethods/connection/ConnectionLoginMethod";
import LoggerService from "/imports/server/service/LoggerService";
import WritableLoggerConfigurationDao from "/imports/server/dao/WritableLoggerConfigurationDao";
import LogRecordsDao from "/imports/server/dao/LogRecordsDao";
import ConnectionIdleMethod from "/imports/server/clientmethods/connection/ConnectionIdleMethod";
import PublicationService from "/imports/server/service/PublicationService";
import UserService from "/imports/server/service/UserService";
import EventEmitter from "eventemitter3";
import GameService from "/imports/server/service/GameService";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import ServerUser from "/lib/server/ServerUser";
import ChessEngineService from "/imports/server/service/ChessEngineService";
import InstanceDao from "/imports/server/dao/InstanceDao";
import BookService from "/imports/server/service/BookService";
import WritableBookDao from "/imports/server/dao/WritableBookDao";
import WritableECODao from "/imports/server/dao/WritableECODao";
import ReadOnlyLoggerConfigurationDao from "/imports/server/dao/ReadOnlyLoggerConfigurationDao";
import ChallengeService from "/imports/server/service/ChallengeService";
import WritableChallengeDao from "/imports/server/dao/WritableChallengeDao";
import ServerReadOnlyButtonChallengeDao from "/imports/server/dao/ServerReadOnlyButtonChallengeDao";
import ServerReadOnlyChallengeDao from "/imports/server/dao/ServerReadOnlyChallengeDao";
import WritableChallengeButtonDao from "/imports/server/dao/WritableChallengeButtonDao";

export default class ConnectionService extends Stoppable {
  private readonly readableloggerconfigdao: ReadOnlyLoggerConfigurationDao;

  private readonly writableloggerconfigdao: WritableLoggerConfigurationDao;

  private readonly logrecordsdao: LogRecordsDao;

  private readonly instancedao: InstanceDao;

  private readonly connectiondao: ConnectionDao;

  private readonly readonlyuserdao: CommonReadOnlyUserDao;

  private readonly writableuserdao: WritableUserDao;

  private readonly themedao: WritableThemeDao;

  private readonly writablechallengebuttondao: WritableChallengeButtonDao;

  private readonly i18nwritabledao: Writablei18nDao;

  private readonly writablegamedao: WritableGameDao;

  private readonly bookdao: WritableBookDao;

  private readonly challengedao: ServerReadOnlyChallengeDao;

  private readonly buttondao: ServerReadOnlyButtonChallengeDao;

  private readonly writablechallengedao: WritableChallengeDao;

  private readonly ecodao: WritableECODao;

  private readonly instanceservice: InstanceService;

  private readonly userservice: UserService;

  private readonly publicationservice: PublicationService;

  private readonly gameservice: GameService;

  private readonly bookservice: BookService;

  private readonly engineservice: ChessEngineService;

  private readonly challengeservice: ChallengeService;

  private connectionLoginMethod: ConnectionLoginMethod;

  private connectionIdleMethod: ConnectionIdleMethod;

  private pEvents: EventEmitter<"userlogin" | "userlogout" | string> =
    new EventEmitter();

  private logger = new ServerLogger(this, "server/ConnectionService_ts");

  private i18nservice: I18nService;

  private readonly themeservice: ThemeService;

  private loggerservice: LoggerService;

  public get events() {
    return this.pEvents;
  }

  constructor() {
    super(null);

    // -------------- FIRST FIRST FIRST --------------
    //
    // Because this is the logger, it really has to be initialized first.
    // Once we get through this, then we can intialize dao's and services however we want.
    //
    this.readableloggerconfigdao = new ReadOnlyLoggerConfigurationDao(null);
    this.writableloggerconfigdao = new WritableLoggerConfigurationDao(null);
    this.logrecordsdao = new LogRecordsDao(null);
    this.publicationservice = new PublicationService(this, this);
    this.loggerservice = new LoggerService(
      this,
      this.readableloggerconfigdao,
      this.writableloggerconfigdao,
      this.logrecordsdao,
      this,
      this.publicationservice,
    );
    //
    // --- end first ---

    this.instancedao = new InstanceDao(this);
    this.connectiondao = new ConnectionDao(this);
    this.readonlyuserdao = new CommonReadOnlyUserDao(this);
    this.writableuserdao = new WritableUserDao(this);
    this.themedao = new WritableThemeDao(this);
    this.i18nwritabledao = new Writablei18nDao(this);
    this.instanceservice = new InstanceService(this, this.instancedao);
    this.writablegamedao = new WritableGameDao(this);
    this.bookdao = new WritableBookDao(this);
    this.ecodao = new WritableECODao(this);
    this.writablechallengebuttondao = new WritableChallengeButtonDao(null);

    this.challengedao = new ServerReadOnlyChallengeDao(this);
    this.buttondao = new ServerReadOnlyButtonChallengeDao(this);
    this.writablechallengedao = new WritableChallengeDao(
      this,
      this.instanceservice.instanceid,
    );

    this.connectionLoginMethod = new ConnectionLoginMethod(this, this);
    this.connectionIdleMethod = new ConnectionIdleMethod(this, this);

    this.i18nservice = new I18nService(
      this,
      this.i18nwritabledao,
      this,
      this.publicationservice,
    );
    this.themeservice = new ThemeService(
      this,
      this.themedao,
      this.publicationservice,
    );
    this.userservice = new UserService(
      this,
      this.writableuserdao,
      this.themeservice,
      this.publicationservice,
      this,
      this.instanceservice,
    );
    this.engineservice = new ChessEngineService(this);
    this.bookservice = new BookService(this, this.bookdao);
    this.gameservice = new GameService(
      this,
      this.writablegamedao,
      this.publicationservice,
      this,
      this.instanceservice,
      this.writableuserdao,
      this.engineservice,
      this.bookservice,
      this.ecodao,
    );
    this.challengeservice = new ChallengeService(
      this,
      this.instanceservice,
      this.challengedao,
      this.writablechallengedao,
      this.gameservice,
      this,
      this.writableuserdao,
      this.buttondao,
      this.publicationservice,
      this.writablechallengebuttondao
    );
    Meteor.onConnection((connection) => this.onConnection(connection));

    // globalThis.ICCServer.services.connectionservice = this;

    const self = this;

    Meteor.directStream.onMessage(function processDirectStreamMessage(
      message: string,
      sessionId: string,
    ) {
      try {
        self.logger.debug(() => `processDirectMessage/1: ${message}`);
        const msg = JSON.parse(message);
        if (typeof msg !== "object" || !("iccdm" in msg)) return;
        self.logger.debug(() => `processDirectMessage: ${message}`);

        this.preventCallingMeteorHandler();
        self.onDirectMessage(sessionId, msg.iccdm, msg.iccmsg);
      } catch (e) {
        // If we cannot parse the string into an object, it's not for us.
      }
    });
  }

  private onDirectMessage(
    session: string,
    messagetype: string,
    msgobject: any,
  ): void {
    this.logger.debug(
      () =>
        `onDirectMessage session=${session} messagetype=${messagetype} message=${JSON.stringify(
          msgobject,
        )}`,
    );
    const connection = globalThis.ICCServer.connections[session];
    this.logger.debug(() => `onDirectMessage connection=${connection}`);
    if (!connection) {
      // TODO: Handle this error
      return;
    }
    if (!Array.isArray(connection))
      connection.handleDirectMessage(messagetype, msgobject);
  }

  private onClose(ourconnection: ServerConnection): void {
    this.logger.debug(() => `${ourconnection.connectionid} onClose`);
    if (ourconnection.user) this.pEvents.emit("userlogout", ourconnection.user);
    ourconnection.stop();
    delete globalThis.ICCServer.connections[ourconnection.connectionid];
    this.connectiondao.remove(ourconnection._id);
  }

  private onConnection(connection: Meteor.Connection): void {
    this.logger.debug(() => `onConnection connection=${connection.id}`);
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
      this.readonlyuserdao,
      this.writableuserdao,
    );
    globalThis.ICCServer.connections[connection.id] = ourconnection;
    connection.onClose(() => this.onClose(ourconnection));
    this.pEvents.emit(connection.id, ourconnection);
  }

  public async login(
    connectionid: string,
    hashtoken: string,
    locale: string,
  ): Promise<string> {
    this.logger.debug(
      () =>
        `login connection=${connectionid} hashtoken=${hashtoken} locale=${locale}`,
    );
    const connection = await this.getConnection(connectionid);
    const userid = connection.login(hashtoken, locale);
    this.connectiondao.update({ connectionid }, { $set: { userid } });
    if (this.pEvents.listenerCount("userlogin")) {
      this.pEvents.emit(
        "userlogin",
        new ServerUser(
          this,
          userid,
          this.readonlyuserdao,
          this.writableuserdao,
        ),
      );
    }
    this.logger.debug(() => `login returning id=${userid}`);
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

  public async getConnection(connection: string): Promise<ServerConnection> {
    this.logger.debug(() => `getConnection conn=${connection}`);
    return new Promise<ServerConnection>((resolve) => {
      if (globalThis.ICCServer.connections[connection]) {
        this.logger.debug(
          () => `getConnection conn=${connection} resolving valid connection`,
        );
        resolve(globalThis.ICCServer.connections[connection]);
        return;
      }
      this.logger.debug(
        () => `getConnection conn=${connection} not ready, listening for event`,
      );
      const func = (ourconnection: ServerConnection) => {
        resolve(ourconnection);
        this.pEvents.off(connection, func);
        this.logger.debug(
          () =>
            `getConnection conn=${connection} finally ready, resolving event`,
        );
      };
      this.pEvents.on(connection, func);
    });
  }
}
