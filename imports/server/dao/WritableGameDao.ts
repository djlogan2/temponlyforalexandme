import {
  AnalysisGameRecord,
  ComputerPlayGameRecord,
} from "/lib/records/GameRecord";
import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import Stoppable from "/lib/Stoppable";

export default class WritableGameDao extends ReadWriteDao<
  ComputerPlayGameRecord | AnalysisGameRecord
> {
  constructor(parent: Stoppable | null) {
    super("games", parent);
  }
}
