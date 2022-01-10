import WritableUserDao from "/imports/server/dao/WritableUserDao";
import {Mongo} from "meteor/mongo";
import UserRecord, {LoggedInConnection} from "/lib/records/UserRecord";

export default class UserService {
    private userdao: WritableUserDao;

    constructor(userdao: WritableUserDao) {
        this.userdao = userdao;
    }

    public logon(hashtoken: string, connection: string, useragent: string, ipaddress: string): void {
        const userdb = this.getUserFromHashToken(hashtoken);
        const newConnection: LoggedInConnection = {
            loginDate: new Date(),
            focused: true,
            idleseconds: 0,
            connection,
            useragent,
            ipaddress
        };
        this.userdao.login(userdb._id, hashtoken, newConnection);
    }

    private createAnonymousUser(): UserRecord {
        const userrecord: Mongo.OptionalId<UserRecord> = {
            createdAt: new Date(),
            isolation_group: "public",
            loggedin: false,
            logins: []
        };
        userrecord._id = this.userdao.insert(userrecord);
        return userrecord as UserRecord;
    }

    public getUserFromHashToken(hashtoken: string): UserRecord {
        let userrecord = this.userdao.readOne({hashTokens: hashtoken});

        if(!userrecord)
            userrecord = this.createAnonymousUser();

        return userrecord;
    }
}
