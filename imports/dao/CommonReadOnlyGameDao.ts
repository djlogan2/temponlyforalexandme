import { BasicGameRecord } from "/lib/records/GameRecord";
import Stoppable from "/lib/Stoppable";
import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import { BasicEventEmitter } from "/lib/BasicEventEmitter";

export type GameEvents = "started" | "move";
export default abstract class CommonReadOnlyGameDao extends ReactiveReadOnlyDao<BasicGameRecord> {
  public abstract get events(): BasicEventEmitter<GameEvents>;

  constructor(parent: Stoppable | null) {
    super(parent, "games");
  }

  protected onFieldsChanged(
    id: string,
    record: Partial<BasicGameRecord>,
  ): void {}

  protected onRecordAdded(id: string, record: Partial<BasicGameRecord>): void {
    this.events.emit("started");
  }

  protected onRecordRemoved(id: string): void {}
}
