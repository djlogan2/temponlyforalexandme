import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import { IdleMessage } from "/lib/records/IdleMessage";
import ConnectionService from "/imports/server/service/ConnectionService";
import { check } from "meteor/check";
import Stoppable from "/lib/Stoppable";

interface ConnectionIdleFunctionObject extends ClientCallObject {
  msg: IdleMessage;
}

export default class ConnectionIdleMethod extends AbstractClientMethod {
  private connectionservice: ConnectionService;

  constructor(parent: Stoppable | null, connectionservice: ConnectionService) {
    super(parent, "idleFunction", ["msg"], [], connectionservice);
    this.connectionservice = connectionservice;
  }

  protected validatearguments(obj: ConnectionIdleFunctionObject): void {
    check(obj.msg, Object);
    check(obj.msg.type, String);
    check(obj.msg.idleseconds, Number);
    check(obj.msg.focused, Boolean);
  }

  protected called(obj: ConnectionIdleFunctionObject) {
    if (obj.connection) obj.connection.idleMessage(obj.msg);
  }

  protected stopping() {}
}
