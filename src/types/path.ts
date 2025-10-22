import type { EmptyObject, IsAny, UnknownArray } from "type-fest";
import type { StaticPartOfArray, VariablePartOfArray } from "type-fest/source/internal/array.js";
import type { ExtendedPrimitive } from "../index.js";

export type Paths<T> = _Paths<T>;

type _Paths<T> = T extends ExtendedPrimitive
	? never
	: IsAny<T> extends true
		? never
		: T extends UnknownArray
			? number extends T["length"]
				? | InternalPaths<T[number]>
				| InternalPaths<StaticPartOfArray<T>>
				| InternalPaths<Array<VariablePartOfArray<T>[number]>>
				: InternalPaths<T>
			: T extends object
				? InternalPaths<T>
				: never;

type InternalPaths<BaseT>
	= Required<BaseT> extends infer T
		? T extends EmptyObject | readonly []
			? never
			: {
					[Key in keyof T]: Key extends string | number
						? | Key
						| (_Paths<T[Key]> extends infer SubPath
							? SubPath extends string | number
								? `${Key}.${SubPath}`
								: never
							: never)
						: never;
				}[keyof T & (T extends UnknownArray ? number : unknown)]
		: never;
