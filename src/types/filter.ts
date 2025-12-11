import type { Condition } from "mongodb";
import type { Get } from "./get.ts";
import type { PathsOfLiteral } from "./path-of-literal.ts";
import type { Paths } from "./path.ts";

// type NullPaths<T> = PathsOfNonExclusiveType<T, null>;
type GenericPaths<T> = Exclude<Paths<T>, PathsOfLiteral<T>>;
// type ConditionOf<T, K extends PropertyKey, V = Get<T, K>> = IsLiteral<V> extends true
// 	? Condition<V>
// 	: Condition<V>;
type ConditionOf<T, K extends PropertyKey, V = Get<T, K>> = Condition<V>;

export type BasicFilter<T> = {
	[K in Paths<T>]?: ConditionOf<T, K>;
} & {
	$or?: Array<BasicFilter<T>>;
	$and?: Array<BasicFilter<T>>;
	$nor?: Array<BasicFilter<T>>;
	/** TODO: not implemented (type) */
	$expr?: any;
};

// ## Generic Filter

export type GenericsFilter<T> = {
	[K in GenericPaths<T>]?: ConditionOf<T, K>;
} & {
	$or?: Array<GenericsFilter<T>>;
	$and?: Array<GenericsFilter<T>>;
	$nor?: Array<GenericsFilter<T>>;
	/** TODO: not implemented (type) */
	$expr?: any;
};

// ## Literal Filter

// type LiteralFilterOf<T, K extends PropertyKey> = LiteralFilter<Get<T, K>>;

// export type LiteralsFilter<T> = {
// 	[K in PathsOfLiteral<T>]?: LiteralFilterOf<T, K>;
// } & {
// 	[K in NullPaths<T>]?: null | { $eq?: null } | { $ne?: null };
// };

// export type Filter<T> = GenericsFilter<T> & LiteralsFilter<T>;
export type Filter<T> = BasicFilter<T>;

// export type LiteralFilter<T>
// 	= | T
// 		| { $eq: T }
// 		| { $ne: T }
// 		| { $in: ReadonlyArray<T> }
// 		| { $nin: ReadonlyArray<T> }
// 		| { $not: Exclude<LiteralFilter<T>, T> };
