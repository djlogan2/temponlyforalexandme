import Singleton from "../Singleton";

export default abstract class Stoppable extends Singleton {
    private children: Stoppable[] = [];

    protected abstract stopping(): void;

    constructor(identifier: string, parent: Stoppable | null) {
        super(identifier);
        if (parent) parent.registerChild(this);
    }

    private registerChild(child: Stoppable): void {
        this.children.push(child);
    }

    public stop(): void {
        this.children.forEach((child) => child.stopping());
        this.stopping();
    }
}
