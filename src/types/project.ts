import type { ConditionalKeys, IsTuple, Simplify } from "type-fest";
import type { Paths } from "./path.ts";
import type { OmitDeep } from "./omit-deep.ts";
import type { PickDeep } from "./pick-deep.ts";
import type { Get } from "./get.ts";
import type { PathsOfType } from "./path-of-type.ts";

type ProjectionBoolean = 0 | 1 | boolean;

// TODO: handle projection pipelines.
export type Projection<T> =
	// TODO: prevent ProjectionBoolean from non Paths<T>
	| {
			[K in Paths<T> | (string & {})]?:
				| ProjectionBoolean
				| ProjectionPipeline<T>;
	  }
	| undefined;

export type ProjectionPipeline<T> =
	| `$${Paths<T>}`
	| { $literal: any }
	| { $arrayElemAt: [`$${PathsOfType<T, any[]>}`, number] };

export type ProjectionType<T, TP extends Projection<T>> = TP extends undefined
	? Simplify<T>
	: Simplify<
			keyof TP extends ConditionalKeys<TP, 0 | false>
				? OmitDeep<T, ConditionalKeys<TP, 0 | false> & string>
				: ConditionalKeys<TP, 0 | false> extends "_id"
					? PickDeep<
							T,
							| (ConditionalKeys<TP, 1 | true> & string)
							| ("_id" extends keyof TP
									? TP["_id"] extends 0 | string
										? never
										: "_id"
									: "_id")
						> &
							(TP extends {} ? ProjectionPipelinePath<T, TP> : never)
					: never
		>;

export type ProjectionPipelineType<
	T,
	TP extends Record<string, ProjectionPipeline<T>>,
> = ProjectionPipelinePath<T, TP> & ProjectionPipelinePipes<T, TP>;

export type ProjectionPipelinePath<T, TP extends Record<string, any>> = {
	[K in ConditionalKeys<TP, string>]: TP[K] extends `$${infer KK}`
		? Get<T, KK>
		: never;
};

export type ProjectionPipelinePipes<T, TP> = {
	[K in ConditionalKeys<
		TP,
		Record<string, any>
	>]: ProjectionPipelineTypePipesInternal<T, TP[K]>;
};

export type ProjectionPipelineTypePipesInternal<T, TT> = //
	TT extends {
		$arrayElemAt: [`$${infer KK}`, infer Index extends number];
	}
		? // TODO: support tuple and tuple with negative index
			Get<T, KK> extends any[]
			?
					| Get<T, KK>[Index]
					| (IsTuple<Get<T, KK>> extends true ? never : undefined)
			: never
		: TT extends { $literal: infer V }
			? V
			: never;
