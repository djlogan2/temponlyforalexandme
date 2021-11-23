import CommonICCServer from '../commoniccserver';
import ServerTimestamp from './servertimestamp';

export default class ServerICCServer extends CommonICCServer {
  private shutdown_functions: (() => void)[];

  public timestamp: {[key: string]: ServerTimestamp};

  constructor() {
    super();
    this.shutdown_functions = [];
    this.timestamp = {};
  }

  public onShutdown(fn: () => void): void {
    this.shutdown_functions.push(Meteor.bindEnvironment(() => fn()));
  }

  public runShutdownFunctions(): void {
    const promises: Promise<void>[] = [];
    this.shutdown_functions.forEach((fn) => {
      promises.push(new Promise((resolve, reject) => {
        try {
          fn();
          resolve();
        } catch (e) {
          reject(e);
        }
      }));
    });
    Promise.all(promises)
      .then(() => { process.exit(0); });
  }
}
