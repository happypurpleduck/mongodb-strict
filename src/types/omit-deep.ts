import type { SimplifyDeep, UnionToTuple, UnknownArray } from "type-fest";
import type {
	IsArrayReadonly,
	SetArrayAccess,
} from "type-fest/source/internal";
import type { ExtendedPrimitive } from "./primitives";
import type {
	OmitDeepArrayWithOnePath,
	OmitDeepObjectWithOnePath,
} from "type-fest/source/omit-deep";

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
