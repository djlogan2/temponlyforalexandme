import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";

export default abstract class User {
  protected userdao: CommonReadOnlyUserDao;

  private pId: string;

  public get id(): string {
    return this.pId;
  }

  constructor(id: string, userdao: CommonReadOnlyUserDao) {
    this.pId = id;
    this.userdao = userdao;
  }
}
