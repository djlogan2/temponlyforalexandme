import { i18n } from "meteor/universe:i18n";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { I18nRecord } from "../../models/i18nrecord";
import { updateLocale } from "./data/utils/common";
import SignUp from "./pages/SignUp/SignUp";
import { subscribeToI18n } from "./redux/reducers/i18n";
import { RootState } from "./redux/store";

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const i18nTranslate = useSelector<RootState, I18nRecord>(
    (state) => state.i18n.translations,
  );
  const isI18nReady = useSelector<RootState, boolean>(
    (state) => state.i18n.isReady,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    i18n.onChangeLocale(() => {
      setIsLoading(false);
    });

    dispatch(subscribeToI18n());
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
    isI18nReady && (
      <BrowserRouter>
        <Routes>
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    )
  );
};

export default App;
