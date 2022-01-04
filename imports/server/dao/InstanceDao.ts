import WritableReactiveDao from "/imports/server/dao/WritableReactiveDao";
import { InstanceRecord } from "/lib/records/InstanceRecord";
import Stoppable from "/lib/Stoppable";

export default class InstanceDao extends WritableReactiveDao<InstanceRecord> {
    private newcallbacks: ((instancerecord: InstanceRecord) => void)[] = [];

    private removedcallbacks: ((instanceid: string) => void)[] = [];

    private stopcallbacks: (() => void)[] = [];

    constructor(parent: Stoppable | null) {
        super(parent, "instances");
    }

    public onNewInstance(func: (instancerecord: InstanceRecord) => void): void {
        this.newcallbacks.push(func);
    }

    public onStopping(func: () => void) {
        this.stopcallbacks.push(func);
    }

    public onDeletedInstance(func: (instanceid: string) => void): void {
        this.removedcallbacks.push(func);
    }

    // @ts-ignore
    // eslint-disable-next-line
    protected onFieldsChanged(id: string, record: Partial<InstanceRecord>): void {
    }

    // @ts-ignore
    protected onRecordAdded(id: string, record: Partial<InstanceRecord>): void {
        this.newcallbacks.forEach((callback) => callback(record as InstanceRecord));
    }

    protected onRecordRemoved(id: string): void {
        this.removedcallbacks.forEach((callback) => callback(id));
    }

    protected onStop(): void {
        this.stopcallbacks.forEach((callback) => callback());
    }
}
