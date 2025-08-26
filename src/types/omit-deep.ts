import type {
	ArraySplice,
	IsEqual,
	IsNever,
	SimplifyDeep,
	UnionToTuple,
	UnknownArray,
} from "type-fest";
import type {
	IsArrayReadonly,
	SetArrayAccess,
} from "type-fest/source/internal/array.d.ts";
import type { ExactKey } from "type-fest/source/internal/keys.d.ts";
import type { ToString } from "type-fest/source/internal/string.d.ts";
import type { ExtendedPrimitive } from "./primitives.ts";

export type OmitDeep<T, PathUnion> = SimplifyDeep<
	OmitDeepHelper<T, UnionToTuple<PathUnion>>,
	UnknownArray | ExtendedPrimitive
>;

type OmitDeepHelper<T, PathTuple extends UnknownArray> = PathTuple extends [
	infer Path,
	...infer RestPaths,
]
	? OmitDeepHelper<OmitDeepWithOnePath<T, Path & (string | number)>, RestPaths>
	: T;

type OmitDeepWithOnePath<
	T,
	Path extends string | number,
> = T extends ExtendedPrimitive
	? T
	: T extends UnknownArray
		? SetArrayAccess<OmitDeepArrayWithOnePath<T, Path>, IsArrayReadonly<T>>
		: T extends object
			? OmitDeepObjectWithOnePath<T, Path>
			: T;

// Optimized array path parsing with reduced template literal complexity
type OmitDeepArrayWithOnePath<
	ArrayType extends UnknownArray,
	P extends string | number,
> = P extends `${number}.${string}`
	? P extends `${infer ArrayIndex}.${infer SubPath}`
		? ArrayIndex extends `${number}`
			? number extends ParseInt<ArrayIndex>
				? Array<OmitDeepWithOnePath<NonNullable<ArrayType[number]>, SubPath>>
				: ArraySplice<
					ArrayType,
					ParseInt<ArrayIndex>,
					1,
					[OmitDeepWithOnePath<NonNullable<ArrayType[ParseInt<ArrayIndex>]>, SubPath>]
				>
			: ArrayType
		: ArrayType
	: P extends `${number}`
		? P extends `${infer ArrayIndex}`
			? ArrayIndex extends `${number}`
				? number extends ParseInt<ArrayIndex>
					? []
					: ArraySplice<ArrayType, ParseInt<ArrayIndex>, 1, [unknown]>
				: ArrayType
			: ArrayType
		: P extends string
			? Array<OmitDeepWithOnePath<NonNullable<ArrayType[number]>, P>>
			: ArrayType;

// Helper type to parse string to number more efficiently
type ParseInt<S extends string> = S extends `${infer N extends number}` ? N : never;

type OmitDeepObjectWithOnePath<
	ObjectT extends object,
	P extends string | number,
> = P extends `${infer RecordKeyInPath}.${infer SubPath}`
	? {
			[Key in keyof ObjectT]: IsEqual<
				RecordKeyInPath,
				ToString<Key>
			> extends true
				? ExactKey<ObjectT, Key> extends infer RealKey
					? RealKey extends keyof ObjectT
						? OmitDeepWithOnePath<ObjectT[RealKey], SubPath>
						: ObjectT[Key]
					: ObjectT[Key]
				: ObjectT[Key];
		}
	: ExactKey<ObjectT, P> extends infer Key
		? IsNever<Key> extends true
			? ObjectT
			: Key extends PropertyKey
				? Omit<ObjectT, Key>
				: ObjectT
		: ObjectT;
