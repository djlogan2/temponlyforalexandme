import { Mongo } from "meteor/mongo";
import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import { i18nRecord } from "/lib/records/i18nRecord";
import Stoppable from "/lib/Stoppable";

export default class Writablei18nDao extends ReadWriteDao<i18nRecord> {
  // TODO: This isn't reactive. We should probably convert this to a reactive dao,
  //  so that we can watch for changes to locale strings in order to update the exception
  //  arrays. I put the exception arrays in memory because I think it would take FOR-EVER
  //  to do this by hand for every subscription!
  //  Also, if ICC does thier jobs right, there will never BE any exceptions! :)
  private loadedtokens: string[] = [];

  private localeexceptions: { [locale: string]: string[] } = {};

  constructor(parent: Stoppable | null) {
    super("i18n", parent);
  }

  public getAllTokens(): string[] {
    if (!this.loadedtokens.length) {
      this.mongocollection.find({}).forEach((record) => {
        if (!this.loadedtokens.some((token) => token === record.token))
          this.loadedtokens.push(record.token);
      });
    }
    return this.loadedtokens;
  }

  private getLocaleExceptions(locale: string): string[] {
    if (!(locale in this.localeexceptions)) this.loadLocaleExceptions(locale);
    return this.localeexceptions[locale];
  }

  private loadLocaleExceptions(locale: string): void {
    const tokens: { [key: string]: number } = {};
    this.getAllTokens().forEach((token) => {
      tokens[token] = 1;
    });
    this.mongocollection.find({ locale }).forEach((record) => {
      if (tokens[record.token]) tokens[record.token] = 3;
      else tokens[record.token] = 2;
    });
    // 1 = we do not have a token in this language
    // 2 = somehow we got a token from the database that wasn't in the all tokens list!
    // 3 = saul goodman
    const exceptiontokens = Object.entries(tokens)
      .filter(([token, value]) => value === 1)
      .map(([token, value]) => token);
    this.localeexceptions[locale] = this.getLocaleExceptionIds(
      locale,
      exceptiontokens,
    );
  }

  private getLocaleExceptionIds(locale: string, tokenlist: string[]): string[] {
    const ids: string[] = [];
    const foundtokens: string[] = [];
    if (locale === "en") return ids;
    const parts = locale.split("_");
    let newlocale;
    if (parts.length === 2) {
      // eslint-disable-next-line prefer-destructuring
      newlocale = parts[0];
    } else newlocale = "en";

    this.mongocollection
      .find({ token: { $in: tokenlist }, locale })
      .forEach((record) => {
        ids.push(record._id);
        foundtokens.push(record.token);
      });

    const newtokenlist = tokenlist.filter(
      (token) => !foundtokens.some((token2) => token2 === token),
    );
    if (!newtokenlist.length) return ids;

    const recursiveids = this.getLocaleExceptionIds(newlocale, newtokenlist);
    return [...ids, ...recursiveids];
  }

  public getLocaleSelector(locale: string): Mongo.Selector<i18nRecord> {
    const lowerlocale = locale.toLocaleLowerCase().replaceAll("-", "_");
    const exceptions = this.getLocaleExceptions(lowerlocale);
    return { $or: [{ locale: lowerlocale }, { _id: { $in: exceptions } }] };
  }
}
