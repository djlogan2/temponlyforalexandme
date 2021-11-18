import App from "../imports/ui/app";
import {render} from "react-dom";
import * as React from "react";

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
    debugger;
    render(<App />, document.getElementById("target"));
});
