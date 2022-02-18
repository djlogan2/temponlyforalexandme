import { Subscription } from "meteor/meteor";
import { i18nRecord } from "/lib/records/i18nRecord";
import ServerConnection from "/lib/server/ServerConnection";
import I18nService from "/imports/server/service/i18nService";
import Stoppable from "/lib/Stoppable";
import ServerUser from "/lib/server/ServerUser";
import UserChangePublication from "/imports/server/publications/UserChangePublication";

export default class I18nPublication extends UserChangePublication<i18nRecord> {
  private user?: ServerUser | null;

  private service: I18nService;

  private readonly pLocale: (locale: string) => void;

  constructor(
    parent: Stoppable | null,
    service: I18nService,
    pub: Subscription,
    connection: ServerConnection | null,
    user: ServerUser | null,
  ) {
    super(parent, pub, "i18n", connection);

    this.pLocale = (locale) => this.onLocaleChange(locale);

    this.service = service;
    this.user = user;
  }

  protected userLogin(user: ServerUser): void {
    this.user = user;
    this.user.events.off("locale", this.pLocale);

    this.user = user;
    this.user.events.on("locale", this.pLocale);
    this.onLocaleChange(this.user.locale);
  }

  private onLocaleChange(locale: string): void {
    this.setSelector(this.service.getLocaleSelector(locale));
  }

  protected userLogout(): void {
    if (this.user) this.user.events.off("locale", this.pLocale);
    delete this.user;
  }

  protected stopping(): void {
    if (this.user) this.user.events.off("locale", this.pLocale);
  }
}
