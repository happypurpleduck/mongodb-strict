import type { IsTuple } from "type-fest";
import type { ExtendedPrimitive } from "../index.ts";

export type SimplifyDeep<Type, ExcludeType = never> = Type extends
	| ExtendedPrimitive
	| ExcludeType
	? Type
	: Type extends object[]
		? IsTuple<Type> extends true
			? Type extends readonly [...infer Elements]
				? { [K in keyof Elements]: SimplifyDeep<Elements[K], ExcludeType> }
				: Type
			: Array<SimplifyDeep<Type[number], ExcludeType>>
		: Type extends object
			? { [TypeKey in keyof Type]: SimplifyDeep<Type[TypeKey], ExcludeType> }
			: Type;
