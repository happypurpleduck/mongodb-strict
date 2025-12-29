import type { IsLiteral } from "type-fest";
import type { BuildDotObject } from "./build-dot-object.ts";
import type { Get } from "./get.ts";

type IsLiteralOf<T, K extends PropertyKey> = IsLiteral<Get<T, K>>;

export type LiteralsFilterType<T, Filter> = BuildDotObject<{
	[K in keyof Filter]: IsLiteralOf<T, K> extends true
		? Record<K, LiteralFilterType<Get<T, K>, Filter[K]>>
		: never;
}[keyof Filter]>;

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
