import ClientConnection from "/lib/client/ClientConnection";
import sinon from "sinon";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";

describe("ClientConnection", function () {
  it("needs to be tested", function () {
    const dao = sinon.createStubInstance(CommonReadOnlyUserDao);
    const conn = new ClientConnection(null, dao);
    conn.stop();
    sinon.restore();
  });
});
