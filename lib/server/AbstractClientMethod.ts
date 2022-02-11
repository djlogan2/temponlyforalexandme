import { Meteor } from "meteor/meteor";
import { UserRoles } from "../enums/Roles";
import ServerConnection from "./ServerConnection";
import ConnectionService from "/imports/server/service/ConnectionService";
import { HttpHeadersICareAbout } from "/imports/server/clientmethods/ConnectionLoginMethod";
import ServerUser from "/lib/server/ServerUser";
import Stoppable from "/lib/Stoppable";

export type ClientCalls =
  | "idleFunction"
  | "makeMove"
  | "newUserLogin"
  | "startComputerGame"
  | "user_set"
  | "writeToLog";
type InternalMethodType = (...args: any[]) => Promise<any | undefined>;

export interface ClientCallObject {
  connection?: ServerConnection;
  user?: ServerUser;
  httpHeaders: HttpHeadersICareAbout;
}

export default abstract class AbstractClientMethod extends Stoppable {
  protected abstract validatearguments(obj: any): void;

  protected abstract called(obj: any): any;

  protected isAuthorized(roles: string[], obj: ClientCallObject): boolean {
    return (
      !roles.length ||
      !roles ||
      (roles.length === 1 && roles[0] === "public") ||
      obj.user?.isAuthorized(roles) ||
      false
    );
  }

  protected constructor(
    parent: Stoppable | null,
    callname: ClientCalls,
    argumentnames: string[],
    roles: UserRoles[],
    connectionservice: ConnectionService,
  ) {
    super(parent);
    const self = this;
    const methodobject: { [n in ClientCalls]?: InternalMethodType } = {};
    methodobject[callname] = async function (
      this: Meteor.MethodThisType,
      ...args: any[]
    ) {
      let serverConnection: ServerConnection | undefined;
      if (this.connection)
        serverConnection = await connectionservice.getConnection(
          this.connection.id,
        );
      const serverUser = serverConnection?.user || undefined;
      const httpHeaders = this.connection?.httpHeaders as HttpHeadersICareAbout;
      // const simulation = this.isSimulation;
      return new Promise<any>((resolve, reject) => {
        try {
          if (args.length !== argumentnames.length) {
            reject(new Meteor.Error("INCORRECT_NUMBER_OF_ARGUMENTS"));
            return;
          }
          const obj: any = {
            connection: serverConnection,
            user: serverUser,
            httpHeaders,
          };

          if (args) {
            for (let argv = 0; argv < args.length; argv += 1) {
              obj[argumentnames[argv]] = args[argv];
            }
          }

          const isAuthorized = self.isAuthorized(roles, obj);
          if (!isAuthorized) {
            reject(new Meteor.Error("INSUFFICIENT_AUTHORITY"));
            return;
          }
          self.validatearguments(obj);
          const retvalue = self.called(obj);
          resolve(retvalue);
        } catch (e) {
          reject(e);
        }
      });
    };
    Meteor.methods(methodobject);
  }
}
