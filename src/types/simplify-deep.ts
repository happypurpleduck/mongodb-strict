import type { ExtendedPrimitive } from "./primitives.ts";

// TODO: check effect on tuples
export type SimplifyDeep<Type> = Type extends ExtendedPrimitive
	? Type
	: Type extends object[]
		? Array<SimplifyDeep<Type[number]>>
		: Type extends object
			? { [TypeKey in keyof Type]: SimplifyDeep<Type[TypeKey]> }
			: Type;
