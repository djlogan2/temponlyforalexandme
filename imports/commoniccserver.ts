// import {ChatRecord} from "/imports/models/chatrecord";
// import {EventEmitter} from "events";
// import {Mongo} from "meteor/mongo";
// import {InstanceRecord} from "./models/instancerecord";
// import {ConnectionRecord} from "./models/connectionrecord";
// import PingRecord from "./models/pingrecord";
// import {LogConfigRecord, LogRecord} from "./models/loggerrecord";
// import CommonLogger from "./commonlogger";
// import {I18nRecord} from "./models/i18nrecord";
// import {MessageRecord} from "./models/messagerecord";

//
import CommonLogger from "/zold/commonlogger";

export default abstract class CommonICCServer {
    public abstract createLogger: (identifier: string) => CommonLogger;
}
