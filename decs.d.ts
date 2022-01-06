import ClientServer from "./lib/client/ClientServer";

declare module "meteor/universe:i18n";

declare global {
  interface Window {
    ClientServer: ClientServer;
  }
}
