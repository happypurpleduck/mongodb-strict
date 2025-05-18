import type { NumericType, Timestamp } from "mongodb";
import type { PathsOfNonExclusiveType, PathsOfType } from "./path-of-type.ts";
import type { PickDeep } from "./pick-deep.ts";
import type { PopOperation } from "./pop-operation.ts";
import type { PullAllOperator } from "./pull-all-operator.ts";
import type { PullOperator } from "./pull-operator.ts";
import type { PushOperator } from "./push-operator.ts";
import type { SetFields } from "./set-fields.ts";
import type { StrictMatchKeysAndValues } from "./strict-match-keys-and-values.ts";
import type { UnsetOperation } from "./unset-operation.ts";

export interface UpdateFilter<T> {
	$currentDate?: PickDeep<T, PathsOfType<T, Date | Timestamp>>;
	$inc?: Partial<PickDeep<T, PathsOfNonExclusiveType<T, NumericType>>>;
	$min?: StrictMatchKeysAndValues<T>;
	$max?: StrictMatchKeysAndValues<T>;
	$mul?: PickDeep<T, PathsOfType<T, NumericType>>;
	// $rename?: Record<string, string>;
	$set?: StrictMatchKeysAndValues<T>;
	$setOnInsert?: StrictMatchKeysAndValues<T>;
	$unset?: UnsetOperation<T>;
	$addToSet?: SetFields<T>;
	$pop?: PopOperation<T>;
	$pull?: PullOperator<T>;
	$push?: PushOperator<T>;
	$pullAll?: PullAllOperator<T>;
	// $bit?: OnlyFieldsOfType<T, NumericType | undefined, {
	// 	and: IntegerType;
	// } | {
	// 	or: IntegerType;
	// } | {
	// 	xor: IntegerType;
	// }>;
}
