import CommonReadOnlyLoggerConfigurationDao from "/imports/dao/CommonReadOnlyLoggerConfigurationDao";
import {
  LoggerConfigurationRecord,
  LOGLEVEL,
} from "/lib/records/LoggerConfigurationRecord";
import { expect } from "chai";

class TestCommonReadOnlyLoggerConfigurationDao extends CommonReadOnlyLoggerConfigurationDao {
  public fn: (module: string, loglevel: LOGLEVEL) => void;

  constructor(fn: (module: string, loglevel: LOGLEVEL) => void) {
    super(null);
    this.fn = fn;
  }

  protected emit(module: string, loglevel: LOGLEVEL): void {
    this.fn(module, loglevel);
  }

  public add(id: string, module: string, loglevel: LOGLEVEL) {
    this.onRecordAdded(id, { module, debuglevel: loglevel });
  }

  public change(id: string, module: string | null, loglevel: LOGLEVEL) {
    const record: Partial<LoggerConfigurationRecord> = { debuglevel: loglevel };
    if (module) record.module = module;
    this.onFieldsChanged(id, record);
  }

  public delete(id: string) {
    this.onRecordRemoved(id);
  }

  protected onReady(): void {}
}

describe("CommonReadOnlyLoggerConfigurationDao", function () {
  it("should emit a new loglevel when a record is added to the database", function (done) {
    const rolcd = new TestCommonReadOnlyLoggerConfigurationDao(
      (module: string, loglevel: LOGLEVEL) => {
        expect(module).to.equal("mod");
        expect(loglevel).to.equal("trace");
        done();
      },
    );
    rolcd.add("a", "mod", "trace");
  });

  it("should emit a new loglevel when a record is updated in the database, and it should emit the correct module", function (done) {
    let expected: LOGLEVEL = "trace";
    let fin = false;
    const rolcd = new TestCommonReadOnlyLoggerConfigurationDao(
      (module: string, loglevel: LOGLEVEL) => {
        expect(module).to.equal("mod");
        expect(loglevel).to.equal(expected);
        if (fin) done();
      },
    );
    rolcd.add("a", "mod", "trace");
    expected = "error";
    fin = true;
    rolcd.change("a", null, "error");
  });

  it("should emit a default 'debug' loglevel when a record is deleted from the database, and it should emit the correct module", function (this: Mocha.Context, done) {
    let expected: LOGLEVEL = "trace";
    let fin = false;
    const rolcd = new TestCommonReadOnlyLoggerConfigurationDao(
      (module: string, loglevel: LOGLEVEL) => {
        expect(module).to.equal("mod");
        expect(loglevel).to.equal(expected);
        if (fin) done();
      },
    );
    rolcd.add("a", "mod", "trace");
    expected = "debug";
    fin = true;
    rolcd.delete("a");
  });
});
