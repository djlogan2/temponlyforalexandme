import { Roles } from 'meteor/alanning:roles';
import UserEmail = Meteor.UserEmail;

enum ChildChat {
    CHILD = 'c',
    EXEMPT = 'e'
}

class ICCRoles {
  private userid: string;

  constructor(userid) {
    this.userid = userid;
  }

  public get developer(): boolean {
    return Roles.userIsInRole(this.userid, 'DEVELOPER');
  }

  public checkGlobalRole(rolename: string) {
    return this.developer || Roles.userIsInRole(this.userid, rolename);
  }

  public get login(): boolean { return this.checkGlobalRole('LOGIN'); }
}

export default class CommonUser implements Meteor.User {
  public _id: string;

  public username?: string | undefined;

  public emails?: UserEmail[] | undefined;

  public createdAt?: Date | undefined;

  public profile?: any;

  public services?: any;

  public get roles() {
    return new ICCRoles(this._id);
  }
}

Meteor.startup(() => {
});
