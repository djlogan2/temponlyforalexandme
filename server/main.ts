import InstanceService from "/imports/server/service/InstanceService";
import InstanceDao from "/imports/server/dao/InstanceDao";
import ConnectionService from "/imports/server/service/ConnectionService";
import ConnectionDao from "/imports/server/dao/ConnectionDao";
import DirectMessageService from "/imports/server/service/DirectMessageService";

const parent = null;

const instancedao = new InstanceDao(parent);
const connectiondao = new ConnectionDao(parent);

const instanceservice = new InstanceService(parent, instancedao);
const directmessageservice = new DirectMessageService();
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const connectionservice = new ConnectionService(parent, instanceservice, directmessageservice, connectiondao);
