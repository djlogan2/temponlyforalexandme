import { Subscription } from "meteor/meteor";
import DynamicSelectorReactiveReadOnlyDao from "/imports/dao/DynamicSelectorReactiveReadOnlyDao";
import ServerConnection from "/lib/server/ServerConnection";
import ServerUser from "/lib/server/ServerUser";
import { ThemeHeaderRecord } from "/lib/records/ThemeRecord";

export default class ThemePublication extends DynamicSelectorReactiveReadOnlyDao<ThemeHeaderRecord> {
  private connection: ServerConnection;

  private user?: ServerUser;

  private publishobject: Subscription;

  private readonly pUserlogin: (user: ServerUser) => void;

  private readonly pUserlogout: () => void;

  private readonly pTheme: (theme: string) => void;

  constructor(connection: ServerConnection, publishobject: Subscription) {
    super(connection, "themeheaders");

    this.publishobject = publishobject;

    this.pUserlogin = (user) => this.onLogin(user);
    this.pUserlogout = () => this.onLogout();
    this.pTheme = (theme) => this.onThemeChange(theme);

    this.connection = connection;
    this.connection.events.on("userlogin", this.pUserlogin);
    this.connection.events.on("userlogout", this.pUserlogout);

    if (this.connection.user) this.onLogin(this.connection.user);
  }

  private onLogin(user: ServerUser): void {
    if (this.user) this.user.events.off("theme", this.pTheme);

    this.user = user;
    this.user.events.on("theme", this.pTheme);
    this.onThemeChange(this.user.theme);
  }

  private onThemeChange(theme: string): void {
    this.setSelector({ _id: theme });
  }

  private onLogout(): void {}

  protected onFieldsChanged(
    id: string,
    record: Partial<ThemeHeaderRecord>,
  ): void {
    if (this.publishobject)
      this.publishobject.changed("themeheaders", id, record);
  }

  protected onReady(): void {
    if (this.publishobject) this.publishobject.ready();
  }

  protected onRecordAdded(
    id: string,
    record: Partial<ThemeHeaderRecord>,
  ): void {
    if (this.publishobject)
      this.publishobject.added("themeheaders", id, record);
  }

  protected onRecordRemoved(id: string): void {
    if (this.publishobject) this.publishobject.removed("themeheaders", id);
  }

  protected onStop(): void {
    this.connection.events.off("userlogin", this.pUserlogin);
    this.connection.events.off("userlogout", this.pUserlogout);
    if (this.user) this.user.events.off("theme", this.pTheme);
  }
}