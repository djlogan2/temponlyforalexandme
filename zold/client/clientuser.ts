import { UserRecord } from '/zold/models/userecord';
import { Meteor } from "meteor/meteor";
import CommonUser from '/zold/commonuser';

export default class ClientUser extends CommonUser {
  private _user: UserRecord;
  constructor(userInstance: UserRecord) {
    super();
    this._user = userInstance;
  }

  sendMessage(what: string) {
    Meteor.call("sendMessage", what, this._user._id);
  }
}
