import CommonUserDao from "/imports/dao/CommonUserDao";
import {HashToken} from "/lib/records/UserRecord";

export default abstract class User {
    private userdao: CommonUserDao;

    private pId: string;

    public get id(): string { return this.pId;}

    // noinspection JSMethodCanBeStatic
    private isHashTokenIdle(hashtoken: HashToken): boolean {
        if(!hashtoken.connections) return true;
        return hashtoken.connections.reduce<boolean>((idle, conn) => idle && conn.idleseconds > 60, true);
    }

    private isHashArrayIdle(logins: HashToken[]) {
        return logins.reduce<boolean>((idle, hashToken) => idle && this.isHashTokenIdle(hashToken), true);
    }

    public get isIdle(): boolean {
        const user = this.userdao.readOne({_id: this.id},"include", ["logins"]);
        if(!user || !user.logins) return false;
        return this.isHashArrayIdle(user.logins);
    }

    constructor(id: string, userdao: CommonUserDao) {
        this.userdao = userdao;
        this.pId = id;
    }

    public logoff(): void {

    }
}
