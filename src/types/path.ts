import type { EmptyObject, IsAny, UnknownArray } from "type-fest";
import type { StaticPartOfArray, VariablePartOfArray } from "type-fest/source/internal/index.d.ts";
import type { ExtendedPrimitive } from "../index.ts";
import type { StringOrNumber } from "./property-key.ts";

/**
 * Cache for decrementing depth levels during path recursion.
 * Maps each depth level to the next lower level.
 *
 * You can extend this interface to support deeper recursion levels via declaration merging:
 *
 * @example
 * ```ts
 * declare module "@purpleduck/mongodb-strict" {
 *   interface DecrementDepthCache {
 *     15: 14;
 *     14: 13;
 *     13: 12;
 *     12: 11;
 *     11: 10;
 *   }
 * }
 * ```
 *
 * @remarks
 * Higher depth values allow deeper nested path generation but increase type-checking time.
 * The default cache supports depths 0-10.
 */
export interface DecrementDepthCache {
	10: 9;
	9: 8;
	8: 7;
	7: 6;
	6: 5;
	5: 4;
	4: 3;
	3: 2;
	2: 1;
	1: 0;
	0: 0;
}

/**
 * Configuration options for the `Paths` type.
 *
 * You can customize the maximum recursion depth by extending this interface via declaration merging:
 *
 * @example
 * ```ts
 * declare module "@purpleduck/mongodb-strict" {
 *   interface PathsOption {
 *     max_depth: 8;
 *   }
 * }
 * ```
 *
 * @remarks
 * - `max_depth`: Controls how deep the path generation recurses into nested objects.
 *   Default is 5 if not specified. Must be a key in {@link DecrementDepthCache}.
 * - Higher values generate more paths for deeply nested or recursive types but increase type-checking time.
 * - For recursive types (e.g., `options: Array<TOptions>` where `TOptions` references itself),
 *   the depth limit prevents infinite type expansion.
 */
export interface PathsOption {
}

type DepthLevel = "max_depth" extends keyof PathsOption ? PathsOption[keyof PathsOption & "max_depth"] : 5;

export type Paths<T> = _Paths<T, DepthLevel>;

type _Paths<T, D extends number> = T extends ExtendedPrimitive
	? never
	: IsAny<T> extends true
		? never
		: T extends UnknownArray
			? number extends T["length"]
				? | _Paths<T[number], D>
				| InternalPaths<StaticPartOfArray<T>, D>
				| InternalPaths<Array<VariablePartOfArray<T>[number]>, D>
				: InternalPaths<T, D>
			: T extends object
				? InternalPaths<T, D>
				: never;

type HasStringIndexSignature<T> = T extends UnknownArray ? false : string extends keyof T ? true : false;

type InternalPaths<BaseT, D extends number> = Required<BaseT> extends infer T
	? HasStringIndexSignature<T> extends true
		? keyof T & StringOrNumber
		: T extends EmptyObject | readonly []
			? never
			: {
					[Key in keyof T]: Key extends StringOrNumber
						? | Key
						| (Key extends number ? `${Key}` : never)
						| (D extends 0
							? never
							: D extends keyof DecrementDepthCache
								? _Paths<T[Key], DecrementDepthCache[D]> extends infer SubPath extends StringOrNumber
									? `${Key}.${SubPath}`
									: never
								: never)
						: never;
				}[keyof T & (T extends UnknownArray ? number : unknown)]
	: never;
