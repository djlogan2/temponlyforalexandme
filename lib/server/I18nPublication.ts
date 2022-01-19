import { Meteor, Subscription } from "meteor/meteor";
import DynamicSelectorReactiveReadOnlyDao from "/imports/dao/DynamicSelectorReactiveReadOnlyDao";
import { i18nRecord } from "/lib/records/i18nRecord";
import ServerConnection from "/lib/server/ServerConnection";
import ServerUser from "/lib/server/ServerUser";
import Stoppable from "/lib/Stoppable";

export default class I18nPublication extends DynamicSelectorReactiveReadOnlyDao<i18nRecord> {
  private connection: ServerConnection;

  private user?: ServerUser;

  private publishobject?: Subscription;

  private readonly pUserlogin: (user: ServerUser) => void;

  private readonly pUserlogout: () => void;

  private readonly pLocale: (locale: string) => void;

  constructor(parent: Stoppable | null, connection: ServerConnection) {
    super(parent, "i18n");

    this.pUserlogin = (user) => this.onLogin(user);
    this.pUserlogout = () => this.onLogout();
    this.pLocale = (locale) => this.onLocaleChange(locale);

    this.connection = connection;
    this.connection.events.on("userlogin", this.pUserlogin);
    this.connection.events.on("userlogout", this.pUserlogout);

    const self = this;
    Meteor.publish("i18n", function () {
      self.publishobject = this;
      if (!self.connection.user) this.ready();
    });

    if (this.connection.user) this.onLogin(this.connection.user);
  }

  private onLogin(user: ServerUser): void {
    if (this.user) this.user.events.off("locale", this.pLocale);

    this.user = user;
    this.user.events.on("locale", this.pLocale);
    this.onLocaleChange(this.user.locale);
  }

  private onLocaleChange(locale: string): void {
    this.setSelector({ locale });
  }

  private onLogout(): void {
    // Don't just go back to the browser, leave it in whatever locale it was in when the user logged out
  }

  protected onFieldsChanged(id: string, record: Partial<i18nRecord>): void {
    if (this.publishobject) this.publishobject.changed("i18n", id, record);
  }

  protected onReady(): void {
    if (this.publishobject) this.publishobject.ready();
  }

  protected onRecordAdded(id: string, record: Partial<i18nRecord>): void {
    if (this.publishobject) this.publishobject.added("i18n", id, record);
  }

  protected onRecordRemoved(id: string): void {
    if (this.publishobject) this.publishobject.removed("i18n", id);
  }

  protected onStop(): void {
    this.connection.events.off("userlogin", this.pUserlogin);
    this.connection.events.off("userlogout", this.pUserlogout);
    if (this.user) this.user.events.off("locale", this.pLocale);
  }
}
