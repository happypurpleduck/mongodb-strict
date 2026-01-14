import type { IsLiteral } from "type-fest";
import type { BuildDotObject } from "./build-dot-object.ts";
import type { Get } from "./get.ts";

type IsNullable<T> = null | undefined extends T ? 1 : 0;
type IsLiteralOf<T, K extends PropertyKey> = Get<T, K> extends infer V
	? (true extends IsLiteral<V> ? 1 : 0) | IsNullable<V>
	: 0;

export type LiteralsFilterType<T, Filter> = BuildDotObject<{
	[K in keyof Filter]: 1 extends IsLiteralOf<T, K>
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
