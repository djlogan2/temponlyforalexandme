import CommonReadOnlyLoggerConfigurationDao from "/imports/dao/CommonReadOnlyLoggerConfigurationDao";
import {LOGLEVEL} from "/lib/records/LoggerConfigurationRecord";
import * as assert from "assert";

class TestCommonReadOnlyLoggerConfigurationDao extends CommonReadOnlyLoggerConfigurationDao {
    protected emit(module: string, loglevel: LOGLEVEL): void {
    }
}

describe("CommonReadOnlyLoggerConfigurationDao", function(){
    it("needs to be tested", function(){
        assert.fail("do me");
    });
});
