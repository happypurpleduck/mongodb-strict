import type {
	AggregateOptions,
	Collection,
	Filter,
	NumericType,
} from "mongodb";
import type { Except } from "type-fest";
import type { TLiteralsFilter, TLiteralsFilterType } from "./types/filter.ts";
import type { Get } from "./types/get.ts";
import type { Paths } from "./types/path.ts";
import type { PathOfType, PathsOfType } from "./types/path-of-type.ts";
import type { Projection, ProjectionType } from "./types/project.ts";
import type { Singular } from "./types/singular.ts";

export type InferAggregateType<T extends Aggregate<any>> = T["~type"];

export class Aggregate<T> {
	// @ts-expect-error
	collection: Collection<T>;
	options?: AggregateOptions;

	/** type only */
	"~type": T;

	pipeline: {}[] = [];

	constructor(
		// @ts-expect-error
		collection: Collection<T>,
		options?: AggregateOptions,
	) {
		this.collection = collection;
		this.options = options;
	}

	match(match: Filter<T>) {
		this.pipeline.push({
			$match: match,
		});

		return this;
	}

	unionMatch<const TFilter extends TLiteralsFilter<T>>(match: TFilter) {
		this.pipeline.push({
			$match: match,
		});

		return this as unknown as Aggregate<T & TLiteralsFilterType<T, TFilter>>;
	}

	// TODO:
	sort(
		sort: {
			[K in Paths<T>]?: -1 | 1;
		},
	) {
		this.pipeline.push({ $sort: sort });

		return this;
	}

	lookup<
		TC,
		const TLocalField extends Paths<T>,
		const TLocalPropType extends Singular<Get<T, TLocalField & string>>,
		const TField extends string,
		const TResult = TC,
	>(lookup: {
		// @ts-expect-error
		from: Collection<TC>;
		localField: TLocalField;
		foreignField: PathsOfType<NoInfer<TC>, TLocalPropType>;
		/** this currently only support top level */
		as: TField;
		// TODO: lookup: let
		let?: never;
		pipeline?: (aggregation: Aggregate<TC>) => Aggregate<TResult>;
	}): Aggregate<
		(TField extends keyof T ? Except<T, TField> : T) & {
			[K in TField]: TResult[];
		}
	> {
		this.pipeline.push({
			$lookup: {
				from: lookup.from.collectionName,
				localField: lookup.localField,
				foreignField: lookup.foreignField,
				as: lookup.as,
				pipeline: lookup.pipeline?.(new Aggregate(lookup.from)).pipeline ?? [],
			},
		});

		// @ts-expect-error
		return this;
	}

	unwind<TUnwrap extends PathOfType<T, unknown[]>, TArrayIndex extends string>(
		unwind:
			| `$${TUnwrap}`
			| {
					path: `$${TUnwrap}`;
					preserveNullAndEmptyArrays?: boolean;
					// TODO: unwind: array index
					includeArrayIndex?: TArrayIndex;
			  },
	) {
		this.pipeline.push({ $unwind: unwind });

		return this as unknown as Aggregate<
			Except<T, TUnwrap> &
				Record<
					TUnwrap,
					// @ts-expect-error
					T[TUnwrap][number]
				>
		>;
	}

	group<
		const TGroupBy extends `$${Paths<T>}` | Record<string, `$${Paths<T>}`>,
		TFields extends Record<
			string,
			// | { $accumulator: never }
			| { $addToSet: `$${Paths<T>}` }
			| { $avg: `$${PathsOfType<T, NumericType>}` }
			// | { $bottom: never }
			// | { $bottomN: never }
			| { $count: Record<never, never> }
			| { $first: `$${Paths<T>}` | "$$ROOT" }
			// | { $firstN: never }
			| { $last: `$${Paths<T>}` | "$$ROOT" }
			// | { $lastN: never }
			| { $max: `$${Paths<T>}` }
			// | { $maxN: never }
			| { $median: `$${PathsOfType<T, NumericType>}` }
			// | { $mergeObjects: never }
			| { $min: `$${Paths<T>}` }
			// | { $minN: never }
			// | { $percentile: never }
			| { $push: `$${"$ROOT" | Paths<T>}` | Record<string, `$${Paths<T>}`> }
			// | { $stdDevPop: never }
			// | { $stdDevSamp: never }
			| { $sum: `$${PathsOfType<T, NumericType>}` }
			// | { $top: never }
			// | { $topN: never }
		>,
	>(groupBy: TGroupBy, fields: TFields) {
		this.pipeline.push({ $group: { _id: groupBy, ...fields } });

		// return this;

		return this as unknown as Aggregate<
			{
				_id: TGroupBy extends `$${infer X}`
					? Get<T, X>
					: {
							[K in keyof TGroupBy]: TGroupBy[K] extends `$${infer X}`
								? Get<T, X>
								: never;
						};
			} & {
				[K in keyof TFields /* accumulator */]: TFields[K] extends {
					//
					$accumulator: any;
				}
					? unknown
					: /* add to set */
						TFields[K] extends { $addToSet: `$${infer K2}` }
						? Get<T, K2>[]
						: /* $avg */
							TFields[K] extends { $avg: `$${infer Z}` }
							? NonNullable<Get<T, Z>>
							: /* bottom */
								TFields[K] extends { $bottom: any }
								? unknown
								: /* bottomN */
									TFields[K] extends { $bottomN: any }
									? unknown
									: /* count */
										TFields[K] extends { $count: any }
										? number
										: /* first */
											TFields[K] extends { $first: `$${infer K2}` }
											? K2 extends "$ROOT"
												? T
												: Get<T, K2>
											: /* firstN */
												TFields[K] extends { $first: any }
												? unknown
												: /* last */
													TFields[K] extends { $last: `$${infer K2}` }
													? K2 extends "$ROOT"
														? T
														: Get<T, K2>
													: /* lastN */
														TFields[K] extends { $lastN: any }
														? unknown
														: /* max */
															TFields[K] extends { $max: `$${infer K2}` }
															? Get<T, K2>
															: /* maxN */
																TFields[K] extends { $lastN: any }
																? unknown
																: /* push */
																	TFields[K] extends { $push: infer Z }
																	? Z extends `$${infer K2}`
																		? K2 extends "$ROOT"
																			? T[]
																			: Get<T, K2>[]
																		: Z extends Record<string, any>
																			? {
																					[K in keyof Z]: Z[K] extends `$${infer KK}`
																						? Get<T, KK>
																						: never;
																				}[]
																			: never
																	: /* $sum */
																		TFields[K] extends { $sum: `$${infer Z}` }
																		? NonNullable<Get<T, Z>>
																		: /* $bottom */
																			TFields[K] extends {
																					$bottom: `$${infer Z}`;
																				}
																			? NonNullable<Get<T, Z>>
																			: TFields[K] extends { $count: number }
																				? number
																				: never;
			}
		>;
	}

	_group<TT>(group: { _id: unknown }) {
		this.pipeline.push({ $group: group });
		return this as unknown as Aggregate<TT>;
	}

	project<const TProjection extends Projection<T>>(projection: TProjection) {
		this.pipeline.push({ $project: projection });

		return this as unknown as Aggregate<ProjectionType<T, TProjection>>;
	}

	next() {
		return this.collection.aggregate(this.pipeline, this.options).next();
	}

	toArray() {
		return this.collection.aggregate(this.pipeline, this.options).toArray();
	}
}
