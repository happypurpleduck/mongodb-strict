import type { ExtendedPrimitive } from "./primitives.ts";

// TODO: check effect on tuples
export type SimplifyDeep<Type, ExcludeType = never> = Type extends
	| ExtendedPrimitive
	| ExcludeType
	? Type
	: Type extends object[]
		? Array<SimplifyDeep<Type[number], ExcludeType>>
		: Type extends object
			? { [TypeKey in keyof Type]: SimplifyDeep<Type[TypeKey], ExcludeType> }
			: Type;
