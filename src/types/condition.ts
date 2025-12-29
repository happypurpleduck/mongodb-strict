import type { FilterOperators } from "./filter-operators.ts";

export type RegExpOrString<T> = T extends string ? RegExp | T : T;
export type AlternativeType<T> = T extends ReadonlyArray<infer U> ? T | RegExpOrString<U> : RegExpOrString<T>;

export type Condition<T> = AlternativeType<T> | FilterOperators<AlternativeType<T>>;
