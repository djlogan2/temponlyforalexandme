import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import CommonClientI18N from "../commonI18n";
import Emitter from "../emitter";
import ClientICCServer from "./clienticcserver";
import { getLang } from "/client/data/utils/common";

export default class I18N extends CommonClientI18N {
  static subscribe = (): Tracker.Computation =>
    Tracker.autorun(() => {
      const lang = getLang();

      const sub = Meteor.subscribe("clientInternationalization", lang);

      const data = {
        isReady: sub.ready(),
        i18nTranslate: ClientICCServer.collections.i18n?.findOne(),
      };

      Emitter.emit("I18N_CHANGE", data);
    });
}
