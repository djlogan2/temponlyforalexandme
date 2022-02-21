import Stoppable from "/lib/Stoppable";
import CommonReadOnlySystemConfigurationDao from "/imports/dao/CommonReadOnlySystemConfigurationDao";

export default class CommonSystemConfiguration extends Stoppable {
  private dao: CommonReadOnlySystemConfigurationDao;

  constructor(
    parent: Stoppable | null,
    dao: CommonReadOnlySystemConfigurationDao,
  ) {
    super(parent);
    this.dao = dao;
  }

  // private get me(): SystemConfigurationRecord {
  //     return this.dao.readOne({})
  // }

  protected stopping(): void {}
}
