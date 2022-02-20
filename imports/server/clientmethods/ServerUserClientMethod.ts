import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import ThemeService from "/imports/server/service/ThemeService";
import ConnectionService from "/imports/server/service/ConnectionService";
import { Meteor } from "meteor/meteor";
import Stoppable from "/lib/Stoppable";
import { UserRoles } from "/lib/enums/Roles";
import { ModifiableUserRecordFields } from "/lib/records/UserRecord";

interface ServerUserClientObject extends ClientCallObject {
  field: ModifiableUserRecordFields;
  value: any;
}

export default class ServerUserClientMethod extends AbstractClientMethod {
  private themeservice: ThemeService;

  constructor(
    parent: Stoppable | null,
    themeservice: ThemeService,
    connectionservice: ConnectionService,
  ) {
    super(parent, "user_set", ["field", "value"], [], connectionservice);
    this.themeservice = themeservice;
  }

  protected validatearguments(obj: ServerUserClientObject): void {
    if (!obj.user) throw new Meteor.Error("UNABLE_TO_FIND_USER");

    switch (obj.field) {
      case "username":
        break;
      case "isolation_group":
        break;
      case "locale":
        break;
      case "theme":
        if (!this.themeservice.isAuthorized(obj.user, obj.value))
          throw new Meteor.Error("THEME_UNAVAILABLE");
        break;
      case "isdeveloper":
        break;
      case "titles":
        break;
      default: {
        const check: never = obj.field;
        throw new Meteor.Error("INVALID_USER_FIELD", check);
      }
    }
  }

  protected called(obj: ServerUserClientObject): Promise<any> {
    if (!obj.user) throw new Meteor.Error("UNABLE_TO_FIND_USER");

    switch (obj.field) {
      case "username":
        break;
      case "isolation_group":
        break;
      case "locale":
        obj.user.setLocale(obj.value);
        break;
      case "theme":
        obj.user.setTheme(obj.value);
        break;
      case "isdeveloper":
        break;
      case "titles":
        break;
      default: {
        const check: never = obj.field;
        return Promise.reject(new Meteor.Error("INVALID_USER_FIELD", check));
      }
    }
    return Promise.resolve();
  }

  public isAuthorized(
    roles: UserRoles | UserRoles[],
    obj: ServerUserClientObject,
  ): boolean {
    const extendedroles: UserRoles[] = Array.isArray(roles)
      ? [...roles]
      : [roles];
    extendedroles.push(`user_set_${obj.field}`);
    return super.isAuthorized(extendedroles, obj);
  }

  protected stopping() {}
}
