"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_1 = require("meteor/mongo");
var connectionrecord_1 = require("../models/connectionrecord");
var handle_1 = require("../handle");
var ServerConnection = /** @class */ (function () {
    function ServerConnection() {
    }
    return ServerConnection;
}());
exports.default = ServerConnection;
Meteor.startup(function () {
    ICCServer.collections.connections = new mongo_1.Mongo.Collection('connections');
    // @ts-ignore
    ICCServer.collections.connections.attachSchema(connectionrecord_1.ConnectionRecordSchema);
    ICCServer.onShutdown(function () {
        ICCServer.collections.connections.remove({ instance_id: ICCServer.instance_id });
        ICCServer.handles.defunctConnectionCheck.stop();
    });
    Meteor.onConnection(function (connection) {
        ICCServer.collections.connections.insert({ connection_id: connection.id, create_date: new Date(), instance_id: ICCServer.instance_id });
        ICCServer.events.emit('connectionestablished', connection);
        var onclose = Meteor.bindEnvironment(function () {
            ICCServer.events.emit('connectionclosed', connection.id);
            ICCServer.collections.connections.remove({ connection_id: connection.id });
        });
        connection.onClose(onclose);
    });
    ICCServer.events.on('defunctinstance', function (inst) {
        ICCServer.collections.connections.update({ instance_id: inst._id, handlingInstance: { $exists: false } }, { $set: { handlingInstance: ICCServer.instance_id } });
        ICCServer.collections.connections.find({ handlingInstance: ICCServer.instance_id }).forEach(function (connection) {
            console.log("Session found for a defunct instance! Removing from our table. connection=".concat(connection.connection_id));
            ICCServer.events.emit('connectionclosed', connection.connection_id);
            ICCServer.collections.connections.remove({ _id: connection._id });
        });
    });
    ICCServer.handles.defunctConnectionCheck = new handle_1.Timer(function () {
        // @ts-ignore
        var meteor = Array.from(Meteor.server.sessions.keys());
        var ourtable = ICCServer.collections.connections.find({ instance_id: ICCServer.instance_id }, { fields: { connection_id: 1 } }).fetch().map(function (rec) { return rec.connection_id; });
        var inMeteorAndNotOurs = meteor.filter(function (cid) { return !ourtable.some(function (ocid) { return ocid === cid; }); });
        var inOursAndNotMeteor = ourtable.filter(function (ocid) { return !meteor.some(function (cid) { return ocid === cid; }); });
        inMeteorAndNotOurs.forEach(function (connectionid) {
            ICCServer.collections.connections.insert({ instance_id: ICCServer.instance_id, connection_id: connectionid, create_date: new Date() });
            // @ts-ignore
            ICCServer.events.emit('connectionestablished', Meteor.server.session.get(connectionid));
            console.log("Session found in meteor that we do not have! Added to our table. connection=".concat(connectionid));
        });
        inOursAndNotMeteor.forEach(function (connectionid) {
            console.log("Session found in our table that Meteor does not have! Removing from our table. connection=".concat(connectionid));
            ICCServer.events.emit('connectionclosed', connectionid);
        });
    }, 1000);
});
