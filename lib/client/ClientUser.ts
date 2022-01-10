import User from "/lib/User";

export default class ClientUser extends User {
    constructor(id: string) {
        super(id, globalThis.userdao);
        globalThis.user = this;
    }
}
