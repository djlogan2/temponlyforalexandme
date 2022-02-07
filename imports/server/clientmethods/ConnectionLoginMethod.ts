import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import ConnectionService from "/imports/server/service/ConnectionService";
import { Meteor } from "meteor/meteor";

export interface HttpHeadersICareAbout {
  "user-agent": string;
  "accept-language": string;
}

interface ConnectionLoginObject extends ClientCallObject {
  hashtoken: string;
}
export default class ConnectionLoginMethod extends AbstractClientMethod {
  private connectionservice: ConnectionService;

  constructor(connectionservice: ConnectionService) {
    super("newUserLogin", ["hashtoken"], [], connectionservice);
    this.connectionservice = connectionservice;
  }

  protected validatearguments(obj: ConnectionLoginObject): void {}

  protected async called(obj: ConnectionLoginObject): Promise<string> {
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
}
