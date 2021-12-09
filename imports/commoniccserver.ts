import { ChatRecord } from '/imports/models/chatrecord';
import { EventEmitter } from "events";
import { Mongo } from "meteor/mongo";
import { InstanceRecord } from "./models/instancerecord";
import { ConnectionRecord } from "./models/connectionrecord";
import PingRecord from "./models/pingrecord";
import { LogConfigRecord, LogRecord } from "./models/loggerrecord";
import CommonLogger from "./commonlogger";
import { I18nRecord } from "./models/i18nrecord";

//
export default abstract class CommonICCServer {
  private readonly eventEmitter: EventEmitter;

  public instance_id?: string;

  // eslint-disable-next-line no-unused-vars
  public createLogger: (identifier: string) => CommonLogger;

  public collections: {
    connections?: Mongo.Collection<ConnectionRecord>;
    instances?: Mongo.Collection<InstanceRecord>;
    pingtable?: Mongo.Collection<PingRecord>;
    logs?: Mongo.Collection<LogRecord>;
    loggerconfig?: Mongo.Collection<LogConfigRecord>;
    i18n?: Mongo.Collection<I18nRecord>;
    chats?: Mongo.Collection<ChatRecord>;
  };

  protected constructor() {
    this.eventEmitter = new EventEmitter();
    this.collections = {};
  }

  public get events() {
    return this.eventEmitter;
  }
}
