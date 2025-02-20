import type { ConditionalKeys, Simplify } from "type-fest";
import type { Paths } from "./path";
import type { OmitDeep } from "./omit-deep";
import type { PickDeep } from "./pick-deep";
import type { Get } from "./get";

// TODO: handle projection pipelines.
export type Projection<T> =
	| {
			[K in Paths<T>]?: 0 | 1;
	  }
	| undefined;

export type ProjectionType<T, TP extends Projection<T>> = TP extends undefined
	? Simplify<T>
	: Simplify<
			keyof TP extends ConditionalKeys<TP, 0>
				? OmitDeep<T, ConditionalKeys<TP, 0> & string>
				: ConditionalKeys<TP, 0> extends "_id"
					? PickDeep<
							T,
							| (ConditionalKeys<TP, 1> & string)
							| ("_id" extends keyof TP
									? TP["_id"] extends 0 | string
										? never
										: "_id"
									: "_id")
						> & {
							[K in ConditionalKeys<TP, string>]: TP[K] extends `$${infer KK}`
								? Get<T, KK>
								: never;
						}
					: never
		>;
