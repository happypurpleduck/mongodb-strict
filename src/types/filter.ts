import type { Condition } from "mongodb";
import type { IsLiteral } from "type-fest";
import type { Get } from "./get.ts";
import type { PathsOfLiteral } from "./path-of-literal.ts";
import type { PathsOfNonExclusiveType } from "./path-of-type.ts";
import type { Paths } from "./path.ts";

// # Filter

type NullPaths<T> = PathsOfNonExclusiveType<T, null>;
type GenericPaths<T> = Exclude<Paths<T>, PathsOfLiteral<T>>;
type ConditionOf<T, K extends PropertyKey> = Condition<Get<T, K>>;

export type BasicFilter<T> = {
	[K in Paths<T>]?: ConditionOf<T, K>;
} & {
	$or?: Array<BasicFilter<T>>;
	$and?: Array<BasicFilter<T>>;
	$nor?: Array<BasicFilter<T>>;
};

// ## Generic Filter

export type GenericsFilter<T> = {
	[K in GenericPaths<T>]?: ConditionOf<T, K>;
} & {
	$or?: Array<GenericsFilter<T>>;
	$and?: Array<GenericsFilter<T>>;
	$nor?: Array<GenericsFilter<T>>;
};

// ## Literal Filter

type LiteralFilterOf<T, K extends PropertyKey> = LiteralFilter<Get<T, K>>;

export type LiteralsFilter<T> = {
	[K in PathsOfLiteral<T>]?: LiteralFilterOf<T, K>;
} & {
	[K in NullPaths<T>]?: null | { $eq?: null } | { $ne?: null };
};

export type Filter<T> = GenericsFilter<T> & LiteralsFilter<T>;

export type LiteralFilter<T>
	= | T
		| { $eq: T }
		| { $ne: T }
		| { $in: ReadonlyArray<T> }
		| { $nin: ReadonlyArray<T> }
		| { $not: Exclude<LiteralFilter<T>, T> };

type IsLiteralOf<T, K extends PropertyKey> = IsLiteral<Get<T, K>>;

// # FilterType

export type LiteralsFilterType<T, Filter> = {
	[K in keyof Filter]: IsLiteralOf<T, K> extends true
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
