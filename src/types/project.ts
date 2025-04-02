import type { ConditionalKeys, Simplify } from "type-fest";
import type { Paths } from "./path.ts";
import type { OmitDeep } from "./omit-deep.ts";
import type { PickDeep } from "./pick-deep.ts";
import type { Get } from "./get.ts";
import type { PathsOfType } from "./path-of-type.ts";

// TODO: handle projection pipelines.
export type Projection<T> =
	| ({
			[K in Paths<T>]?: 0 | 1 | boolean | ProjectionPipeline<T>;
	  } & Partial<Record<string, ProjectionPipeline<T>>>)
	| undefined;

export type ProjectionPipeline<T> =
	| `$${Paths<T>}`
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
						> & {
							[K in ConditionalKeys<TP, string>]: TP[K] extends `$${infer KK}`
								? Get<T, KK>
								: never;
						} & {
							[K in ConditionalKeys<TP, Record<string, any>>]: TP[K] extends {
								$arrayElemAt: [`$${infer KK}`, infer Index];
							}
								? // @ts-expect-error
									// TODO: support tuple and tuple with negative index
									Get<T, KK>[Index] | undefined
								: never;
						}
					: never
		>;

export type ProjectionPipelineType<
	T,
	TP extends Record<string, ProjectionPipeline<T>>,
> = {
	[K in ConditionalKeys<TP, string>]: TP[K] extends `$${infer KK}`
		? Get<T, KK>
		: never;
} & {
	[K in ConditionalKeys<TP, Record<string, any>>]: TP[K] extends {
		$arrayElemAt: [`$${infer KK}`, infer Index];
	}
		? // @ts-expect-error
			// TODO: support tuple and tuple with negative index
			Get<T, KK>[Index] | undefined
		: never;
};
