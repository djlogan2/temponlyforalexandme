import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { i18n } from "meteor/universe:i18n";

import { getLang, updateLocale } from "../../client/data/utils/common";
import CommonClientI18N from "../commonI18n";
import Emitter from "../emitter";
import ClientICCServer from "./clienticcserver";
import { EEmitterEvents } from "/client/data/hooks/useEventEmitter/events";

export default class I18N extends CommonClientI18N {
  static subscribe = (): Tracker.Computation =>
    Tracker.autorun(() => {
      const lang = getLang();

      const sub = Meteor.subscribe("clientInternationalization", lang);
      const isReady = sub.ready();
      if (isReady) {
        const i18nTranslate = ClientICCServer.collections.i18n?.findOne();

        if (!i18nTranslate) {
          return;
        }

        const locale = updateLocale(i18nTranslate.locale);
        i18n.addTranslations(locale, i18nTranslate.i18n);

        i18n.setLocale(locale);

        Emitter.emit(EEmitterEvents.I18N_CHANGE, { isReady });
      }
    });
}
