import type {
	IsNever,
	Paths,
	Simplify,
	UnionToIntersection,
	UnknownArray,
} from "type-fest";
import type {
	BuildObject,
	BuildTuple,
	NonRecursiveType,
	ObjectValue,
} from "type-fest/source/internal";

export type PickDeep<T, PathUnion extends Paths<T>> = T extends NonRecursiveType
	? never
	: T extends UnknownArray
		? UnionToIntersection<
				{
					[P in PathUnion]: InternalPickDeep<T, P>;
				}[PathUnion]
			>
		: T extends object
			? Simplify<
					UnionToIntersection<
						{
							[P in PathUnion]: InternalPickDeep<T, P>;
						}[PathUnion]
					>
				>
			: never;

type InternalPickDeep<
	T,
	Path extends string | number,
> = T extends NonRecursiveType
	? never
	: T extends UnknownArray
		? PickDeepArray<T, Path>
		: T extends object
			? Simplify<PickDeepObject<T, Path>>
			: never;

type PickDeepObject<
	RecordType extends object,
	P extends string | number,
> = P extends `${infer RecordKeyInPath}.${infer SubPath}`
	? ObjectValue<RecordType, RecordKeyInPath> extends infer ObjectV
		? IsNever<ObjectV> extends false
			? BuildObject<
					RecordKeyInPath,
					InternalPickDeep<NonNullable<ObjectV>, SubPath>,
					RecordType
				>
			: never
		: never
	: ObjectValue<RecordType, P> extends infer ObjectV
		? IsNever<ObjectV> extends false
			? BuildObject<P, ObjectV, RecordType>
			: never
		: never;

type PickDeepArray<
	ArrayType extends UnknownArray,
	P extends string | number,
> = P extends `${infer ArrayIndex extends number}.${infer SubPath}`
	? number extends ArrayIndex
		? ArrayType extends unknown[]
			? Array<InternalPickDeep<NonNullable<ArrayType[number]>, SubPath>>
			: ArrayType extends readonly unknown[]
				? ReadonlyArray<
						InternalPickDeep<NonNullable<ArrayType[number]>, SubPath>
					>
				: never
		: ArrayType extends unknown[]
			? [
					...BuildTuple<ArrayIndex>,
					InternalPickDeep<NonNullable<ArrayType[ArrayIndex]>, SubPath>,
				]
			: ArrayType extends readonly unknown[]
				? readonly [
						...BuildTuple<ArrayIndex>,
						InternalPickDeep<NonNullable<ArrayType[ArrayIndex]>, SubPath>,
					]
				: never
	: P extends `${infer ArrayIndex extends number}`
		? number extends ArrayIndex
			? ArrayType
			: ArrayType extends unknown[]
				? [...BuildTuple<ArrayIndex>, ArrayType[ArrayIndex]]
				: ArrayType extends readonly unknown[]
					? readonly [...BuildTuple<ArrayIndex>, ArrayType[ArrayIndex]]
					: never
		: never;
