import EventEmitter from "eventemitter3";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import Stoppable from "/lib/Stoppable";
import CommonSingleGameReadOnlyGameDao, {
  GameEvents,
} from "/imports/dao/CommonSingleGameReadOnlyGameDao";

export default class ServerReadOnlyGameDao extends CommonSingleGameReadOnlyGameDao {
  private pEvents = new EventEmitter<GameEvents>();

  protected dao: WritableGameDao;

  constructor(
    parent: Stoppable | null,
    id: string,
    writabledao: WritableGameDao,
  ) {
    super(parent, id);
    this.dao = writabledao;
  }

  public get events(): BasicEventEmitter<GameEvents> {
    return this.pEvents;
  }

  protected onReady(): void {
    this.events.emit("ready");
  }
}
