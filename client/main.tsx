import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import * as React from "react";
import Root from "./app/Root";

Meteor.startup(() => {
  render(<Root />, document.getElementById("root"));
});
