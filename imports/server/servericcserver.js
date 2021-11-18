"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerICCServer = void 0;
var commoniccserver_1 = require("../commoniccserver");
var ServerICCServer = /** @class */ (function (_super) {
    __extends(ServerICCServer, _super);
    function ServerICCServer() {
        var _this = _super.call(this) || this;
        _this.handles = {};
        _this.shutdown_functions = [];
        return _this;
    }
    ServerICCServer.prototype.onShutdown = function (fn) {
        this.shutdown_functions.push(Meteor.bindEnvironment(function () { return fn(); }));
    };
    ServerICCServer.prototype.runShutdownFunctions = function () {
        var x = 0;
        x++;
        this.shutdown_functions.forEach(function (fn) { return fn(); });
        process.exit(0);
    };
    return ServerICCServer;
}(commoniccserver_1.CommonICCServer));
exports.ServerICCServer = ServerICCServer;
