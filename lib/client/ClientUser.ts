import { Meteor } from "meteor/meteor";
import User from "/lib/User";
import Stoppable from "/lib/Stoppable";
import { SubscriptionNames } from "/lib/SubscriptionNames";
import ICCEventEmitter from "/lib/ICCEventEmitter";
import EventEmitter from "eventemitter3";

type UserEvents = "locale";

export default class ClientUser extends User {
  private readonly pEvents:
    | ICCEventEmitter<UserEvents>
    | EventEmitter<UserEvents>;

  public get events() {
    return this.pEvents;
  }

  /**
   *
   * @param{Stoppable|null} parent Our parent if we have one
   * @param{string} id The userid of the user
   * @param{SubscriptionNames} subscription If the user isn't the logged on user, getting him into the collection will require a subscription.
   */
  constructor(
    parent: Stoppable | null,
    id: string,
    subscription?: SubscriptionNames,
  ) {
    super(parent, id, globalThis.userdao);
    globalThis.userlist[id] = this;
    if (subscription) {
      this.pEvents = globalThis.subscriptionservice.getSubscriptionEventEmitter(
        this,
        subscription,
      );
    } else {
      this.pEvents = new EventEmitter();
    }
  }

  public setLocale(locale: string): void {
    Meteor.call("user_set", "locale", locale);
  }

  setTheme(theme: string | null): void {
    Meteor.call("user_set", "theme", theme);
  }

  public localeUpdated(locale: string): void {
    this.pEvents.emit("locale", locale);
  }

  protected stopping(): void {
    this.pEvents.removeAllListeners();
    delete globalThis.userlist[this.id];
  }
}
