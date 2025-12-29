export type Flatten<T> = T extends ReadonlyArray<infer R> ? R : T;
