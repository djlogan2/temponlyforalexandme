import ConnectionRecord from "/lib/records/ConnectionRecord";
import ThemeRecord from "/lib/records/ThemeRecord";
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import ServerLogger from "../../../lib/server/ServerLogger";
import Stoppable from "../../../lib/Stoppable";
import WritableI18nDao from "../dao/WritableI18nDao";

export default class I18nService extends Stoppable {
  private i18ndao: WritableI18nDao;

  private logger;

  constructor(parent: Stoppable | null, i18ndao: WritableI18nDao) {
    super(parent);

    this.logger = new ServerLogger(this, "I18nService_ts");
    this.i18ndao = i18ndao;

    if (globalThis.ICCServer.services.i18nservice)
      throw new Meteor.Error("THEMESERVICE_ALREADY_DEFINED");
    globalThis.ICCServer.services.i18nservice = this;

    Meteor.publish("i18n", function () {
      const publishthis = this;
      let publishedId: string | null = null;

      let i18nHandle: Meteor.LiveQueryHandle | null = null;
      let i18nCursor: Mongo.Cursor<ThemeRecord> | null = null;

      const publishI18n = function () {
        i18nCursor = globalThis.ICCServer.utilities
          .getCollection("clientI18n")
          .find({ _id: publishedId });

        i18nHandle = i18nCursor.observeChanges({
          added(id: string, doc: Object) {
            publishthis.added("clientI18n", id, doc);
            publishthis.ready();
          },
          changed(id: string, doc: Object) {
            publishthis.changed("clientI18n", id, doc);
            publishthis.ready();
          },
          removed(id: string) {
            publishthis.removed("clientI18n", id);
            publishedId = null;
            publishthis.ready();
            publishthis.stop();
          },
        });
      };

      function updateI18ns(id: string | null) {
        if (i18nHandle) i18nHandle.stop();
        publishedId = id;
        if (id) publishI18n();
      }

      const connectionCusor = globalThis.ICCServer.utilities
        .getCollection("connections")
        .find({
          connectionid: this.connection.id,
        }) as Mongo.Cursor<ConnectionRecord>;

      const connectionHandle = connectionCusor.observeChanges({
        added(id, doc) {
          if ("userid" in doc) {
            updateI18ns(doc.userid as string);
          }
        },
        changed(id, doc) {
          if ("userid" in doc) {
            updateI18ns(doc.userid as string);
          }
        },
        removed(id) {
          updateI18ns(null);
        },
      });

      this.onStop(() => {
        if (i18nHandle) i18nHandle.stop();
        connectionHandle.stop();
      });

      return globalThis.ICCServer.utilities
        .getCollection("clientI18n")
        .find({});
    });
  }

  protected stopping(): void {}
}
