import "./iccserver";
import "../imports/client/clientI18n";
import "../imports/client/clientlogger";
import "../imports/client/clientdirectmessage";
import "../imports/client/clienttimetamp";
import { Provider } from "react-redux";
import { render } from "react-dom";
import * as React from "react";
import { store } from "../imports/ui/app/redux/store";
import App from "../imports/ui/app/App";

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
      <App />
    </Provider>,
    document.getElementById("root"),
  );
});
