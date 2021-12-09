import { UserRecord } from '/imports/models/userecord';
import { Meteor } from "meteor/meteor";
import CommonUser from '/imports/commonuser';

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
