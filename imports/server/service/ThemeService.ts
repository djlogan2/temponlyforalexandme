import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import _ from "lodash";
import WritableThemeDao from "/imports/server/dao/WritableThemeDao";
import { ThemeRecord } from "/lib/records/ThemeRecord";
import ThemePublication from "/lib/server/ThemePublication";
import themeObject from "/imports/theme/default";

export default class ThemeService {
  private themedao: WritableThemeDao;

  constructor(
    themedao: WritableThemeDao,
  ) {
    this.themedao = themedao;
    globalThis.ICCServer.services.themeservice = this;
  }

  public createTheme(theme: Mongo.OptionalId<ThemeRecord>) {
    return this.themedao.insert(theme);
  }

  public getThemes(
    selector: Mongo.Selector<ThemeRecord>,
    includeOrExclude?: "include" | "exclude",
    fields?: (keyof ThemeRecord)[],
  ) {
    return this.themedao.readMany(selector, includeOrExclude, fields);
  }

  public getDefaultTheme(isolationgroup?: string): string {
    let defaulttheme = this.themedao.readOne({
      themename: "default",
      isolation_group: isolationgroup || "public",
    });
    if (!defaulttheme)
      defaulttheme = this.themedao.readOne({
        themename: "default",
        isolation_group: { $exists: false },
      });
    if (!defaulttheme)
      throw new Meteor.Error(
        "Unable to find a default theme to assign to a new user",
      );
    return defaulttheme._id;
  }
}

Meteor.startup(() => {
  if (!globalThis.ICCServer?.services?.themeservice) return;

  const themes = globalThis.ICCServer.services.themeservice.getThemes({});
  // Insert default theme, if the collection is empty
  if (!(themes && themes.length)) {
    globalThis.ICCServer.services.themeservice.createTheme(
      themeObject
    );
  }
});

globalThis.ICCServer.utilities.publish("themes", function () {
  const connection = globalThis.ICCServer.utilities.getConnection(
    this.connection,
  );
  if (!connection) return;
  const themepub = new ThemePublication(connection, this);
  if (!connection.user) this.ready();
});
