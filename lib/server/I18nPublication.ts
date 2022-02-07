import { Subscription } from "meteor/meteor";
import { i18nRecord } from "/lib/records/i18nRecord";
import ServerConnection from "/lib/server/ServerConnection";
import I18nService from "/imports/server/service/i18nService";
import Stoppable from "/lib/Stoppable";
import Publication from "/imports/server/service/Publication";
import ServerUser from "/lib/server/ServerUser";

export default class I18nPublication extends Publication<i18nRecord> {
  private connection: ServerConnection | null;

  private user?: ServerUser | null;

  private service: I18nService;

  private readonly pUserlogin: (user: ServerUser) => void;

  private readonly pUserlogout: () => void;

  private readonly pLocale: (locale: string) => void;

  constructor(
    parent: Stoppable | null,
    service: I18nService,
    pub: Subscription,
    connection: ServerConnection | null,
    user: ServerUser | null,
  ) {
    super(parent, pub, "i18n");

    this.pUserlogin = (user2) => this.onLogin(user2);
    this.pUserlogout = () => this.onLogout();
    this.pLocale = (locale) => this.onLocaleChange(locale);

    this.service = service;
    this.connection = connection;
    this.user = user;
    if (this.connection) {
      this.connection.events.on("userlogin", this.pUserlogin);
      this.connection.events.on("userlogout", this.pUserlogout);
      if (this.connection.user) this.onLogin(this.connection.user);
    }
  }

  private onLogin(user: ServerUser): void {
    if (this.user) this.user.events.off("locale", this.pLocale);

    this.user = user;
    this.user.events.on("locale", this.pLocale);
    this.onLocaleChange(this.user.locale);
  }

  private onLocaleChange(locale: string): void {
    this.setSelector(this.service.getLocaleSelector(locale));
  }

  private onLogout(): void {
    // Don't just go back to the browser, leave it in whatever locale it was in when the user logged out
  }

  protected stopping(): void {
    if (this.connection) {
      this.connection.events.off("userlogin", this.pUserlogin);
      this.connection.events.off("userlogout", this.pUserlogout);
    }
    if (this.user) this.user.events.off("locale", this.pLocale);
  }
}
