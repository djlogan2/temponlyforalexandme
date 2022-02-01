import { TToken } from "react";
import { useAppSelector } from "../../store/hooks";

const useTranslate = ({ token, args }: TToken) => {
  let translatedtext = useAppSelector(
    (state) => state.i18n.translations[token] || token,
  );

  for (let x = 0; x < args.length; x += 1) {
    const replacement = `{${x}}`;
    translatedtext = translatedtext.replaceAll(replacement, args[x]);
  }

  return translatedtext;
};

export default useTranslate;
