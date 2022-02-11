export type BasicEventEmitter<T> = {
  on(event: T, fn: (...args: any[]) => void): void;
  off(event: T, fn?: (...args: any[]) => void): void;
  removeAllListeners(): void;
  emit(event: T, ...args: any[]): void;
};
