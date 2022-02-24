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
import ReadOnlyLoggerConfigurationDao from "/imports/server/dao/ReadOnlyLoggerConfigurationDao";
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

export default class ConnectionService extends Stoppable {
  private readonly readableloggerconfigdao: ReadOnlyLoggerConfigurationDao;

  private readonly writableloggerconfigdao: WritableLoggerConfigurationDao;

  private readonly logrecordsdao: LogRecordsDao;

  private readonly instancedao: InstanceDao;

  private readonly connectiondao: ConnectionDao;

  private readonly readonlyuserdao: CommonReadOnlyUserDao;

  private readonly writableuserdao: WritableUserDao;

  private readonly themedao: WritableThemeDao;

  private readonly i18nwritabledao: Writablei18nDao;

  private readonly writablegamedao: WritableGameDao;

  private readonly instanceservice: InstanceService;

  private readonly userservice: UserService;

  private readonly publicationservice: PublicationService;

  private readonly gameservice: GameService;

  private readonly engineservice: ChessEngineService;

  private connectionLoginMethod: ConnectionLoginMethod;

  private connectionIdleMethod: ConnectionIdleMethod;

  private events = new EventEmitter();

  private logger = new ServerLogger(this, "server/ConnectionService_ts");

  private i18nservice: I18nService;

  private readonly themeservice: ThemeService;

  private loggerservice: LoggerService;

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
    //
    // --- end first ---

    this.instancedao = new InstanceDao(this);
    this.connectiondao = new ConnectionDao(this);
    this.readonlyuserdao = new CommonReadOnlyUserDao(null);
    this.writableuserdao = new WritableUserDao(null);
    this.themedao = new WritableThemeDao(null);
    this.i18nwritabledao = new Writablei18nDao(null);
    this.instanceservice = new InstanceService(this, this.instancedao);
    this.writablegamedao = new WritableGameDao(null);

    this.connectionLoginMethod = new ConnectionLoginMethod(this, this);
    this.connectionIdleMethod = new ConnectionIdleMethod(this, this);
    this.publicationservice = new PublicationService(this, this);

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
    );
    this.loggerservice = new LoggerService(
      this,
      this.readableloggerconfigdao,
      this.writableloggerconfigdao,
      this.logrecordsdao,
      this,
      this.publicationservice,
    );
    this.engineservice = new ChessEngineService(this);
    this.gameservice = new GameService(
      this,
      this.writablegamedao,
      this.publicationservice,
      this,
      this.instanceservice,
      this.writableuserdao,
      this.engineservice,
    );

    Meteor.onConnection((connection) => this.onConnection(connection));

    // globalThis.ICCServer.services.connectionservice = this;

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
    const connection = globalThis.ICCServer.connections[session];
    this.logger.trace(() => `onDirectMessage connection=${connection}`);
    if (!connection) {
      // TODO: Handle this error
      return;
    }
    if (!Array.isArray(connection))
      connection.handleDirectMessage(messagetype, msgobject);
  }

  private onClose(ourconnection: ServerConnection): void {
    this.logger.trace(() => `${ourconnection.connectionid} onClose`);
    if (ourconnection.user) this.events.emit("userlogout", connection.user);
    ourconnection.stop();
    delete globalThis.ICCServer.connections[ourconnection.connectionid];
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
      this.readonlyuserdao,
      this.writableuserdao,
    );
    globalThis.ICCServer.connections[connection.id] = ourconnection;
    connection.onClose(() => this.onClose(ourconnection));
    this.events.emit(connection.id, ourconnection);
  }

  public async login(
    connectionid: string,
    hashtoken: string,
    locale: string,
  ): Promise<string> {
    this.logger.trace(
      () =>
        `login connection=${connectionid} hashtoken=${hashtoken} locale=${locale}`,
    );
    const connection = await this.getConnection(connectionid);
    const userid = connection.login(hashtoken, locale);
    this.connectiondao.update({ connectionid }, { $set: { userid } });
    if (this.events.listenerCount("userlogin")) {
      this.events.emit(
        "userlogin",
        new ServerUser(
          this,
          userid,
          this.readonlyuserdao,
          this.writableuserdao,
        ),
      );
    }
    this.logger.trace(() => `login returning id=${userid}`);
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
    this.logger.trace(() => `getConnection conn=${connection}`);
    return new Promise<ServerConnection>((resolve) => {
      if (globalThis.ICCServer.connections[connection]) {
        this.logger.trace(
          () => `getConnection conn=${connection} resolving valid connection`,
        );
        resolve(globalThis.ICCServer.connections[connection]);
        return;
      }
      this.logger.trace(
        () => `getConnection conn=${connection} not ready, listening for event`,
      );
      const func = (ourconnection: ServerConnection) => {
        resolve(ourconnection);
        this.events.off(connection, func);
        this.logger.trace(
          () =>
            `getConnection conn=${connection} finally ready, resolving event`,
        );
      };
      this.events.on(connection, func);
    });
  }
}
