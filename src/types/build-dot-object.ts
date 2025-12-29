import type { EmptyObject, UnionToIntersection } from "type-fest";
import type { SimplifyDeep } from "./simplify-deep.ts";

// TODO: rewrite to not require UnionToIntersection
export type BuildDotObject<T extends Record<PropertyKey, any>>
	= T extends EmptyObject
		? unknown
		: SimplifyDeep<
			UnionToIntersection<
				{
					[K in keyof T]: BuildDotObjectHelper<K, T[K]>;
				}[keyof T]
			>
		>;

export type BuildDotObjectHelper<
	Key extends PropertyKey,
	Value,
> = Key extends `${infer HeadPath}.${infer SubPath}`
	? { [K in HeadPath]: BuildDotObjectHelper<SubPath, Value> }
	: { [K in Key]: Value };
