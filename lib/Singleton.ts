export default class Singleton {
    constructor(identifier: string) {
        if (global.ICCServer.singletons[identifier]) {
            console.log(`WARNING! ${identifier} IS DEFINED AS A SINGLETON AND IS BEING CREATED MORE THAN ONCE!`);
        } else {
            global.ICCServer.singletons[identifier] = this;
        }
    }
}
