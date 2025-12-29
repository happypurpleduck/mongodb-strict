import type { AddToSetOperators } from "./add-to-set.ts";
import type { Flatten } from "./flatten.ts";
import type { Get } from "./get.ts";
import type { PathOfType } from "./path-of-type.ts";

export type SetFields<T> = {
	[key in PathOfType<T, ReadonlyArray<any>>]?:
		| Flatten<Get<T, key>>
		| AddToSetOperators<Array<Flatten<Get<T, key>>>>;
}; // & NotAcceptedFields<T, ReadonlyArray<any>>;
