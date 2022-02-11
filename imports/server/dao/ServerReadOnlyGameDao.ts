import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";
import EventEmitter from "eventemitter3";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";

export default class ServerReadOnlyGameDao extends CommonReadOnlyGameDao {
  private pEvents = new EventEmitter<"move">();

  public get events(): BasicEventEmitter<"move"> {
    return this.pEvents;
  }
}
