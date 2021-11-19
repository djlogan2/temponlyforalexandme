import './iccserver';
import '../imports/server/serverinstance';
import "../imports/server/serverconnection";
import ServerICCServer from '../imports/server/servericcserver';

declare const Meteor;
declare const ICCServer: ServerICCServer;

Meteor.startup(() => {
  console.log('Running');
  console.log(`Instance id=${ICCServer.instance_id}`);
});
