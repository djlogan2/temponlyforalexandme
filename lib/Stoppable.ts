export default abstract class Stoppable {
    private children: Stoppable[] = [];

    protected abstract stopping(): void;

    constructor(parent: Stoppable) {
        parent.registerChild(this);
    }

    private registerChild(child: Stoppable): void {
        this.children.push(child);
    }

    public stop(): void {
        this.children.forEach((child) => child.stopping());
        this.stopping();
    }
}
