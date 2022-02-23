import { Meteor, Subscription } from "meteor/meteor";
import { SubscriptionNames } from "/lib/SubscriptionNames";
import ConnectionService from "/imports/server/service/ConnectionService";
import ServerConnection from "/lib/server/ServerConnection";
import Stoppable from "/lib/Stoppable";
import ServerLogger from "/lib/server/ServerLogger";
import Publication from "/imports/server/service/Publication";

export default class PublicationService extends Stoppable {
  private logger: ServerLogger;

  private connectionservice: ConnectionService;

  public constructor(
    parent: Stoppable | null,
    connectionservice: ConnectionService,
  ) {
    super(parent);
    this.connectionservice = connectionservice;
    this.logger = new ServerLogger(this, "PublicationService_js");
  }

  public publishDao(
    publication: SubscriptionNames | null,
    newfn: (
      sub: Subscription,
      connection: ServerConnection,
      ...args: any[]
    ) => Publication<any>,
  ): void {
    this.logger.trace(() => `publishDao ${publication}`);
    const self = this;
    Meteor.startup(() => {
      Meteor.publish(publication, async function (...args: string[]) {
        self.logger.trace(
          () =>
            `--connectionpublish-- pub=${publication} conn=${this.connection.id}`,
        );
        const conn = await self.connectionservice.getConnection(
          this.connection.id,
        );
        newfn(this, conn, ...args);
      });
    });
  }

  protected stopping(): void {}
}
