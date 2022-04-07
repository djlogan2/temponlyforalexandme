import { Meteor } from "meteor/meteor";
import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./app/Root";

Meteor.startup(() => {
  render(
    <Router>
      <Root />
    </Router>,
    document.getElementById("root"),
  );
});
