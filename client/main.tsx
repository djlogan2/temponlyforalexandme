import CommonReadOnlyI18nDao from "/imports/dao/CommonReadOnlyI18nDao";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import * as React from "react";
import App, { defaulApptProps } from "./app/App";

import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import CommonReadOnlyThemeDao from "/imports/dao/CommonReadOnlyThemeDao";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import ClientServer from "/lib/client/ClientServer";

globalThis.subscriptionservice = new SubscriptionService(null);
globalThis.loggerconfigdao = new ReadOnlyLoggerConfigurationDao(
  null,
  window.subscriptionservice,
);
const userdao = new CommonReadOnlyUserDao(null);
const themedao = new CommonReadOnlyThemeDao(null);
const i18ndao = new CommonReadOnlyI18nDao(null);

globalThis.icc = new ClientServer(userdao, themedao, i18ndao);

// window.onerror = function myErrorHandler(
//     message: Event | string,
//     source: string | undefined,
//     lineno: number | undefined,
//     colno: number | undefined,
//     error: Error | undefined
// ): boolean {
//     console.log("DO ME");
//     return false;
// };

Meteor.startup(() => {
  render(<App {...defaulApptProps} />, document.getElementById("root"));
});
