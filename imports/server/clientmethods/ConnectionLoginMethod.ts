import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import ConnectionService from "/imports/server/service/ConnectionService";
import { Meteor } from "meteor/meteor";
import ServerLogger from "/lib/server/ServerLogger";
import Stoppable from "/lib/Stoppable";

export interface HttpHeadersICareAbout {
  "user-agent": string;
  "accept-language": string;
}

interface ConnectionLoginObject extends ClientCallObject {
  hashtoken: string;
}
export default class ConnectionLoginMethod extends AbstractClientMethod {
  private connectionservice: ConnectionService;

  private logger: ServerLogger;

  constructor(parent: Stoppable | null, connectionservice: ConnectionService) {
    super(parent, "newUserLogin", ["hashtoken"], [], connectionservice);
    this.connectionservice = connectionservice;
    this.logger = new ServerLogger(
      connectionservice,
      "ConnectionLoginObject_js",
    );
  }

  protected validatearguments(obj: ConnectionLoginObject): void {}

  protected async called(obj: ConnectionLoginObject): Promise<string> {
    this.logger.debug(
      () =>
        `called, connection= ${obj.connection?._id} hashtoken=${obj.hashtoken}`,
    );
    if (!obj.connection) throw new Meteor.Error("NULL_CONNECTION");
    const localestring = (obj.httpHeaders as HttpHeadersICareAbout)[
      "accept-language"
    ];
    const pieces = (localestring || "en").split(",");
    return this.connectionservice.login(
      obj.connection.connectionid,
      obj.hashtoken,
      pieces[0],
    );
  }

  protected stopping() {}
}
