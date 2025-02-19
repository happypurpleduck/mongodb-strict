import type {
	LiteralUnion,
	Paths,
	SimplifyDeep,
	UnionToTuple,
	UnknownArray,
	IsEqual,
	IsNever,
	ArraySplice,
} from "type-fest";
import type {
	NonRecursiveType,
	SetArrayAccess,
	IsArrayReadonly,
	ToString,
	ExactKey,
} from "type-fest/source/internal";

export type OmitDeep<
	T,
	PathUnion extends LiteralUnion<Paths<T>, string>,
> = SimplifyDeep<OmitDeepHelper<T, UnionToTuple<PathUnion>>, UnknownArray>;

type OmitDeepHelper<T, PathTuple extends UnknownArray> = PathTuple extends [
	infer Path,
	...infer RestPaths,
]
	? OmitDeepHelper<OmitDeepWithOnePath<T, Path & (string | number)>, RestPaths>
	: T;

type OmitDeepWithOnePath<
	T,
	Path extends string | number,
> = T extends NonRecursiveType
	? T
	: T extends UnknownArray
		? SetArrayAccess<OmitDeepArrayWithOnePath<T, Path>, IsArrayReadonly<T>>
		: T extends object
			? OmitDeepObjectWithOnePath<T, Path>
			: T;

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
		: ArrayType;
