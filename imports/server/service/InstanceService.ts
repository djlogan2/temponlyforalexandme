import { Meteor } from "meteor/meteor";
import InstanceDao from "/imports/server/dao/InstanceDao";
import Stoppable from "/lib/Stoppable";
import { InstanceRecord } from "/lib/records/InstanceRecord";
import ServerLogger from "/lib/server/ServerLogger";

export default class InstanceService extends Stoppable {
    private logger = new ServerLogger(this, "server/InstanceService");

    protected stopping(): void {
        Meteor.clearInterval(this.ourpinghandle);
        Meteor.clearInterval(this.ourdefuncthandle);
        this.instancedao.stop();
    }

    private sInstanceid: string;

    private instancedao: InstanceDao;

    private ourpinghandle: number;

    private ourdefuncthandle: number;

    private startOurPing(): number {
        return Meteor.setInterval(() => {
            this.instancedao.update({ _id: this.sInstanceid }, { $set: { lastping: new Date() } });
        }, 1000);
    }

    public get instanceid(): string {
        return this.sInstanceid;
    }
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
    private onDefunctInstance(instance: InstanceRecord): void {
        // TODO: What do we want to do here? Nothing so far that I know of,
        //       except maybe call other guys?
    }

    private watchForDefunctInstances(): number {
        return Meteor.setInterval(() => {
            const oneminute = new Date();
            oneminute.setTime(oneminute.getTime() - 60000);
            this.instancedao.update(
                {
                    _id: { $ne: this.sInstanceid },
                    lastPing: { $lt: oneminute },
                    beinghandledby: { $exists: false },
                },
                { $set: { beinghandledby: this.sInstanceid } },
            );
            const unhandled = this.instancedao.readMany({ beinghandledby: this.sInstanceid }, undefined, undefined);
            unhandled?.forEach((defunct) => this.onDefunctInstance(defunct));
            const ids = unhandled?.map((instance) => instance._id);
            if (ids && ids.length) this.instancedao.removeMany({ $id: { $in: ids } });
        }, 1000);
    }

    constructor(parent: Stoppable | null, instancedao: InstanceDao) {
        // dum-de-dum
        super(parent);
        this.instancedao = instancedao;
        this.sInstanceid = this.instancedao.insert({
            ipaddress: "",
            lastping: new Date(),
            startupdate: new Date(),
        });

        // dum-de-dum
        this.logger.error(() => "Hello world!");
        this.ourpinghandle = this.startOurPing();
        this.ourdefuncthandle = this.watchForDefunctInstances();
    }
}
