import { check, Match } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import WritableThemeDao from "/imports/server/dao/WritableThemeDao";
import ConnectionRecord from "/lib/records/ConnectionRecord";
import ThemeRecord, { EThemesEnum } from "/lib/records/ThemeRecord";
import ServerLogger from "/lib/server/ServerLogger";
import Stoppable from "/lib/Stoppable";

export default class ThemeService extends Stoppable {
  private themedao: WritableThemeDao;

  private logger;

  constructor(parent: Stoppable | null, themedao: WritableThemeDao) {
    super(parent);
    this.logger = new ServerLogger(this, "ThemeService_ts");
    this.themedao = themedao;
    if (globalThis.ICCServer.services.themeservice)
      throw new Meteor.Error("THEMESERVICE_ALREADY_DEFINED");
    globalThis.ICCServer.services.themeservice = this;

    Meteor.publish("themes", function () {
      const publishthis = this;
      let publishedId: string | null = null;

      let themeHandle: Meteor.LiveQueryHandle | null = null;
      let themeCursor: Mongo.Cursor<ThemeRecord> | null = null;

      const publishTheme = function () {
        themeCursor = globalThis.ICCServer.utilities
          .getCollection("themes")
          .find({ _id: publishedId });

        themeHandle = themeCursor.observeChanges({
          added(id: string, doc: Object) {
            publishthis.added("themes", id, doc);
            publishthis.ready();
          },
          changed(id: string, doc: Object) {
            publishthis.changed("themes", id, doc);
            publishthis.ready();
          },
          removed(id: string) {
            publishthis.removed("themes", id);
            publishedId = null;
            publishthis.ready();
            publishthis.stop();
          },
        });
      };

      function updateThemes(id: string | null) {
        if (themeHandle) themeHandle.stop();
        publishedId = id;
        if (id) publishTheme();
      }

      const connectionCusor = globalThis.ICCServer.utilities
        .getCollection("connections")
        .find({
          connectionid: this.connection.id,
        }) as Mongo.Cursor<ConnectionRecord>;

      const connectionHandle = connectionCusor.observeChanges({
        added(id, doc) {
          if ("userid" in doc) {
            updateThemes(doc.userid as string);
          }
        },
        changed(id, doc) {
          if ("userid" in doc) {
            updateThemes(doc.userid as string);
          }
        },
        removed(id) {
          updateThemes(null);
        },
      });

      this.onStop(() => {
        if (themeHandle) themeHandle.stop();
        connectionHandle.stop();
      });

      const data = globalThis.ICCServer.utilities
        .getCollection("themes")
        .find({});

      return data;
    });
  }

  protected stopping(): void {
    // Nothing to stop yet
  }
}
