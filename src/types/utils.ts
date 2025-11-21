export type Maybe<T> = T | undefined;
export type Nullable<T> = T | null;

export function isTruthy<T>(maybe: Maybe<Nullable<T>>): maybe is T {
  return !([undefined, null] as any).includes(maybe);
}

export function decodeHtml(text: string): string {
  const element = document.createElement("textarea");
  element.innerHTML = text;
  return element.value;
}
