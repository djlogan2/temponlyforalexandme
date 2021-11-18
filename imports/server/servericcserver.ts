import { Handle } from '../handle';
import CommonICCServer from '../commoniccserver';

export default class ServerICCServer extends CommonICCServer {
  private shutdown_functions: (() => void)[];

  public handles: {
        instanceCheck?: Handle;
        defunctCheck?: Handle;
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
    let x = 0;
    x++;
    this.shutdown_functions.forEach((fn) => fn());
    process.exit(0);
  }
}
