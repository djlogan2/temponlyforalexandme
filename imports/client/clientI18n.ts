import { Mongo } from "meteor/mongo";

export const clientI18nCollection = new Mongo.Collection(
  "clientInternationalization",
);
