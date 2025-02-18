import type {
	EmptyObject,
	GreaterThan,
	IsAny,
	Subtract,
	UnknownArray,
} from "type-fest";
import type {
	StaticPartOfArray,
	VariablePartOfArray,
} from "type-fest/source/internal";
import type { ExtendedPrimitive } from "./primitives";

type PathsOptions = {
	maxRecursionDepth?: number;
};

export type Paths<T, Options extends PathsOptions = {}> = _Paths<
	T,
	{
		// Set default maxRecursionDepth to 10
		maxRecursionDepth: Options["maxRecursionDepth"] extends number
			? Options["maxRecursionDepth"]
			: 10;
	}
>;

type _Paths<T, Options extends Required<PathsOptions>> = T extends
	| ExtendedPrimitive
	| ReadonlyMap<unknown, unknown>
	| ReadonlySet<unknown>
	? never
	: IsAny<T> extends true
		? never
		: T extends UnknownArray
			? number extends T["length"]
				?
						| InternalPaths<T[number], Options>
						| InternalPaths<StaticPartOfArray<T>, Options>
						| InternalPaths<Array<VariablePartOfArray<T>[number]>, Options>
				: InternalPaths<T, Options>
			: T extends object
				? InternalPaths<T, Options>
				: never;

type InternalPaths<
	T,
	Options extends Required<PathsOptions>,
> = Options["maxRecursionDepth"] extends infer MaxDepth extends number
	? Required<T> extends infer T
		? T extends EmptyObject | readonly []
			? never
			: {
					[Key in keyof T]: Key extends string | number // Limit `Key` to string or number.
						?
								| Key
								| (GreaterThan<MaxDepth, 0> extends true
										? _Paths<
												T[Key],
												{ maxRecursionDepth: Subtract<MaxDepth, 1> }
											> extends infer SubPath
											? SubPath extends string | number
												? `${Key}.${SubPath}`
												: never
											: never
										: never)
						: never;
				}[keyof T & (T extends UnknownArray ? number : unknown)]
		: never
	: never;
