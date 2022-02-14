import CommonGameService from "/lib/CommonGameService";
import CommonReadOnlyGameDao from "/imports/dao/CommonReadOnlyGameDao";
import sinon from "sinon";

class CommonGameServiceTest extends CommonGameService {
  protected stopping(): void {}
}

describe("CommonGameService", function () {
  it("works because there isn't anything in it yet", function () {
    const dao = sinon.createStubInstance(CommonReadOnlyGameDao);
    const service = new CommonGameServiceTest(null, dao);
  });
});
