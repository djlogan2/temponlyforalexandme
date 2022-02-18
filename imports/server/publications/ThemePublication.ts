import { Subscription } from "meteor/meteor";
import ServerConnection from "/lib/server/ServerConnection";
import { ThemeRecord } from "/lib/records/ThemeRecord";
import Stoppable from "/lib/Stoppable";
import ServerUser from "/lib/server/ServerUser";
import UserChangePublication from "/imports/server/publications/UserChangePublication";

export default class ThemePublication extends UserChangePublication<ThemeRecord> {
  private user?: ServerUser;

  private readonly pTheme: (theme: string) => void;

  constructor(
    parent: Stoppable | null,
    connection: ServerConnection | null,
    publishobject: Subscription,
  ) {
    super(parent, publishobject, "themes", connection);

    this.pTheme = (theme) => this.onThemeChange(theme);
  }

  protected userLogin(user: ServerUser): void {
    if (this.user) this.user.events.off("theme", this.pTheme);

    this.user = user;
    this.user.events.on("theme", this.pTheme);
    this.onThemeChange(this.user.theme);
  }

  private onThemeChange(theme: string): void {
    this.setSelector({ _id: theme });
  }

  protected userLogout(): void {
    if (this.user) {
      this.user.events.off("theme", this.pTheme);
      delete this.user;
    }
  }

  protected stopping(): void {
    super.stopping();
    if (this.user) this.user.events.off("theme", this.pTheme);
  }
}
