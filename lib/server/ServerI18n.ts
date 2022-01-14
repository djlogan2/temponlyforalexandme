import { Meteor } from "meteor/meteor";
import WritableI18nDao from "../../imports/server/dao/WritableI18nDao";
import I18n from "../I18n";
import Stoppable from "../Stoppable";

export default class ServerI18n extends I18n {
  private writableDao: WritableI18nDao;

  constructor(parent: Stoppable | null, writableDao: WritableI18nDao) {
    super(parent);

    this.writableDao = writableDao;
    Meteor.startup(() => {
      const data = this.writableDao.readMany({});
      if (!data || !data.length) {
        this.writableDao.insert({
          locale: "en-US",
          translations: { text: "Hey there!", button: "Button v1" },
        });
      }
    });
  }

  protected stopping(): void {
    // TODO: implement this later
  }
}
