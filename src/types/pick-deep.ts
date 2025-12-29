import type { IsNever, TupleOf, UnionToIntersection, UnknownArray } from "type-fest";
import type { BuildObject, ObjectValue } from "type-fest/source/internal/index.d.ts";
import type { ExtendedPrimitive } from "../index.ts";
import type { SimplifyDeep } from "./simplify-deep.ts";

// Optimized version that computes UnionToIntersection once
type PickDeepUnion<T, PathUnion extends string> = UnionToIntersection<
	{
		[P in PathUnion]: InternalPickDeep<T, P>;
	}[PathUnion]
>;

export type PickDeep<T, PathUnion extends string> = [PathUnion] extends [never]
	? {}
	: T extends ExtendedPrimitive
		? never
		: T extends UnknownArray
			? PickDeepUnion<T, PathUnion>
			: T extends object
				? SimplifyDeep<PickDeepUnion<T, PathUnion>>
				: never;

type InternalPickDeep<
	T,
	Path extends string | number,
> = T extends ExtendedPrimitive
	? never
	: T extends UnknownArray
		? PickDeepArray<T, Path>
		: T extends object
			? PickDeepObject<T, Path>
			: unknown;

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
					...TupleOf<ArrayIndex>,
					InternalPickDeep<NonNullable<ArrayType[ArrayIndex]>, SubPath>,
				]
			: ArrayType extends readonly unknown[]
				? readonly [
					...TupleOf<ArrayIndex>,
					InternalPickDeep<NonNullable<ArrayType[ArrayIndex]>, SubPath>,
				]
				: never
	: P extends `${infer ArrayIndex extends number}`
		? number extends ArrayIndex
			? ArrayType
			: ArrayType extends unknown[]
				? [...TupleOf<ArrayIndex>, ArrayType[ArrayIndex]]
				: ArrayType extends readonly unknown[]
					? readonly [...TupleOf<ArrayIndex>, ArrayType[ArrayIndex]]
					: never
		: Array<InternalPickDeep<NonNullable<ArrayType[number]>, P>>;
