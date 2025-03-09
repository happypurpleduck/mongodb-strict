import type { Condition } from "mongodb";
import type { Paths } from "./path.ts";
import type { Get } from "./get.ts";
import type { PathsOfLiteral } from "./path-of-literal.ts";
import type { PathsOfNonExclusiveType } from "./path-of-type.ts";

export type Filter<T> = {
	[K in Paths<T>]?: K extends string ? Condition<Get<T, K>> : never;
} & {
	$or?: Array<Filter<T>>;
	$and?: Array<Filter<T>>;
	$nor?: Array<Filter<T>>;
};

export type TLiteralsFilter<T> = {
	[K in PathsOfLiteral<T>]?: TLiteralFilter<Get<T, K>>;
} & {
	[K in PathsOfNonExclusiveType<T, null>]?:
		| null
		| { $eq?: null }
		| { $ne?: null };
};

export type TLiteralFilter<T> =
	| T
	| { $eq?: T }
	| { $ne?: T }
	| { $in?: ReadonlyArray<T> }
	| { $nin?: ReadonlyArray<T> }
	| { $not?: Exclude<TLiteralFilter<T>, T> };

// TODO:
export type TLiteralsFilterType<
  T,
  Filter extends TLiteralFilter<T>,
> = SimplifyDeep<{
  -readonly [K in keyof Filter]: TLiteralFilterType<
    Get<T, K>,
    Filter[K]
  >;
}>;

export type TLiteralFilterType<
	T,
	Filter extends TLiteralFilter<T>,
> = Filter extends T
	? Filter
	: "$eq" extends keyof Filter
		? Filter["$eq"] extends infer V
			? V
			: never
		: "$in" extends keyof Filter
			? Filter["$in"] extends ReadonlyArray<infer V>
				? V
				: never
			: "$ne" extends keyof Filter
				? Exclude<T, Filter["$ne"]>
				: "$nin" extends keyof Filter
					? Filter["$nin"] extends ReadonlyArray<infer V>
						? Exclude<T, V>
						: never
					: "$not" extends keyof Filter
						? Filter["$not"] extends TLiteralFilter<T>
							? Exclude<T, TLiteralFilterType<T, Filter["$not"]>>
							: never
						: never;
