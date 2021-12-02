import { isEqual } from "lodash";
import { check, Match } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import CommonClientI18N from "../commonClientI18n";
import { english } from "../i18n/english";

const mongoClientInternationalization = new Mongo.Collection(
  "clientInternationalization",
);

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
    const userIntance = Meteor.users.findOne({ _id: this.userId });
    options.locale = userIntance.locale;
  }

  const localeInstance = mongoClientInternationalization.findOne(options);

  if (localeInstance) {
    return mongoClientInternationalization.find(options);
  }

  return mongoClientInternationalization.find({ locale: "en-us" });
});

Meteor.startup(() => {
  if (Meteor.isTest || Meteor.isAppTest) {
    return;
  }

  const data = mongoClientInternationalization.findOne({ locale: "en-us" });

  if (!data || !isEqual(data["i18n"], english)) {
    mongoClientInternationalization.update(
      { locale: "en-us" },
      { $set: { i18n: english } },
      { upsert: true },
    );
  }
});
