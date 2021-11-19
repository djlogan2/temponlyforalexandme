import { Handle } from '../handle';
import CommonICCServer from '../commoniccserver';

export default class ServerICCServer extends CommonICCServer {
  private shutdown_functions: (() => void)[];

  public handles: {
        instanceCheck?: Handle;
        defunctInstanceCheck?: Handle;
        defunctConnectionCheck?: Handle;
    };

  constructor() {
    super();
    this.handles = {};
    this.shutdown_functions = [];
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
