import InstanceService from "/imports/server/service/InstanceService";
import InstanceDao from "/imports/server/dao/InstanceDao";
import ConnectionService from "/imports/server/service/ConnectionService";
import ConnectionDao from "/imports/server/dao/ConnectionDao";

const parent = null;


if (!global.ICCServer) global.ICCServer = { collections: {}, dao: {}, singletons: {} };

const instancedao = new InstanceDao(parent);
const connectiondao = new ConnectionDao(parent);

const instanceservice = new InstanceService(parent, instancedao);
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const connectionservice = new ConnectionService(parent, instanceservice, connectiondao);
