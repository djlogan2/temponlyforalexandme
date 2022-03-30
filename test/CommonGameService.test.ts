import CommonGameService from "/lib/game/CommonGameService";
import sinon from "sinon";
import CommonSingleGameReadOnlyGameDao from "/imports/dao/CommonSingleGameReadOnlyGameDao";

class CommonGameServiceTest extends CommonGameService {
  protected stopping(): void {}
}

describe("CommonGameService", function () {
  it("works because there isn't anything in it yet", function () {
    const dao = sinon.createStubInstance(CommonSingleGameReadOnlyGameDao);
    const service = new CommonGameServiceTest(null);
  });
});
