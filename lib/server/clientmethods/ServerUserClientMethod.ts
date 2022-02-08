import AbstractClientMethod, {
  ClientCallObject,
} from "/lib/server/AbstractClientMethod";
import ThemeService from "/imports/server/service/ThemeService";
import ConnectionService from "/imports/server/service/ConnectionService";
import { Meteor } from "meteor/meteor";

interface ServerUserClientObject extends ClientCallObject {
  field: string;
  value: any;
}

export default class ServerUserClientMethod extends AbstractClientMethod {
  private themeservice: ThemeService;

  constructor(
    themeservice: ThemeService,
    connectionservice: ConnectionService,
  ) {
    super("user_set", ["field", "value"], ["user_set"], connectionservice);
    this.themeservice = themeservice;
  }

  protected validatearguments(obj: ServerUserClientObject): void {
    if (!obj.user) throw new Meteor.Error("UNABLE_TO_FIND_USER");

    switch (obj.field) {
      case "locale":
        break;
      case "theme":
        if (!this.themeservice.isAuthorized(obj.user, obj.value))
          throw new Meteor.Error("THEME_UNAVAILABLE");
        break;
      default:
        throw new Meteor.Error("INVALID_USER_FIELD");
    }
  }

  protected called(obj: ServerUserClientObject) {
    if (!obj.user) throw new Meteor.Error("UNABLE_TO_FIND_USER");

    switch (obj.field) {
      case "locale":
        obj.user.setLocale(obj.value);
        break;
      case "theme":
        obj.user.setTheme(obj.value);
        break;
      default:
        throw new Meteor.Error("INVALID_USER_FIELD");
    }
  }

  public isAuthorized(roles: string[], obj: ServerUserClientObject): boolean {
    const extendedroles = [...roles];
    extendedroles.push(`user_set_${obj.field}`);
    return super.isAuthorized(extendedroles, obj);
  }
}