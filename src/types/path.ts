import type { EmptyObject, IsAny, UnknownArray } from "type-fest";
import type { StaticPartOfArray, VariablePartOfArray } from "type-fest/source/internal/index.d.ts";
import type { ExtendedPrimitive } from "../index.ts";
import type { StringOrNumber } from "./property-key.ts";

export type Paths<T> = _Paths<T>;

type _Paths<T> = T extends ExtendedPrimitive
	? never
	: IsAny<T> extends true
		? never
		: T extends UnknownArray
			? number extends T["length"]
				? | _Paths<T[number]>
				| InternalPaths<StaticPartOfArray<T>>
				| InternalPaths<Array<VariablePartOfArray<T>[number]>>
				: InternalPaths<T>
			: T extends object
				? InternalPaths<T>
				: never;

type HasStringIndexSignature<T> = T extends UnknownArray ? false : string extends keyof T ? true : false;

type InternalPaths<BaseT>
	= Required<BaseT> extends infer T
		? HasStringIndexSignature<T> extends true
			? keyof T & StringOrNumber
			: T extends EmptyObject | readonly []
				? never
				: {
						[Key in keyof T]: Key extends StringOrNumber
							? | Key
							| (Key extends number ? `${Key}` : never)
							| (_Paths<T[Key]> extends infer SubPath extends StringOrNumber
								? `${Key}.${SubPath}`
								: never)
							: never;
					}[keyof T & (T extends UnknownArray ? number : unknown)]
		: never;
