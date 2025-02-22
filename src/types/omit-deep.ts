import type {
	ArraySplice,
	IsEqual,
	IsNever,
	SimplifyDeep,
	UnionToTuple,
	UnknownArray,
} from "type-fest";
import type {
	ExactKey,
	IsArrayReadonly,
	SetArrayAccess,
	ToString,
} from "type-fest/source/internal";
import type { ExtendedPrimitive } from "./primitives";

export type OmitDeep<T, PathUnion extends string> = SimplifyDeep<
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

type OmitDeepArrayWithOnePath<
	ArrayType extends UnknownArray,
	P extends string | number,
> = P extends `${infer ArrayIndex extends number}.${infer SubPath}`
	? number extends ArrayIndex
		? Array<OmitDeepWithOnePath<NonNullable<ArrayType[number]>, SubPath>>
		: ArraySplice<
				ArrayType,
				ArrayIndex,
				1,
				[OmitDeepWithOnePath<NonNullable<ArrayType[ArrayIndex]>, SubPath>]
			>
	: P extends `${infer ArrayIndex extends number}`
		? number extends ArrayIndex
			? []
			: ArraySplice<ArrayType, ArrayIndex, 1, [unknown]>
		: P extends string
			? Array<OmitDeepWithOnePath<NonNullable<ArrayType[number]>, P>>
			: ArrayType;

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
