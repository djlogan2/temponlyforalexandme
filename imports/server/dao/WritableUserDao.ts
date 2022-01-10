import Stoppable from "/lib/Stoppable";
import WritableReactiveDao from "/imports/server/dao/WritableReactiveDao";
import UserRecord, {LoggedInConnection} from "/lib/records/UserRecord";
import { Meteor } from "meteor/meteor";
import InstanceService from "/imports/server/service/InstanceService";

export default class WritableUserDao extends WritableReactiveDao<UserRecord> {
    private instanceid: string;

    private waitingForLock: {id: string, hashToken: string, connection: LoggedInConnection | string, callback?: (newlogin: boolean) => void}[] = [];

    public login(id: string, hashToken: string, connection: LoggedInConnection, callback?: () => void): void {
        const updated = this.update({$and: [{id},{loginlock: {$exists: false}}]},{$set: {loginlock: this.instanceid}});
        if(updated) {
            this.finishLogin(id, hashToken, connection, callback);
        } else {
            this.waitingForLock.push({id, hashToken, connection, callback});
        }
    }

    public logout(id: string, hashToken: string, connectionid: string, callback?: (isloggedout: boolean) => void): void {
        const updated = this.update({$and: [{id},{loginlock: {$exists: false}}]},{$set: {loginlock: this.instanceid}});
        if(updated) {
            this.finishLogout(id, hashToken, connectionid, callback);
        } else {
            this.waitingForLock.push({id, hashToken, connection: connectionid, callback});
        }
    }

    private finishLogout(id: string, hashToken: string,connectionid: string, callback?: (isloggedout: boolean) => void): void {
        const user = this.get(id);

        if(!user)
            throw new Meteor.Error("NO_USER_RECORD");

        let existingConnection;

        const existingHash = user.logins.find((login) => login.hashtoken === hashToken);

        if(existingHash && existingHash.connections)
            existingConnection = existingHash.connections.find((c) => c.connection === connectionid);
        else
            throw new Meteor.Error("NO_EXISTING_CONNECTION");

        // Where is it?
        if(!existingConnection)
            throw new Meteor.Error("NO_EXISTING_CONNECTION");

        const connectedcount= user.logins.reduce<number>((count, login) => (login.connections?.length || 0) + count, 0);
        const isloggedin = (connectedcount > 1);

        this.update({"logins.hashtoken": hashToken},{$pull: {"logins.hashtoken.$.connections": {connection: connectionid}}, $set: {loggedin: isloggedin}, $unset: {loginlock: 1}})

        if(callback)
            callback(!isloggedin);
    }

    private finishLogin(id: string, hashToken: string, connection: LoggedInConnection, callback?: (newlogin: boolean) => void): void {
        const user = this.get(id);

        if(!user)
            throw new Meteor.Error("NO_USER_RECORD");

        let existingConnection;

        const existingHash = user?.logins.find((login) => login.hashtoken === hashToken);

        if(existingHash && existingHash.connections)
            existingConnection = existingHash.connections.find((c) => c.connection === connection.connection);

        // We sure as shit shouldn't already have a connection!
        if(existingConnection)
            throw new Meteor.Error("EXISTING_CONNECTION");

        if(existingHash) {
            this.update({"login.hashtoken": hashToken},{$addToSet: {"logins.hashtoken.$.connections": connection}, $unset: {loginlock: 1}, $set: {loggedin: true}})
        } else {
            this.update({_id: id}, {$addToSet: {logins: {hashtoken: hashToken, connections: [connection]}}, $unset: {loginlock: 1}, $set: {loggedin: true}})
        }
        if(callback)
        callback(!user.loggedin);
    }

    protected onRecordAdded(_id: string, _record: UserRecord): void {
    }

    protected onFieldsChanged(id: string, record: UserRecord): void {
        if("loginlock" in record && this.waitingForLock.length && this.waitingForLock[0].id === id) {
            const updated = this.update({$and: [{_id: this.waitingForLock[0].id},{loginlock: {$exists: false}}]},{$set: {loginlock: this.instanceid}});
            if(updated) {
                const next = this.waitingForLock.shift();
                if(!next) return; // Obviously this should never happen at this point, but f'in typescript complains
                if(typeof next.connection === "string")
                    this.finishLogout(next.id, next.hashToken, next.connection, next.callback);
                else
                    this.finishLogin(next.id, next.hashToken, next.connection, next.callback);
            }
        }
    }

    protected onRecordRemoved(_id: string): void {
    }

    protected onStop(): void {
    }

    constructor(parent: Stoppable | null, instanceservice: InstanceService) {
        super(parent, "users");
        this.instanceid = instanceservice.instanceid;
        this.start({}, undefined, undefined);
    }
}
