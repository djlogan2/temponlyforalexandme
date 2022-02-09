import { BasicGameRecord } from "/lib/records/GameRecord";
import Stoppable from "/lib/Stoppable";
import ReadOnlyDao from "/imports/dao/ReadOnlyDao";

export default class CommonReadOnlyGameDao extends ReadOnlyDao<BasicGameRecord> {
  constructor(parent: Stoppable | null) {
    super("games", parent);
  }
}
