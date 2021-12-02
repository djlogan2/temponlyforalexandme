import { isEqual } from "lodash";
import { check, Match } from "meteor/check";
import { Meteor } from "meteor/meteor";
import ServerICCServer from "./servericcserver";

import CommonClientI18N from "../commonclient18n";
import { english } from "../i18n/english";

declare const ICCServer: ServerICCServer;

export default class ServerClientI18N extends CommonClientI18N {}

Meteor.publish("clientInternationalization", (locale) => {
  check(locale, Match.Maybe(String));

  const options = {
    locale: null,
  };

  const acceptLanguage = locale
    .split(/[,;]/)[0]
    .toLocaleLowerCase()
    .replace("_", "-");

  if (!this.userId) {
    options.locale = acceptLanguage;
  } else {
    const userInstance = Meteor.users.findOne({ _id: this.userId });
    options.locale = userInstance.locale;
  }

  const localeInstance = ICCServer.collections.i18n.findOne(options);

  if (localeInstance) {
    return ICCServer.collections.i18n.find(options);
  }

  return ICCServer.collections.i18n.find({ locale: "en-us" });
});

Meteor.startup(() => {
  if (Meteor.isTest || Meteor.isAppTest) {
    return;
  }

  const data = ICCServer.collections.i18n.findOne({ locale: "en-us" });

  if (!data || !isEqual(data.i18n, english)) {
    ICCServer.collections.i18n.update(
      { locale: "en-us" },
      { $set: { i18n: english } },
      { upsert: true },
    );
  }
});
