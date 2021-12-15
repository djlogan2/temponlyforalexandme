import Stoppable from "/lib/Stoppable";

export default class NotStoppable extends Stoppable {
    // eslint-disable-next-line class-methods-use-this
    protected stopping(): void {
        // nothing to do
    }
}
