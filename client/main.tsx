import { Meteor } from "meteor/meteor";
import { BrowserRouter as Router } from "react-router-dom";
// @ts-ignore
import { createRoot } from "react-dom/client";

import * as React from "react";
import Root from "./app/Root";

const container = document.getElementById("root");
const root = createRoot(container!);

Meteor.startup(() => {
  root.render(
    <Router>
      <Root />
    </Router>,
  );
});
