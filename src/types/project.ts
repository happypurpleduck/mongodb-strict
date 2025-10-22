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

export type ProjectionPipelineType<T, TP> = ProjectionPipelinePath<T, TP>
	& ProjectionPipelinePipes<T, TP>;

export type ProjectionPipelinePath<T, TP> = {
	[K in ConditionalKeys<TP, string>]: TP[K] extends `$${infer KK}`
		? Get<T, KK>
		: never;
} & {
	[K in ConditionalKeys<
		TP,
		Record<string, any>
	>]: TP[K] extends readonly (keyof any)[]
		? MapTupleToTypes<T, TP[K]>
		: ProjectionPipelineType<T, TP[K]>;
};

export type ProjectionPipelinePipes<T, TP> = {
	[K in ConditionalKeys<TP, Record<string, any>>
	& (keyof TP & `$${string}`)]: ProjectionPipelineTypePipesInternal<T, TP[K]>;
};

export type ProjectionPipelineTypePipesInternal<T, TT>
	= TT extends {
		$arrayElemAt: [`$${infer KK}`, infer Index extends number];
	} // TODO: support tuple and tuple with negative index
		? Get<T, KK> extends any[]
			? | Get<T, KK>[Index]
			| (IsTuple<Get<T, KK>> extends true ? never : undefined)
			: never
		: TT extends { $literal: infer V }
			? V
			: never;
