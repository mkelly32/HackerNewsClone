export type Maybe<T> = T | undefined | null;

export function isTruthy<T>(maybe: Maybe<T>): maybe is T {
  return !([undefined, null] as any).includes(maybe);
}
