import type { EmptyObject, UnionToIntersection } from "type-fest";

// TODO: rewrite to not require UnionToIntersection
export type BuildDotObject<T extends Record<PropertyKey, any>> =
	T extends EmptyObject
		? unknown
		: UnionToIntersection<
			{
				[K in keyof T]: BuildDotObjectHelper<K, T[K]>;
			}[keyof T]
		>;

export type BuildDotObjectHelper<
	Key extends PropertyKey,
	Value,
> = Key extends `${infer HeadPath}.${infer SubPath}`
	? BuildDotObjectHelper<HeadPath, { [K in SubPath]: Value }>
	: { [K in Key]: Value };
