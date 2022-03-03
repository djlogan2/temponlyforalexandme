import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import { BookRecord } from "/lib/records/BookRecord";
import Stoppable from "/lib/Stoppable";

export default class WritableBookDao extends ReadWriteDao<BookRecord> {
  constructor(parent: Stoppable | null) {
    super("book", parent);
  }
}
