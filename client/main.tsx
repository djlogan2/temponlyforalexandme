import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import Root from "./app/Root";

import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import ClientServer from "/lib/client/ClientServer";
import { store } from "./app/store";

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
  render(
    <Provider store={store}>
      <Root
        token={{
          token: "",
          args: [],
        }}
        keyboardFunctions={[]}
        classes={[]}
      />
    </Provider>,
    document.getElementById("root"),
  );
});
