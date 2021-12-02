import { withTracker } from "meteor/react-meteor-data";
import { i18n } from "meteor/universe:i18n";
import ICCServer from "../../client/clienticcserver";
import {
  getLang,
  isReadySubscriptions,
  updateLocale,
} from "./data/utils/common";

const App = ({ content, i18nTranslate, isReady }) => {
  if (i18nTranslate) {
    const locale = updateLocale(i18nTranslate.locale);

    i18n.addTranslations(locale, i18nTranslate.i18n);

    i18n.setOptions({
      defaultLocale: locale,
    });

    i18n.setLocale(locale);
  }

  return isReady && content;
};

export default withTracker(() => {
  const lang = getLang();

  const subscriptions = {
    clientInternationalization: Meteor.subscribe(
      "clientInternationalization",
      lang,
    ),
  };

  return {
    isReady: isReadySubscriptions(subscriptions),
    i18nTranslate: ICCServer.collections.i18n.findOne(),
  };
})(App);
