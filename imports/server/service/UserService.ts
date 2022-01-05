import WritableUserDao from "/imports/server/dao/WritableUserDao";
import User from "/lib/User";
import {UserRecord} from "/lib/records/UserRecord";
import {Mongo} from "meteor/mongo";

export default class UserService {
    private userdao: WritableUserDao;

    constructor(userdao: WritableUserDao) {
        this.userdao = userdao;
    }

    public getUserFromHashToken(hashtoken: string): User {
        const userrecord = this.userdao.readOne({hashTokens: hashtoken});
        if(userrecord)
            return new User(userrecord);
        return this.createAnonymousUser(hashtoken);
    }

    protected createAnonymousUser(hashtoken: string): User {
        const record: Mongo.OptionalId<UserRecord> = {hashTokens: [hashtoken], isolation_group: "public"};
        record._id = this.userdao.insert(record);
        return new User(record as UserRecord);
    }
}
