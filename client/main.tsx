import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import "../lib/client/ClientServer";
import * as React from "react";
import App, { defaulApptProps } from "./app/App";

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
