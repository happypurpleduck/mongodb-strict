import type { Simplify, UnionToIntersection, UnknownArray } from "type-fest";
import type { ExtendedPrimitive } from "./primitives";
import type { PickDeepArray, PickDeepObject } from "type-fest/source/pick-deep";

export type PickDeep<T, PathUnion extends string> = T extends ExtendedPrimitive
	? never
	: T extends UnknownArray
		? UnionToIntersection<
				{
					[P in PathUnion]: InternalPickDeep<T, P>;
				}[PathUnion]
			>
		: T extends object
			? Simplify<
					UnionToIntersection<
						{
							[P in PathUnion]: InternalPickDeep<T, P>;
						}[PathUnion]
					>
				>
			: never;

type InternalPickDeep<
	T,
	Path extends string | number,
> = T extends ExtendedPrimitive
	? never
	: T extends UnknownArray
		? PickDeepArray<T, Path>
		: T extends object
			? Simplify<PickDeepObject<T, Path>>
			: never;
