
// eslint-disable-next-line prefer-destructuring
const ICCServer = global.ICCServer;

export default class Singleton {
    constructor(identifier: string) {
        if (ICCServer.singletons[identifier]) {
            console.log(`WARNING! ${identifier} IS DEFINED AS A SINGLETON AND IS BEING CREATED MORE THAN ONCE!`);
        } else {
            ICCServer.singletons[identifier] = this;
        }
    }
}
