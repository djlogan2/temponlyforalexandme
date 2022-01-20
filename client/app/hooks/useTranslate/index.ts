// @ts-ignore
import i18n from "meteor/universe:i18n";

const useTranslate = (namespace: string) => i18n.createTranslator(namespace);

export default useTranslate;
