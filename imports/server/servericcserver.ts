import CommonICCServer from "/imports/commoniccserver";
import InstanceService from "/imports/server/service/instanceservice";

export default class ServerICCServer extends CommonICCServer {
    constructor(instancemanager: InstanceService) {
        super();
    }

  createLogger(identifier: string): CommonLogger {
    return undefined;
  }
}
