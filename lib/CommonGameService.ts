import Stoppable from "/lib/Stoppable";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";

export default abstract class CommonGameService extends Stoppable {
  protected dao: CommonReadOnlyGameDao;

  constructor(parent: Stoppable | null, dao: CommonReadOnlyGameDao) {
    super(parent);
    this.dao = dao;
  }
}
