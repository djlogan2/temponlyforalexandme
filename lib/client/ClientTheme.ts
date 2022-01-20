import CommonTheme from "/lib/CommonTheme";
import ThemeReadOnlyDao from "/imports/client/dao/ThemeReadOnlyDao";
import { Meteor } from "meteor/meteor";

export default class ClientTheme extends CommonTheme {
  dao: ThemeReadOnlyDao;

  constructor(dao: ThemeReadOnlyDao) {
    super();
    this.dao = dao;
    // TODO: This is a placeholder for now
    //   We may have theme events, but if we don't, we should probably write a little bit of scaffolding that
    //   will subscribe without an event, orrrrrrrr, we could publish a null publication on the server which of
    //   course would no longer require an explicit subscription.
    dao.events.on("event", () => {});
  }

  public getStyle(className: string): object {
    const themerecord = this.dao.readOne({ className });

    if (!themerecord) {
      throw new Meteor.Error(
        `Unable to find a theme record for class ${className}`,
      );
    }

    if (themerecord.parentClassName !== "root") {
      const parent = this.getStyle(themerecord.parentClassName);
      return { ...parent, ...themerecord.styleobject };
    }
    return themerecord.styleobject;
  }
}
