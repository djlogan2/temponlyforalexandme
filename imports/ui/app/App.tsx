import * as React from "react";
import { i18n } from "meteor/universe:i18n";
import { withTracker } from "meteor/react-meteor-data";
import { clientI18nCollection } from "../../client/clientI18n";
import {
  updateLocale,
  getLang,
  isReadySubscriptions,
} from "./data/utils/common";

const App = ({ content, i18nTranslate }) => {
  React.useEffect(() => {
    if (i18nTranslate) {
      const locale = updateLocale(i18nTranslate.locale);
      i18n.addTranslations(locale, i18nTranslate.i18n);

      i18n.setOptions({
        defaultLocale: locale,
      });
    }
  }, [i18nTranslate]);

  return content;
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
    i18nTranslate: clientI18nCollection.findOne(),
  };
})(App);
