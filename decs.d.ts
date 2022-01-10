import "meteor/meteor";
import LoggerService from "./imports/server/service/LoggerService";
import ClientServer from "./lib/client/ClientServer";
import Stoppable from "./lib/Stoppable";

declare module "meteor/universe:i18n";

declare global {
  interface Window {
    ClientServer: ClientServer;
  }

  interface global {
    ICCServer: {
      collections: {};
      client: { subscriptions: {}; dao: {} };
      server: {
        services: {
          loggerservice: LoggerService;
        };
      };
      utilities: { getLogger: (parent: Stoppable, identifier: string) => void };
    };
  }

  const Assets: {
    getText: (assetPath: string, asyncCallBack?: () => void) => string;
  };
}

declare module "meteor/meteor" {
  module Meteor {
    type onMessageFunc = OmitThisParameter<
      (
        cb: (
          this: { preventCallingMeteorHandler: () => void },
          message: string,
          sessionId: string,
        ) => void,
      ) => void
    >;

    const directStream: {
      onMessage: onMessageFunc;
      broadcast: (message: string) => void;
      send: (message: string, sessionId?: string) => void;
    };

    const Assets: {
      getText: (assetPath: string) => void;
    };

    const connection: {
      _lastSessionId: string;
    };
  }
}
