import CommonICCServer from "../commoniccserver";
import ClientTimestamp from "./clienttimetamp";

class ClientICCServer extends CommonICCServer {
  // eslint-disable-next-line no-use-before-define
  private static instance: ClientICCServer;

  public timestamp: ClientTimestamp;

  public static getInstance(): ClientICCServer {
    if (!ClientICCServer.instance) {
      ClientICCServer.instance = new ClientICCServer();
    }

    return ClientICCServer.instance;
  }
}

export default ClientICCServer.getInstance();
// TODO:
//    I don't want to do this. I want everything that is obtainable by users of the middleware system
//    to retrieve data via the global, like so:
//    "stock meteor" is accessible with things like:
//        something.js
//            Meteor.timestamp.ping();   <- where 'Meteor' is a global
//    "users of our middleware":
//        something.ts
//            ICCServer.timestamp.ping()  <- I want ICCServer to be a global
//    This architecture seems to assume that "users of our middleware" will do this instead:
//        import {ClientICCServer} from "middleware.ts"
//        ClientICCServer.timestamp.ping()
//    I do NOT want to use different class names outside of the middleware.
//    I DO want "ICCServer" to be a global
//    I DO want all collections, for example, to be in the ICCServer object
//    I DO want ICCServer.events to emit system-wide events (events that are not tied to a specific class/action)
//    ...
//    Lastly, even IF we were going to do this, we need to figure out how we are going to get timestamp loaded.
//    You didn't put it in here, so it's somewhere else, and the new tsconfig is causing errors.
//    So one of the things we have to figure out is how we are going to get these classes loaded, particularly
//    when some of it requires Meteor.startup(), and some of it requires other types of method calls, like for example
//    Accounts.onCreateUser()
//    The changes from my architecture to this architecture does not address this issue.
