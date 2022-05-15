import { StringMap, TOptions } from "i18next";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useTranslate = () => {
  const {
    t: translate,
    i18n: i18next,
    ...rest
  } = useTranslation(["translation"]);

  const t = useCallback(
    (key: string, options?: string | TOptions<StringMap> | undefined) => {
      if (!i18next.exists(key, { lng: i18next.language, ns: "translation" })) {
        i18n.findTranslation(key, i18next.language);
      }

      return translate(key, options);
    },
    [translate, i18next],
  );

  return { t, i18next, ...rest };
};
