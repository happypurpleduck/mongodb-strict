import type { Flatten } from "./flatten.ts";

export interface AddToSetOperators<T> {
	$each?: Array<Flatten<T>>;
}
