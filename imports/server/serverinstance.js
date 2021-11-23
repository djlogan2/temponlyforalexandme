"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ip = require("ip");
var mongo_1 = require("meteor/mongo");
var instancerecord_1 = require("../models/instancerecord");
var handle_1 = require("../handle");
var instanceCheck;
var defunctInstanceCheck;
Meteor.startup(function () {
    ICCServer.collections.instances = new mongo_1.Mongo.Collection('instances');
    // @ts-ignore
    ICCServer.collections.instances.attachSchema(instancerecord_1.InstanceRecordSchema);
    ICCServer.instance_id = ICCServer.collections.instances.insert({
        started: new Date(),
        lastPing: new Date(),
        ipAddress: ip.address(),
        current_release: 'x',
        current_version: 'x',
        pid: process.pid,
    });
    instanceCheck = new handle_1.Timer(function () { return ICCServer.collections.instances.update({ _id: ICCServer.instance_id }, { $set: { lastPing: new Date() } }); }, 1000);
    defunctInstanceCheck = new handle_1.Timer(function () {
        var oneminute = new Date();
        oneminute.setTime(oneminute.getTime() - 60000);
        ICCServer.collections.instances.update({
            _id: { $ne: ICCServer.instance_id },
            lastPing: { $lt: oneminute },
            handlinginstance: { $exists: false },
        }, { $set: { handlingInstance: ICCServer.instance_id } });
        if (ICCServer.collections.instances.find({ _id: ICCServer.instance_id, shuttingDown: true }).count()) {
            ICCServer.runShutdownFunctions();
            return;
        }
        var defunctinstances = ICCServer.collections.instances
            .find({ handlingInstance: ICCServer.instance_id })
            .fetch();
        defunctinstances.forEach(function (di) {
            ICCServer.events.emit('defunctinstance', di);
            ICCServer.collections.instances.remove({ _id: di._id });
        });
    }, 1000);
    ICCServer.onShutdown(function () {
        console.log('Shutdown requested');
        ICCServer.events.emit('shutdown');
        instanceCheck.stop();
        defunctInstanceCheck.stop();
        ICCServer.collections.instances.update({ _id: ICCServer.instance_id }, {
            $set: {
                shuttingDown: true,
                handlingInstance: ICCServer.instance_id,
            },
        });
    });
    process.once('exit', function () { return ICCServer.runShutdownFunctions(); });
    process.once('SIGTERM', function () { return ICCServer.runShutdownFunctions(); });
    process.once('SIGINT', function () { return ICCServer.runShutdownFunctions(); });
    process.once('SIGHUP', function () { return ICCServer.runShutdownFunctions(); });
});
