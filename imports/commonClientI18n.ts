import CommonICCServer from "./commoniccserver";

declare const ICCServer: CommonICCServer;

export default abstract class CommonClientI18N {}

Meteor.startup(() => {
  if (!ICCServer.collections.i18n) {
    ICCServer.collections.i18n = new Mongo.Collection(
      "clientInternationalization",
    );
  }
});
