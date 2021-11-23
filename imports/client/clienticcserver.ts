import CommonICCServer from '../commoniccserver';
import ClientTimestamp from './clienttimetamp';

export default class ClientICCServer extends CommonICCServer {
  public timestamp: ClientTimestamp;

  constructor() {
    super();
  }
}
