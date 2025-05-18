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
} from "type-fest/source/internal/array.js";
import type { ExtendedPrimitive } from "./primitives.js";

export interface PathsOptions {
	maxRecursionDepth?: number;
}

interface DefaultPathsOptions {
	maxRecursionDepth: 10;
}

export type Paths<T, Options extends PathsOptions = {}> = _Paths<
	T,
	{
		maxRecursionDepth: Options["maxRecursionDepth"] extends number
			? Options["maxRecursionDepth"]
			: DefaultPathsOptions["maxRecursionDepth"];
	}
>;

type _Paths<
	T,
	Options extends Required<PathsOptions>,
> = T extends ExtendedPrimitive
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
	// eslint-disable-next-line unused-imports/no-unused-vars
	T,
	Options extends Required<PathsOptions>,
> = Options["maxRecursionDepth"] extends infer MaxDepth extends number
	? Required<T> extends infer T
		? T extends EmptyObject | readonly []
			? never
			: {
					[Key in keyof T]: Key extends string | number
						?
						| Key
								// Recursively generate paths for the current key
						| (GreaterThan<MaxDepth, 0> extends true // Limit the depth to prevent infinite recursion
							? _Paths<
								T[Key],
								{ maxRecursionDepth: Subtract<MaxDepth, 1> }
							> extends infer SubPath
								? SubPath extends string | number
									? never | `${Key}.${SubPath}`
									: never
								: never
							: never)
						: never;
				}[keyof T & (T extends UnknownArray ? number : unknown)]
		: never
	: never;
