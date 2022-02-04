import { Subscription } from "meteor/meteor";
import ServerConnection from "/lib/server/ServerConnection";
import { ThemeHeaderRecord } from "/lib/records/ThemeRecord";
import Stoppable from "/lib/Stoppable";
import Publication from "/imports/server/service/Publication";
import ServerUser from "/lib/server/ServerUser";

export default class ThemePublication extends Publication<ThemeHeaderRecord> {
  private connection?: ServerConnection;

  private user?: ServerUser;

  private readonly pUserlogin: (user: ServerUser) => void;

  private readonly pUserlogout: () => void;

  private readonly pTheme: (theme: string) => void;

  constructor(
    parent: Stoppable | null,
    connection: ServerConnection | null,
    publishobject: Subscription,
  ) {
    super(parent, publishobject, "themeheaders");

    this.pUserlogin = (user) => this.onLogin(user);
    this.pUserlogout = () => this.onLogout();
    this.pTheme = (theme) => this.onThemeChange(theme);

    if (!connection) return;

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

  protected stopping(): void {
    super.stopping();
    if (this.connection) {
      this.connection.events.off("userlogin", this.pUserlogin);
      this.connection.events.off("userlogout", this.pUserlogout);
    }
    if (this.user) this.user.events.off("theme", this.pTheme);
  }
}
