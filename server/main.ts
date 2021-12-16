import InstanceService from "/imports/server/service/InstanceService";
import InstanceDao from "/imports/server/dao/InstanceDao";
import ConnectionService from "/imports/server/service/ConnectionService";
import TimestampService from "/imports/server/service/TimestampService";
import ConnectionDao from "/imports/server/dao/ConnectionDao";

const parent = null;

const instancedao = new InstanceDao(parent);
const connectiondao = new ConnectionDao(parent);

const instanceservice = new InstanceService(parent, instancedao);
const timestampservice = new TimestampService();
const connectionservice = new ConnectionService(instanceservice, timestampservice, connectiondao);
