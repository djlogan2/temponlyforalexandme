import EventEmitter from "eventemitter3";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import CommonReadOnlyI18nDao from "../../imports/dao/CommonReadOnlyI18nDao";
import I18n from "../I18n";
import { EThemesEnum } from "../records/ThemeRecord";
import Stoppable from "../Stoppable";

export default class ClientI18n extends I18n {
  public eventemitter = new EventEmitter();

  private locale: string;

  private pEvents;

  public get events() {
    return this.pEvents;
  }

  constructor(parent: Stoppable | null, locale: string) {
    super(parent);

    this.locale = locale;
    globalThis.i18n = this;

    this.pEvents =
      globalThis.subscriptionservice.getSubscriptionEventEmitter("i18n");

    Tracker.autorun(() => {
      const sub = Meteor.subscribe("i18n");

      if (sub.ready()) {
        this.changeI18n(locale);
      }
    });
  }

  public changeI18n(locale: string) {
    const i18nsObject = globalThis.connection?.getI18n(locale);
    this.pEvents.emit("i18n", i18nsObject);
  }

  protected stopping(): void {
    this.pEvents.removeAllListeners();
  }
}
