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
import WritableThemeHeaderDao from "/imports/server/dao/WritableThemeHeaderDao";
import WritableThemeDataDao from "/imports/server/dao/WritableThemeDataDao";
import ConnectionLoginMethod, {
  HttpHeadersICareAbout,
} from "/imports/server/clientmethods/ConnectionLoginMethod";
import LoggerService from "/imports/server/service/LoggerService";
import ReadOnlyLoggerConfigurationDao from "/imports/server/dao/ReadOnlyLoggerConfigurationDao";
import WritableLoggerConfigurationDao from "/imports/server/dao/WritableLoggerConfigurationDao";
import LogRecordsDao from "/imports/server/dao/LogRecordsDao";
import ConnectionIdleMethod from "/imports/server/clientmethods/ConnectionIdleMethod";
import PublicationService from "/imports/server/service/PublicationService";
import UserService from "/imports/server/service/UserService";
import EventEmitter from "eventemitter3";

export default class ConnectionService extends Stoppable {
  private readonly connectiondao: ConnectionDao;

  private readonly instanceservice: InstanceService;

  private readonly userservice: UserService;

  private readonly publicationservice: PublicationService;

  private readonly userdao: CommonReadOnlyUserDao;

  private readonly writableuserdao: WritableUserDao;

  private connectionLoginMethod: ConnectionLoginMethod;

  private connectionIdleMethod: ConnectionIdleMethod;

  private connections: { [key: string]: ServerConnection } = {};

  private events = new EventEmitter();

  private logger = new ServerLogger(this, "server/ConnectionService_ts");

  private i18nservice: I18nService;

  private readonly themeservice: ThemeService;

  private loggerservice: LoggerService;

  constructor(
    parent: Stoppable | null,
    instanceservice: InstanceService,
    connectiondao: ConnectionDao,
    readonlyuserdao: CommonReadOnlyUserDao,
    writableuserdao: WritableUserDao,
    i18nwritabledao: Writablei18nDao,
    themeheaderdao: WritableThemeHeaderDao,
    themedatadao: WritableThemeDataDao,
    readableloggerconfigdao: ReadOnlyLoggerConfigurationDao,
    writableloggerconfigdao: WritableLoggerConfigurationDao,
    logrecordsdao: LogRecordsDao,
  ) {
    super(parent);
    this.userdao = readonlyuserdao;
    this.writableuserdao = writableuserdao;
    this.connectiondao = connectiondao;
    this.instanceservice = instanceservice;
    this.connectionLoginMethod = new ConnectionLoginMethod(this);
    this.connectionIdleMethod = new ConnectionIdleMethod(this);
    this.publicationservice = new PublicationService(this, this);
    this.i18nservice = new I18nService(
      this,
      i18nwritabledao,
      this,
      this.publicationservice,
    );
    this.themeservice = new ThemeService(
      this,
      themeheaderdao,
      themedatadao,
      this.publicationservice,
    );
    this.userservice = new UserService(
      this,
      writableuserdao,
      this.themeservice,
      this.publicationservice,
    );
    this.loggerservice = new LoggerService(
      this,
      readableloggerconfigdao,
      writableloggerconfigdao,
      logrecordsdao,
      this,
      this.publicationservice,
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
    const connection = this.connections[session];
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
    ourconnection.stop();
    delete this.connections[ourconnection.connectionid];
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
      this.userdao,
      this.writableuserdao,
    );
    this.connections[connection.id] = ourconnection;
    connection.onClose(() => this.onClose(ourconnection));
    this.events.emit(connection.id, ourconnection);
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
      if (this.connections[connection]) {
        this.logger.debug(
          () => `getConnection conn=${connection} resolving valid connection`,
        );
        resolve(this.connections[connection]);
        return;
      }
      this.logger.debug(
        () => `getConnection conn=${connection} not ready, listening for event`,
      );
      const func = (ourconnection: ServerConnection) => {
        resolve(ourconnection);
        this.events.off(connection, func);
        this.logger.debug(
          () =>
            `getConnection conn=${connection} finally ready, resolving event`,
        );
      };
      this.events.on(connection, func);
    });
  }
}
