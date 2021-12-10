import './servericcserver';
import '../imports/server/serverlogger';
import '../imports/server/serverinstance';
import '../imports/server/serverconnection';
import '../imports/server/servertimestamp';
import "../imports/server/serverI18n";
import "../imports/server/serverchat";
import "../imports/server/serverMessages";


import ServerICCServer from '../imports/server/servericcserver';

declare const Meteor;
declare const ICCServer: ServerICCServer;

Meteor.startup(() => {
  console.log('Running');
  console.log(`Instance id=${ICCServer.instance_id}`);
});
