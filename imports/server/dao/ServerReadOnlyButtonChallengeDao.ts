import CommonReadOnlyButtonChallengeDao from "/imports/dao/CommonReadOnlyButtonChallengeDao";
import { OneChallengeButton } from "/lib/records/ChallengeButtonRecord";

export default class ServerReadOnlyButtonChallengeDao extends CommonReadOnlyButtonChallengeDao {
  protected onFieldsChanged(
    id: string,
    record: Partial<OneChallengeButton>,
  ): void {}

  protected onReady(): void {}

  protected onRecordAdded(
    id: string,
    record: Partial<OneChallengeButton>,
  ): void {}

  protected onRecordRemoved(id: string): void {}
}
