import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import SystemConfigurationRecord from "/lib/records/SystemConfigurationRecord";

export default class CommonReadOnlySystemConfigurationDao extends ReactiveReadOnlyDao<SystemConfigurationRecord> {
  protected onFieldsChanged(
    id: string,
    record: Partial<SystemConfigurationRecord>,
  ): void {}

  protected onRecordAdded(
    id: string,
    record: Partial<SystemConfigurationRecord>,
  ): void {}

  protected onRecordRemoved(id: string): void {}
}
