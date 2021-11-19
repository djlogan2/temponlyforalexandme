import { EventEmitter } from 'events';
import { Mongo } from 'meteor/mongo';
import { Handle } from './handle';
import { InstanceRecord } from './models/instancerecord';
import { ConnectionRecord } from './models/connectionrecord';
import PingRecord from "./models/pingrecord";

//
export default abstract class CommonICCServer {
  private eventEmitter: EventEmitter;

  public instance_id?: string;

  public collections: {
        connections?: Mongo.Collection<ConnectionRecord>;
        instances?: Mongo.Collection<InstanceRecord>;
        pingtable?: Mongo.Collection<PingRecord>;
    };

    public abstract handles: { [key: string]: Handle };

    constructor() {
      this.eventEmitter = new EventEmitter();
      this.collections = {};
      // this.handles = {};
    }

    public get events() {
      return this.eventEmitter;
    }
}
