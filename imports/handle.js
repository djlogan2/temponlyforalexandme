"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
var Timer = /** @class */ (function () {
    function Timer(fn, ms) {
        this.handle = Meteor.setInterval(fn, ms);
    }
    Timer.prototype.stop = function () {
        Meteor.clearInterval(this.handle);
    };
    return Timer;
}());
exports.Timer = Timer;
