export type DeepResolved<T> =
  T extends Promise<infer R>
    ? DeepResolved<R>
    : T extends Array<infer U>
      ? Array<DeepResolved<U>>
      : T extends Date
        ? T
        : T extends object
          ? { [K in keyof T]: DeepResolved<T[K]> }
          : T;
