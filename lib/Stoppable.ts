export default abstract class Stoppable {
  private children: Stoppable[] = [];

  /**
   * This method is invoked when the parent wishes this instance to
   * clean up and prepre for being deleted. This method is responsible for
   * cleaning up local resources, but does NOT have to call any of its children.
   * The framework will call all of your children for you. You just clean up your
   * own websockets, timers, live query handlers, etc.
   * @protected
   */
  protected abstract stopping(): void;

  /**
   * @param {Stoppable} parent - The parent of this child stoppable, if there is one.
   */
  constructor(parent: Stoppable | null) {
    if (parent) parent.registerChild(this);
  }

  private registerChild(child: Stoppable): void {
    this.children.push(child);
  }

  /**
   * Call this method to stop this instance and also stop all of its children
   */
  public stop(): void {
    this.children.forEach((child) => child.stop());
    this.stopping();
  }
}
