import { TRequiredComponentProps, TToken } from "react";
import { useAppSelector } from "../../store/hooks";

const useTranslate = ({ token, args }: TToken) => {
  const translation = useAppSelector((state) => state.i18n.translations[token]);

  let translatedtext = translation;

  for (let x = 0; x < args.length; x += 1) {
    const replacement = `{${x}}`;
    translatedtext = translatedtext.replaceAll(replacement, args[x]);
  }

  return translatedtext;
};

export default useTranslate;
