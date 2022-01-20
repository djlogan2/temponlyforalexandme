import I18nPublication from "/lib/server/I18nPublication";

export default class I18nService {}

globalThis.ICCServer.utilities.publish("i18n", function () {
  const connection = globalThis.ICCServer.utilities.getConnection(
    this.connection,
  );
  if (!connection) return;
  const _i18n = new I18nPublication(connection, this);
  if (!connection.user) this.ready();
});
