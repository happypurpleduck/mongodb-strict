import type { ConditionalKeys, IsTuple } from "type-fest";
import type { BuildDotObject } from "./build-dot-object.ts";
import type { Get } from "./get.ts";
import type { OmitDeep } from "./omit-deep.ts";
import type { PathsOfType } from "./path-of-type.ts";
import type { Paths } from "./path.ts";
import type { PickDeep } from "./pick-deep.ts";
import type { SimplifyDeep } from "./simplify-deep.ts";

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
	| { $arrayElemAt: [`$${PathsOfType<T, any[]>}`, number] }
	| { [K in string]: ProjectionPipeline<T> };

export type ProjectionType<T, TP extends Projection<T>> = TP extends undefined
	? SimplifyDeep<T>
	: SimplifyDeep<
			(keyof TP extends ConditionalKeys<TP, 0 | false>
				? OmitDeep<T, ConditionalKeys<TP, 0 | false>>
				: ConditionalKeys<TP, 0 | false> extends "_id"
					? PickDeep<
						T, // @ts-expect-error
						| ConditionalKeys<TP, 1 | true>
						| ("_id" extends keyof TP
							? TP["_id"] extends 0 | false | string
								? never
								: "_id"
							: "_id")
					>
					: unknown) &
					BuildDotObject<ProjectionPipelineType<T, TP>>
	>;

export type ProjectionPipelineType<T, TP> = ProjectionPipelinePath<T, TP> &
	ProjectionPipelinePipes<T, TP>;

export type ProjectionPipelinePath<T, TP> = {
	[K in ConditionalKeys<TP, string>]: TP[K] extends `$${infer KK}`
		? Get<T, KK>
		: never;
} & {
	[K in ConditionalKeys<TP, Record<string, any>>]: ProjectionPipelineType<
		T,
		TP[K]
	>;
};

export type ProjectionPipelinePipes<T, TP> = {
	[K in ConditionalKeys<TP, Record<string, any>> &
	(keyof TP & `$${string}`)]: ProjectionPipelineTypePipesInternal<T, TP[K]>;
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

// TODO: convert to tests
// type A = ProjectionType<{ x: 5; y: 1 }, { x: 1 }>;
// //   ^?
// type B = ProjectionType<{ x: 5; y: 1 }, { "z.a": "$x" }>;
// //   ^?
// type C = ProjectionType<{ x: 5; y: 1 }, { x: 1; z: "$x" }>;
// //   ^?
// type D = ProjectionType<{ x: 5; y: 1 }, {}>;
// //   ^?
// type E = ProjectionType<{ x: 5; y: 1 }, { x: 0 }>;
// //   ^?
// type F = ProjectionType<{ x: 5; y: 1 }, { a: { $literal: "a" } }>;
// //   ^?
// type G = ProjectionType<{ x: 5; y: 1 }, { x: { $literal: "a" } }>;
// //   ^?
// type H = ProjectionType<{ x: 5; y: 1 }, { x: 1; a: { $literal: "a" } }>;
// //   ^?
// type I = ProjectionType<{ x: 5; y: 1 }, { y: 1; x: { $literal: "a" } }>;
// //   ^?
