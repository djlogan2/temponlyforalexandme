export interface UserRecord {
    _id: string;
    isolation_group: string;
    username: string;
    password: string;
    emails: string[];
    locale: string;
}
