import { Meteor } from "meteor/meteor";
import * as React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";

import { store } from "./data/redux/store";
import "./iccserver";
import "../imports/client/clientlogger";
import "../imports/client/clientdirectmessage";
import "../imports/client/clienttimetamp";
import "./app/routes";
import App from "./app/App";

Meteor.startup(() => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
  );
});
