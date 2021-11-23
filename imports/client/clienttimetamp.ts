import { PongMessage, PongResponse } from '../models/timestamp';
import CommonDirectTimestamp from '../commondirecttimetamp';
import ClientICCServer from './clienticcserver';
import ClientDirectMessage from './clientdirectmessage';
import ServerLogger from '../server/serverlogger';

declare const ICCServer: ClientICCServer;

export default class ClientTimestamp extends CommonDirectTimestamp {
  private logger: ServerLogger = new ServerLogger('CommonDirectTimestamp');

  protected PongReceived(pong: PongMessage) {
    super.PongReceived(pong);
    this.logger.debug(() => `ClientTimestamp.PongReceived: ${JSON.stringify(pong)}`);
  }

  protected PongResponseReceived(msg: PongResponse) {
    super.PongResponseReceived(msg);
    this.logger.debug(() => `ClientTimestamp.PongResponseReceived: ${JSON.stringify(msg)}`);
  }

  public startReceiveWatcher(): void {
    this.logger.debug(() => 'ClientTimestamp.startReceiveWatcher');
    if (this.directMessage) return;
    this.directMessage = new ClientDirectMessage('timestamp', (msg) => this.processIncomingMessage(msg));
  }
}

function startTimestamp() {
  if (ICCServer.timestamp) return;
  ICCServer.timestamp = new ClientTimestamp(60);
  ICCServer.timestamp.startReceiveWatcher();
}

Meteor.startup(() => {
  startTimestamp();

  Tracker.autorun(() => {
    ICCServer.timestamp.shouldSendPing = Meteor.status().connected;
    // const loggedIn = !!TimeSync.isSynced() && !!Meteor.userId();
    // if (loggedIn && !UserStatus.isMonitoring()) UserStatus.startMonitor();
    // else if (!loggedIn && UserStatus.isMonitoring()) UserStatus.stopMonitor();
    //
  });
});
