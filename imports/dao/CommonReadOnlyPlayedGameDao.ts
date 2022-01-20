import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import { PlayedGameRecord } from "/lib/records/GameRecord";

export default class CommonReadOnlyPlayedGameDao extends ReactiveReadOnlyDao<PlayedGameRecord> {
  protected onFieldsChanged(
    id: string,
    record: Partial<PlayedGameRecord>,
  ): void {}

  protected onRecordAdded(
    id: string,
    record: Partial<PlayedGameRecord>,
  ): void {}

  protected onRecordRemoved(id: string): void {}

  protected onStop(): void {}
}
