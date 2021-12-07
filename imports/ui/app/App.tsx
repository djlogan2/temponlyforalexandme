import { i18n } from "meteor/universe:i18n";
import { useEffect, useState } from "react";

import Emitter from "../../Emitter";

import I18N from "../../client/clientI18n";
import { I18nRecord } from "../../models/i18nrecord";
import { updateLocale } from "./data/utils/common";

const App = ({ content }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [i18nTranslate, setI18nTranslate] = useState<I18nRecord>(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    i18n.onChangeLocale(() => {
      setIsLoading(false);
    });

    // start Tracker.autorun method
    const sub = I18N.subscribe();

    // Listen for changes
    Emitter.on<{ isReady: boolean; i18nTranslate: I18nRecord }>(
      "I18N_CHANGE",
      (data) => {
        if (data.isReady) {
          setIsReady(true);
          setIsLoading(true);
          setI18nTranslate(data.i18nTranslate);
        }
      },
    );

    return () => {
      // No need to call emit.off("I18N_CHANGE") here since it's the only subscriber
      // unsubscribing from Tracker.auto run will destroy the subscription
      // Also it's not required to unsubscribe here since it's the top level component that always exists
      sub.stop();
    };
  }, []);

  useEffect(() => {
    if (i18nTranslate) {
      const locale = updateLocale(i18nTranslate.locale);
      i18n.addTranslations(locale, i18nTranslate.i18n);

      i18n.setLocale(locale);
    }
  }, [i18nTranslate]);

  return isReady && !isLoading && content;
};

export default App;
