import type { Flatten } from "./flatten.ts";
import type { Sort } from "./sort.ts";

export declare interface ArrayOperator<T> {
	$each?: Array<Flatten<T>>;
	// TODO: tuple indexing
	$slice?: number;
	// TODO: tuple indexing
	$position?: number;
	$sort?: Sort<T>;
}
