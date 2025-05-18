import type { EmptyObject } from "type-fest";

export type BuildDotObject<T extends Record<PropertyKey, any>> =
	T extends EmptyObject
		? unknown
		: {
				[K in keyof T]: BuildDotObjectHelper<K, T[K]>;
			}[keyof T];

export type BuildDotObjectHelper<
	Key extends PropertyKey,
	Value,
> = Key extends `${infer HeadPath}.${infer SubPath}`
	? BuildDotObjectHelper<HeadPath, { [K in SubPath]: Value }>
	: { [K in Key]: Value };
