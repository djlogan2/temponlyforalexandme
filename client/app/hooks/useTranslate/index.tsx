import { StringMap, TOptions } from "i18next";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const useTranslate = () => {
  const {
    t: translate,
    i18n: i18next,
    ...rest
  } = useTranslation(["translation"]);

  const t = useCallback(
    (key: string, options?: string | TOptions<StringMap> | undefined) => {
      if (!i18next.getResource(i18next.language, "translation", key)) {
        // TODO. Find out why it can't find document immediately to emit it
        setTimeout(() => {
          i18n.findTranslation(key, i18next.language);
        }, 0);
      }

      return translate(key, options);
    },
    [],
  );

  return { t, i18next, ...rest };
};

export default useTranslate;
