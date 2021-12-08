import { i18n } from "meteor/universe:i18n";
import { useMemo } from "react";

const useTranslate = (namespace?: string) => {
  const translate = useMemo(
    () => i18n.createTranslator(namespace),
    [namespace],
  );

  return translate;
};

export default useTranslate;
