import ClientConnection from "/lib/client/ClientConnection";
import sinon from "sinon";

describe("ClientConnection", function () {
  it("needs to be tested", function () {
    const conn = new ClientConnection(null);
    conn.stop();
    sinon.restore();
  });
});
