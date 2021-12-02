"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meteor_1 = require("meteor/meteor");
var React = require("react");
var react_redux_1 = require("react-redux");
var react_dom_1 = require("react-dom");
var store_1 = require("./data/redux/store");
require("./iccserver");
require("../imports/client/clientlogger");
require("../imports/client/clientdirectmessage");
require("../imports/client/clienttimetamp");
require("./app/routes");
var App_1 = require("./app/App");
meteor_1.Meteor.startup(function () {
    (0, react_dom_1.render)(<React.StrictMode>
      <react_redux_1.Provider store={store_1.store}>
        <App_1.default />
      </react_redux_1.Provider>
    </React.StrictMode>, document.getElementById("root"));
});
