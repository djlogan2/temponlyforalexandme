import * as util from "util";
import { Meteor } from "meteor/meteor";
import { UserRoles } from "../enums/Roles";
import ServerConnection from "./ServerConnection";
import ConnectionService from "/imports/server/service/ConnectionService";
import { HttpHeadersICareAbout } from "/imports/server/clientmethods/connection/ConnectionLoginMethod";
import ServerUser from "/lib/server/ServerUser";
import Stoppable from "/lib/Stoppable";
import ServerLogger from "/lib/server/ServerLogger";

export type ClientCalls =
  | "addchallenge"
  | "challenge"
  | "gamecommand"
  | "idleFunction"
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

  protected abstract called(obj: any): Promise<any>;

  protected connectionservice: ConnectionService;

  private logger: ServerLogger;

  private readonly argumentnames: string[];

  private readonly roles: UserRoles[];

  protected isAuthorized(
    roles: UserRoles | UserRoles[],
    obj: ClientCallObject,
  ): boolean {
    const pRoles = Array.isArray(roles) ? roles : [roles];
    return !pRoles.length || !pRoles || obj.user?.isAuthorized(pRoles) || false;
  }

  protected constructor(
    parent: Stoppable | null,
    callname: ClientCalls,
    argumentnames: string[],
    roles: UserRoles[],
    connectionservice: ConnectionService,
  ) {
    super(parent);

    this.connectionservice = connectionservice;
    this.argumentnames = argumentnames;
    this.roles = roles;
    this.logger = new ServerLogger(this, "AbstractClientMethod_ts");

    const methodobject: { [n in ClientCalls]?: InternalMethodType } = {};
    const self = this;
    methodobject[callname] = async function (
      this: Meteor.MethodThisType,
      ...args: any[]
    ) {
      return self.methodCall(this, args);
    };
    Meteor.methods(methodobject);
  }

  private methodCall(
    methodthis: Meteor.MethodThisType,
    args: any[],
  ): Promise<any> {
    let promise;

    if (methodthis.connection)
      promise = this.connectionservice.getConnection(methodthis.connection?.id);
    else promise = Promise.resolve(undefined);

    return promise.then(
      (serverConnection) =>
        new Promise<any>((resolve, reject) => {
          const serverUser = serverConnection?.user || undefined;
          const httpHeaders = methodthis.connection
            ?.httpHeaders as HttpHeadersICareAbout;
          // const simulation = methodthis.isSimulation;
          if (args.length !== this.argumentnames.length) {
            reject(new Meteor.Error("INCORRECT_NUMBER_OF_ARGUMENTS"));
          }
          const obj: any = {
            connection: serverConnection,
            user: serverUser,
            httpHeaders,
          };

          if (args) {
            for (let argv = 0; argv < args.length; argv += 1) {
              obj[this.argumentnames[argv]] = args[argv];
            }
          }

          const isAuthorized = this.isAuthorized(this.roles, obj);
          if (!isAuthorized) {
            reject(new Meteor.Error("INSUFFICIENT_AUTHORITY"));
          }
          this.validatearguments(obj);
          this.called(obj)
            .then((retvalue: any) => {
              this.logger.debug(
                () => `called() has returned: ${util.inspect(retvalue)}`,
              );
              resolve(retvalue);
            })
            .catch((err) => {
              reject(err);
            });
        }),
    );
  }
}
