export type Maybe<T> = T | undefined;
export type Nullable<T> = T | null;

export function isTruthy<T>(maybe: Maybe<Nullable<T>>): maybe is T {
  return !([undefined, null] as any).includes(maybe);
}

export type StoreSelector<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;
