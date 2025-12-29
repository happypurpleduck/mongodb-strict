import type { Decimal128, ObjectId, UUID } from "mongodb";
import type { ConditionalKeys, IsTuple } from "type-fest";
import type { BuildDotObject } from "./build-dot-object.ts";
import type { Get } from "./get.ts";
import type { OmitDeep } from "./omit-deep.ts";
import type { PathsOfType } from "./path-of-type.ts";
import type { Paths } from "./path.ts";
import type { PickDeep } from "./pick-deep.ts";
import type { SimplifyDeep } from "./simplify-deep.ts";

type MapTupleToTypes<U, T extends readonly (keyof any)[]> = {
	[K in keyof T]: T[K] extends `$${infer KK}` ? Get<U, KK> : never;
};

type ProjectionBoolean = 0 | 1 | boolean;

// TODO: handle projection pipelines.
export type Projection<T>
	// TODO: prevent ProjectionBoolean from non Paths<T>
	= | {
		[K in Paths<T> | (string & {})]?:
			| ProjectionBoolean
			| ProjectionPipeline<T>;
	}
	| undefined;

export type ProjectionPipeline<T>
	= | `$${Paths<T>}`
		| { $literal: any }
		| { $toBool: `$${Paths<T>}` }
		| { $toDate: `$${Paths<T>}` }
		| { $toDecimal: `$${Paths<T>}` }
		| { $toDouble: `$${Paths<T>}` }
		| { $toInt: `$${Paths<T>}` }
		| { $toLong: `$${Paths<T>}` }
		| { $toObjectId: `$${Paths<T>}` }
		| { $toString: `$${Paths<T>}` }
		| { $toUUID: `$${Paths<T>}` }
		| { $arrayElemAt: [`$${PathsOfType<T, any[]>}`, number] }
		| { [K in string]: ProjectionPipeline<T> }
		| ProjectionPipeline<T>[];

export type ProjectionType<T, TP extends Projection<T>> = TP extends undefined
	? T
	: SimplifyDeep<(keyof TP extends ConditionalKeys<TP, 0 | false>
		? OmitDeep<T, ConditionalKeys<TP, 0 | false>>
		: ConditionalKeys<TP, 0 | false> extends "_id"
			? PickDeep<
				T,
							| (ConditionalKeys<TP, 1 | true> & string)
							| ("_id" extends keyof TP
								? TP extends { _id: infer V }
									? V extends 0 | false | string
										? never
										: "_id"
									: "_id"
								: "_id")
			>
			: unknown)
		& BuildDotObject<ProjectionPipelineType<T, TP>>
	>;

// Unified pipeline type - single pass over all non-boolean keys
export type ProjectionPipelineType<T, TP> = {
	[K in ConditionalKeys<TP, string | Record<string, any>>]: K extends `$${string}`
		? ProjectionPipelineTypePipesInternal<T, TP[K]>
		: TP[K] extends `$${infer KK}`
			? Get<T, KK>
			: TP[K] extends readonly (keyof any)[]
				? MapTupleToTypes<T, TP[K]>
				: TP[K] extends Record<string, any>
					? ProjectionPipelineType<T, TP[K]>
					: never;
};

// Use infer to cache Get<T, KK> computation and reduce nesting
export type ProjectionPipelineTypePipesInternal<T, TT>
	= TT extends { $arrayElemAt: [`$${infer KK}`, infer Index extends number] }
		? Get<T, KK> extends infer Arr extends any[]
			? Arr[Index] | (IsTuple<Arr> extends true ? never : undefined)
			: never
		: TT extends { $literal: infer V }
			? V
			: PipelineConversion<TT>; // Extract conversion operators to separate type

// Conversion type map - indexed access is more efficient than conditional chain
type ConversionTypeMap = {
	$toBool: boolean;
	$toDate: Date;
	$toDecimal: Decimal128;
	$toDouble: number;
	$toInt: number;
	$toLong: number;
	$toObjectId: ObjectId;
	$toString: string;
	$toUUID: UUID;
};

type ConversionKeys = keyof ConversionTypeMap;

// Use indexed access pattern for conversion lookup
type PipelineConversion<TT> = {
	[K in ConversionKeys]: K extends keyof TT
		? TT[K] extends string ? ConversionTypeMap[K] : never
		: never;
}[ConversionKeys];
