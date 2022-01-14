import EventEmitter from "eventemitter3";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { EThemesEnum } from "../records/ThemeRecord";
import Stoppable from "../Stoppable";
import Theme from "/lib/Theme";

export default class ClientTheme extends Theme {
  public eventemitter = new EventEmitter();

  private pEvents;

  public get events() {
    return this.pEvents;
  }

  constructor(
    parent: Stoppable | null,
    theme: EThemesEnum = EThemesEnum.LIGHT,
  ) {
    super(parent, globalThis.themedao);
    globalThis.theme = this;

    this.pEvents =
      globalThis.subscriptionservice.getSubscriptionEventEmitter("themes");

    Tracker.autorun(() => {
      const sub = Meteor.subscribe("themes");

      if (sub.ready()) {
        this.changeTheme(theme);
      }
    });
  }

  public changeTheme(theme: EThemesEnum) {
    const themesObject = globalThis.connection?.getTheme(theme);
    this.pEvents.emit("themes", themesObject);
  }

  protected stopping(): void {
    this.pEvents.removeAllListeners();
  }
}
