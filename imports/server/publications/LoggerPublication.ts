import { Subscription } from "meteor/meteor";
import { LoggerConfigurationRecord } from "/lib/records/LoggerConfigurationRecord";
import Stoppable from "/lib/Stoppable";
import Publication from "/imports/server/service/Publication";

export default class LoggerPublication extends Publication<LoggerConfigurationRecord> {
  constructor(parent: Stoppable | null, pub: Subscription) {
    super(parent, pub, "logger_configuration");
    this.setSelector({});
  }
}
