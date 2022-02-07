import { Meteor, Subscription } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import _ from "lodash";
import WritableThemeDataDao from "/imports/server/dao/WritableThemeDataDao";
import { ThemeDataRecord, ThemeHeaderRecord } from "/lib/records/ThemeRecord";
import WritableThemeHeaderDao from "/imports/server/dao/WritableThemeHeaderDao";
import PublicationService from "/imports/server/service/PublicationService";
import ThemePublication from "/imports/server/publications/ThemePublication";
import ServerConnection from "/lib/server/ServerConnection";
import Stoppable from "/lib/Stoppable";
import themeObject from "/imports/styles/default";
import ServerUser from "/lib/server/ServerUser";

export default class ThemeService extends Stoppable {
  private themedao: WritableThemeDataDao;

  private headerdao: WritableThemeHeaderDao;

  constructor(
    parent: Stoppable | null,
    headerdao: WritableThemeHeaderDao,
    themedao: WritableThemeDataDao,
    publicationservice: PublicationService,
  ) {
    super(parent);
    this.headerdao = headerdao;
    this.themedao = themedao;
    publicationservice.publishDao(
      "themeheaders",
      (
        pub: Subscription,
        connection: ServerConnection | null,
        ...args: any[]
      ) => new ThemePublication(parent, connection, pub),
    );
  }

  private startup(): void {
    Meteor.startup(() => {
      const { styles, themename, ...rest } = themeObject;
      const header = {
        themename,
      };

      Object.entries(styles).forEach(([className, classObject]) => {
        this.updateClass(header, className, classObject as Object);
      });
    });
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

    parent = parent.replace(/(^"|"$)/g, "");

    const headerrecord = this.headerdao.readOne(header);
    let id;
    if (!headerrecord) {
      if (header._id) throw new Meteor.Error("THEME_HEADER_ID_NOT_FOUND");
      const newheader: Mongo.OptionalId<ThemeHeaderRecord> = {
        themename: header.themename as string,
        isolation_group: header.isolation_group,
        public: false,
        reactclass: {},
      };
      id = this.headerdao.insert(newheader);
    } else id = headerrecord._id;

    const themedata = this.themedao.readOne({
      theme: id,
      className,
    }) as ThemeDataRecord;

    if (!themedata) {
      const newthemerecord: Mongo.OptionalId<ThemeDataRecord> = {
        theme: id,
        className,
        parentClassName: parent,
        styleobject: classObject,
      };
      this.themedao.insert(newthemerecord);
      this.updateReactClass(id, className);
    } else if (
      themedata.parentClassName !== parent ||
      !_.isEqual(themedata.styleobject, classObject)
    ) {
      this.themedao.update(
        { _id: themedata._id },
        { $set: { parentClassName: parent, styleobject: classObject } },
      );
      this.updateReactClass(id, className);
    }
  }

  private getCombined(theme: string, className: string): any {
    const record = this.themedao.readOne({ theme, className });
    if (!record) return {};
    if (!record.parentClassName) return record?.styleobject;
    const tocombine = this.getCombined(theme, record.parentClassName);
    return _.merge(tocombine, record.styleobject);
  }

  private updateReactClass(theme: string, className: string): void {
    const allclasses: string[] = [className];
    let nextlevel = [className];

    while (nextlevel.length) {
      const classes = this.themedao.readMany({
        theme,
        parentClassName: { $in: allclasses },
      });
      nextlevel = [];
      if (classes) nextlevel = classes.map((rec) => rec.className);
      allclasses.push(...nextlevel);
    }

    const header = this.headerdao.readOne({ _id: theme });
    let updated = false;

    if (!header) throw new Meteor.Error("UNABLE_TO_FIND_THEME_HEADER");

    allclasses.forEach((newClassName) => {
      const combined = this.getCombined(theme, newClassName);
      if (
        !(header.reactclass as any)[newClassName] ||
        !_.isEqual((header.reactclass as any)[newClassName], combined)
      ) {
        (header.reactclass as any)[newClassName] = combined;
        updated = true;
      }
    });
    if (updated)
      this.headerdao.update(
        { _id: theme },
        { $set: { reactclass: header.reactclass } },
      );
  }

  public getDefaultTheme(isolationgroup?: string): string {
    let defaulttheme = this.headerdao.readOne({
      themename: "default",
      isolation_group: isolationgroup || "public",
    });
    if (!defaulttheme)
      defaulttheme = this.headerdao.readOne({
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
    const header = this.headerdao.get(themeid);
    return (
      !!header &&
      (!header.isolation_group ||
        header.isolation_group === user.isolation_group)
    );
  }
}
