import { english } from "../../imports/i18n/english";

export interface I18nRecord {
  _id: string;
  locale: string;
  i18n: typeof english;
}
