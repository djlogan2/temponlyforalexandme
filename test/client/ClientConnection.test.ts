import ClientConnection from "/lib/client/ClientConnection";
import sinon from "sinon";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import CommonReadOnlyThemeDao from "/imports/dao/CommonReadOnlyThemeDao";
import CommonReadOnlyI18nDao from "../../imports/dao/CommonReadOnlyI18nDao";

describe("ClientConnection", function () {
  it("needs to be tested", function () {
    const dao = sinon.createStubInstance(CommonReadOnlyUserDao);
    const themedao = sinon.createStubInstance(CommonReadOnlyThemeDao);
    const i18ndao = sinon.createStubInstance(CommonReadOnlyI18nDao);
    const conn = new ClientConnection(null, dao, themedao, i18ndao);
    conn.stop();
    sinon.restore();
  });
});
