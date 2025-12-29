import type { Condition } from "./condition.ts";
import type { Get } from "./get.ts";
import type { PathsOfGeneric } from "./path-of-generic.ts";
import type { Paths } from "./path.ts";

type ConditionOf<T, K extends PropertyKey> = Condition<Get<T, K>>;

export type Filter<T> = {
	[K in Paths<T>]?: ConditionOf<T, K>;
} & {
	$or?: Array<Filter<T>>;
	$and?: Array<Filter<T>>;
	$nor?: Array<Filter<T>>;
	/** TODO: not implemented (type) */
	$expr?: any;
};

export type GenericsFilter<T> = {
	[K in PathsOfGeneric<T>]?: ConditionOf<T, K>;
} & {
	$or?: Array<GenericsFilter<T>>;
	$and?: Array<GenericsFilter<T>>;
	$nor?: Array<GenericsFilter<T>>;
	/** TODO: not implemented (type) */
	$expr?: any;
};
