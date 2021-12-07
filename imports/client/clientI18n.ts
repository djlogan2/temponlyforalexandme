import { Tracker } from "meteor/tracker";
import CommonClientI18N from "../commonClientI18n";
import Emitter from "../Emitter";
import { getLang } from "../ui/app/data/utils/common";
import ClientICCServer from "./clienticcserver";

export default class I18N extends CommonClientI18N {
  static subscribe = (): Tracker.Computation =>
    Tracker.autorun(() => {
      const lang = getLang();

      const sub = Meteor.subscribe("clientInternationalization", lang);

      const data = {
        isReady: sub.ready(),
        i18nTranslate: ClientICCServer.collections.i18n.findOne(),
      };

      Emitter.emit("I18N_CHANGE", data);
    });
}
