import { Meteor, Subscription } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import WritableThemeDao from "/imports/server/dao/WritableThemeDao";
import { ThemeRecord } from "/lib/records/ThemeRecord";
import PublicationService from "/imports/server/service/PublicationService";
import ThemePublication from "/imports/server/publications/ThemePublication";
import ServerConnection from "/lib/server/ServerConnection";
import Stoppable from "/lib/Stoppable";
import themeObject from "/imports/theme/default";
import ServerUser from "/lib/server/ServerUser";

export default class ThemeService extends Stoppable {
  private themedao: WritableThemeDao;

  constructor(
    parent: Stoppable | null,
    themedao: WritableThemeDao,
    publicationservice: PublicationService,
  ) {
    super(parent);
    this.themedao = themedao;
    publicationservice.publishDao(
      "themes",
      (
        pub: Subscription,
        connection: ServerConnection | null,
        ...args: any[]
      ) => new ThemePublication(parent, connection, pub),
    );

    this.startup();
  }

  private startup(): void {
    Meteor.startup(() => {
      const themes = this.getThemes({});

      // Insert default theme, if the collection is empty
      if (!(themes && themes.length)) {
        this.createTheme(themeObject);
      }
    });
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

  protected stopping(): void {}

  isAuthorized(user: ServerUser, themeid: string): boolean {
    const header = this.themedao.get(themeid);
    return (
      !!header &&
      (!header.isolation_group ||
        header.isolation_group === user.isolation_group)
    );
  }
}
