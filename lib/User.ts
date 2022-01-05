import {UserRecord} from "/lib/records/UserRecord";

export default class User {
    private userrecord: UserRecord;

    constructor(userrecord: UserRecord) {
        this.userrecord = userrecord;
    }

    public logoff(): void {

    }
}
