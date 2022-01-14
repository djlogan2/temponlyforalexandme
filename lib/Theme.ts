import Stoppable from "./Stoppable";
import CommonReadOnlyThemeDao from "/imports/dao/CommonReadOnlyThemeDao";

export default abstract class Theme extends Stoppable {
  protected themedao: CommonReadOnlyThemeDao;

  constructor(parent: Stoppable | null, themedao: CommonReadOnlyThemeDao) {
    super(parent);
    this.themedao = themedao;
  }
}
