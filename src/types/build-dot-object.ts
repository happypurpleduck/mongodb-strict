export type BuildDotObject<T extends Record<PropertyKey, any>> = {
	[K in keyof T]: BuildDotObjectHelper<K, T[K]>;
}[keyof T];

type T = BuildDotObject<{ "x.z": 1 }>;
//   ^?

export type BuildDotObjectHelper<
	Key extends PropertyKey,
	Value,
> = Key extends `${infer HeadPath}.${infer SubPath}`
	? BuildDotObjectHelper<HeadPath, { [K in SubPath]: Value }>
	: { [K in Key]: Value };
