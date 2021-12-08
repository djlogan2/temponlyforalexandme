import { i18n } from "meteor/universe:i18n";
import { useEffect, useState } from "react";

import I18N from "../../client/clientI18n";
import { I18nRecord } from "../../models/i18nrecord";
import { updateLocale } from "./data/utils/common";
import useEventEmitter from "./data/hooks/useEventEmitter";

const App = ({ content }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [i18nTranslate, setI18nTranslate] = useState<I18nRecord>(null);

  const [isReady, setIsReady] = useState(false);
  const { data } = useEventEmitter<{ isReady: boolean; i18nTranslate: I18nRecord }>({
    event: "I18N_CHANGE",
    tracker: I18N.subscribe,
    shouldTrackerUnmount: true,
  });

  useEffect(() => {
    if (data?.isReady) {
      console.log(data);
      setIsReady(true);
      setIsLoading(true);
      setI18nTranslate(data.i18nTranslate);
    }
  }, [data]);

  useEffect(() => {
    i18n.onChangeLocale(() => {
      setIsLoading(false);
    });
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
