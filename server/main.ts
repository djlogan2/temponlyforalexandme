import './servericcserver';
import "../imports/server/serverClientI18n";
import '../imports/server/serverlogger';
import '../imports/server/serverinstance';
import '../imports/server/serverconnection';
import '../imports/server/servertimestamp';

import ServerICCServer from '../imports/server/servericcserver';

declare const Meteor;
declare const ICCServer: ServerICCServer;

Meteor.startup(() => {
  console.log('Running');
  console.log(`Instance id=${ICCServer.instance_id}`);
});
