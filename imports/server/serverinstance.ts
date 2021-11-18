import {InstanceRecord, InstanceRecordSchema} from "../models/instancerecord";
import {Timer} from "../handle";
import * as ip from "ip";
import {ServerICCServer} from "./servericcserver";
import {RemoteInstance} from "../commoninstance";

declare const ICCServer: ServerICCServer;

Meteor.startup(() => {
    ICCServer.collections.instances = new Mongo.Collection<InstanceRecord>("instances");
    // @ts-ignore
    ICCServer.collections.instances.attachSchema(InstanceRecordSchema);
    ICCServer.instance_id = ICCServer.collections.instances.insert({started: new Date(), lastPing: new Date(), ipAddress: ip.address(), current_release: "x", current_version: "x", pid: process.pid});
    ICCServer.handles.instanceCheck = new Timer(() => ICCServer.collections.instances.update({_id: ICCServer.instance_id},{$set: {lastPing: new Date()}}), 1000);
    ICCServer.handles.defunctCheck = new Timer(() => {
        const oneminute = new Date();
        oneminute.setTime(oneminute.getTime() - 60000);
        ICCServer.collections.instances.update(
            {
                _id: { $ne: ICCServer.instance_id },
                lastPing: { $lt: oneminute },
                handlinginstance: { $exists: false },
            },
            { $set: { handlingInstance: ICCServer.instance_id } }
        );

        if(ICCServer.collections.instances.find({_id: ICCServer.instance_id, shuttingDown: true}).count()) {
            ICCServer.runShutdownFunctions();
            return;
        }

        const defunctinstances = ICCServer.collections.instances
            .find({ handlingInstance: ICCServer.instance_id })
            .fetch() as RemoteInstance[];
        defunctinstances.forEach(di => {
            ICCServer.events.emit('defunctinstance', di)
            ICCServer.collections.instances.remove({_id: di._id});
        });
    }, 1000);

    ICCServer.onShutdown(() => {
        console.log("Shutdown requested");
        ICCServer.events.emit('shutdown');
        ICCServer.handles.instanceCheck.stop();
        ICCServer.handles.defunctCheck.stop();
        ICCServer.collections.instances.update({_id: ICCServer.instance_id},{$set: {shuttingDown: true, handlingInstance: ICCServer.instance_id}});
    });

    process.once('exit', () => ICCServer.runShutdownFunctions());
    process.once('SIGTERM', () => ICCServer.runShutdownFunctions());
    process.once('SIGINT', () => ICCServer.runShutdownFunctions());
    process.once('SIGHUP', () => ICCServer.runShutdownFunctions());
});
