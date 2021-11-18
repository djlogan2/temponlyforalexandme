import { EventEmitter } from 'events';
import { Mongo } from 'meteor/mongo';
import { Handle } from './handle';
import { InstanceRecord } from './models/instancerecord';

export default abstract class CommonICCServer {
  private eventEmitter: EventEmitter;

  public instance_id?: string;

  public collections: {
        instances?: Mongo.Collection<InstanceRecord>;
    };

    public abstract handles: {[key: string]: Handle};

    constructor() {
      this.eventEmitter = new EventEmitter();
      this.collections = {};
      // this.handles = {};
    }

    public get events() { return this.eventEmitter; }
}
