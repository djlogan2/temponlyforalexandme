import ClientConnection from "/lib/client/ClientConnection";
import sinon from "sinon";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import "../../lib/client/ICCGlobal";

describe("ClientConnection", function () {
  it("needs to be tested", function () {
    const dao = sinon.createStubInstance(CommonReadOnlyUserDao);
    const conn = new ClientConnection(null, dao);
    conn.stop();
    sinon.restore();
  });
});
