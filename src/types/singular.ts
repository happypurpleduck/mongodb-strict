import type { UnknownArray } from "type-fest";

export type Singular<T> = T extends UnknownArray ? T[number] : T;
