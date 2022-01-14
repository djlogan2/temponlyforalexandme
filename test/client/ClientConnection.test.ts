import ClientConnection from "/lib/client/ClientConnection";
import sinon from "sinon";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import CommonReadOnlyThemeDao from "/imports/dao/CommonReadOnlyThemeDao";

describe("ClientConnection", function () {
  it("needs to be tested", function () {
    const dao = sinon.createStubInstance(CommonReadOnlyUserDao);
    const themedao = sinon.createStubInstance(CommonReadOnlyThemeDao);
    const conn = new ClientConnection(null, dao, themedao);
    conn.stop();
    sinon.restore();
  });
});
