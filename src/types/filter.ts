import type { Condition } from "mongodb";
import type { IsLiteral } from "type-fest";
import type { Get } from "./get.ts";
import type { PathsOfLiteral } from "./path-of-literal.ts";
import type { PathsOfNonExclusiveType } from "./path-of-type.ts";
import type { Paths } from "./path.ts";

// Lazy evaluation: Cache expensive path computations
type CachedPaths<T> = Paths<T>;
type CachedLiteralPaths<T> = PathsOfLiteral<T>;
type CachedNullPaths<T> = PathsOfNonExclusiveType<T, null>;
type CachedGenericPaths<T> = Exclude<CachedPaths<T>, CachedLiteralPaths<T>>;

export type BasicFilter<T> = {
	[K in CachedPaths<T>]?: Condition<Get<T, K>>;
} & {
	$or?: Array<BasicFilter<T>>;
	$and?: Array<BasicFilter<T>>;
	$nor?: Array<BasicFilter<T>>;
};

export type GenericsFilter<T> = {
	[K in CachedGenericPaths<T>]?: Condition<Get<T, K>>;
}
& {
	$or?: Array<GenericsFilter<T>>;
	$and?: Array<GenericsFilter<T>>;
	$nor?: Array<GenericsFilter<T>>;
}
;

export type LiteralsFilter<T> = {
	[K in CachedLiteralPaths<T>]?: LiteralFilter<Get<T, K>>;
} & {
	[K in CachedNullPaths<T>]?:
		| null
		| { $eq?: null }
		| { $ne?: null };
};

export type Filter<T>
	= GenericsFilter<T>
		& LiteralsFilter<T>
;

export type LiteralFilter<T>
	= | T
		| { $eq?: T }
		| { $ne?: T }
		| { $in?: ReadonlyArray<T> }
		| { $nin?: ReadonlyArray<T> }
		| { $not?: Exclude<LiteralFilter<T>, T> };

export type LiteralsFilterType<T, Filter> = {
	[K in keyof Filter]: IsLiteral<Get<T, K>> extends true
		? Record<K, LiteralFilterType<Get<T, K>, Filter[K]>>
		: never;
}[keyof Filter];

export type LiteralFilterType<
	T,
	Filter, // extends TLiteralFilter<T>,
> = Filter extends T
	? Filter
	: Filter extends { $eq: infer V }
		? V
		: Filter extends { $in: ReadonlyArray<infer V> }
			? V
			: Filter extends { $ne: infer V }
				? Exclude<T, V>
				: Filter extends { $nin: ReadonlyArray<infer V> }
					? Exclude<T, V>
					: Filter extends { $not: infer V }
						? Exclude<T, LiteralFilterType<T, V>>
						: never;
