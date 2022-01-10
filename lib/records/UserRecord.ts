export interface LoggedInConnection {
    connection: string;
    loginDate: Date;
    useragent: string;
    ipaddress: string;
    focused: boolean;
    idleseconds: number;
}

export interface HashToken {
    hashtoken: string;
    connections?: LoggedInConnection[];
}

export default interface UserRecord {
    _id: string;
    createdAt: Date;
    username?: string;
    isolation_group: string;
    loggedin: boolean;
    loginlock?: string;
    logins: HashToken[];
}
