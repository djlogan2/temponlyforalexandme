import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import _ from "lodash";
import transform from "css-to-react-native-transform";
import WritableThemeDataDao from "/imports/server/dao/WritableThemeDataDao";
import { ThemeData, ThemeHeaderRecord } from "/lib/records/ThemeRecord";
import WritableThemeHeaderDao from "/imports/server/dao/WritableThemeHeaderDao";
import ThemePublication from "/lib/server/ThemePublication";

export default class ThemeService {
  private themedao: WritableThemeDataDao;

  private headerdao: WritableThemeHeaderDao;

  constructor(
    headerdao: WritableThemeHeaderDao,
    themedao: WritableThemeDataDao,
  ) {
    this.headerdao = headerdao;
    this.themedao = themedao;
    globalThis.ICCServer.services.themeservice = this;
  }

  public updateClass(
    header: Partial<ThemeHeaderRecord>,
    className: string,
    _classObject: any,
  ): void {
    let parent;
    const classObject = { ..._classObject };

    if (className === "system") {
      if ("parent" in classObject)
        throw new Meteor.Error("SYSTEM_CANNOT_HAVE_PARENT");
      parent = "root";
    } else if (!("parent" in classObject))
      throw new Meteor.Error("CSS_CLASS_MUST_HAVE_A_PARENT");
    else {
      parent = classObject.parent;
      delete classObject.parent;
    }

    const headerrecord = this.headerdao.readOne(header);
    let id;
    if (!headerrecord) {
      if (header._id) throw new Meteor.Error("THEME_HEADER_ID_NOT_FOUND");
      const newheader: Mongo.OptionalId<ThemeHeaderRecord> = {
        themename: header.themename as string,
        isolation_group: header.isolation_group,
        public: false,
      };
      id = this.headerdao.insert(newheader);
    } else id = headerrecord._id;

    const themedata = this.themedao.readOne({ theme: id, className });

    if (!themedata) {
      const newthemerecord: Mongo.OptionalId<ThemeData> = {
        theme: id,
        className,
        parentClassName: parent,
        styleobject: classObject,
      };
      this.themedao.insert(newthemerecord);
    } else if (
      themedata.parentClassName !== parent ||
      !_.isEqual(themedata.styleobject, classObject)
    ) {
      this.themedao.update(
        { _id: themedata._id },
        { $set: { parentClassName: parent, styleobject: classObject } },
      );
    }
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

function getThemeRecordFromComments(css: string): Partial<ThemeHeaderRecord> {
  const record: Partial<ThemeHeaderRecord> = {};
  const re = /(\/\*\s*(_id|themename|isolation_group)\s*:\s*(.*?)\s*\*\/)/;
  const testme: string[] = css.split(re);
  if (testme.length > 1) testme.shift();
  while (testme.length > 1) {
    testme.shift(); // /* key: value */
    const key = testme.shift() as "_id" | "themename" | "isolation_group";
    const value = testme.shift();
    testme.shift(); // the newline
    record[key] = value;
  }
  if ("_id" in record) {
    if (Object.keys(record).length > 1)
      throw new Meteor.Error("THEME_ID_MUST_BE_ONLY_IDENTIFIER");
  } else if (!Object.keys(record).length)
    throw new Meteor.Error("THEME_HEADER_COMMENTS_NOT_FOUND");
  else if (!("themename" in record))
    throw new Meteor.Error("THEME_HEADER_THEMENAME_OR_ID_IS_REQUIRED");

  return record;
}

Meteor.startup(() => {
  const css = Assets.getText("default.css");
  const reactobject = transform(css);
  const header = getThemeRecordFromComments(css);

  Object.entries(reactobject).forEach(([className, classObject]) => {
    if (!globalThis.ICCServer?.services?.themeservice) return;
    globalThis.ICCServer.services.themeservice.updateClass(
      header,
      className,
      classObject as Object,
    );
  });
});

globalThis.ICCServer.utilities.publish("themes", function () {
  const connection = globalThis.ICCServer.utilities.getConnection(
    this.connection,
  );
  if (!connection) return;
  const themepub = new ThemePublication(connection, this);
  if (!connection.user) this.ready();
});
