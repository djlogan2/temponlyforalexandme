import * as React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { noAuthRoutes, authRoutes } from "./routes";
import NonAuthGuard from "./guards/nonAuthGuard";
import AuthGuard from "./guards/authGuard";

import { i18n } from "meteor/universe:i18n";
import { useEffect, useState } from "react";

import I18N from "../../imports/client/clientI18n";
import { I18nRecord } from "../../imports/models/i18nrecord";
import { updateLocale } from "../data/utils/common";
import useEventEmitter from "../data/hooks/useEventEmitter";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [i18nTranslate, setI18nTranslate] = useState<I18nRecord | null>(null);

  const [isReady, setIsReady] = useState(false);
  const { data } = useEventEmitter<{
    isReady: boolean;
    i18nTranslate: I18nRecord;
  }>({
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

  return (
    !isLoading &&
    isReady && (
      <Router>
        <Switch>
          {noAuthRoutes.map(({ component, path, exact, ...rest }) => (
            <NonAuthGuard
              key={path}
              component={component}
              auth={!!Meteor.userId()}
              {...rest}
            />
          ))}
          {authRoutes.map(({ component, path, ...rest }) => (
            <AuthGuard
              roles={[]}
              key={path}
              component={component}
              auth={!!Meteor.userId()}
              {...rest}
              currentRoles={[]}
            />
          ))}
        </Switch>
      </Router>
    )
  );
};

export default App;
