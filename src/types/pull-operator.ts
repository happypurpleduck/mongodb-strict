import type { Flatten } from "mongodb";
import type { Get } from "./get.ts";
import type { PathsOfType } from "./path-of-type.ts";

export type PullOperator<T> = {
	readonly [key in PathsOfType<T, ReadonlyArray<any>>]?:
		| Partial<Flatten<Get<T, key>>>
		| FilterOperations<Flatten<Get<T, key>>>;
}; // & NotAcceptedFields<T, ReadonlyArray<any>>;
