import type { ArrayOperator, Flatten } from "mongodb";
import type { Get } from "./types/get.ts";
import type { PathsOfType } from "./types/path-of-type.ts";

export type PushOperator<T> = {
	readonly [key in PathsOfType<T, ReadonlyArray<any>>]?:
		| Flatten<Get<T, key>>
		| ArrayOperator<Get<T, key>>;
}; // & NotAcceptedFields<T, ReadonlyArray<any>>;
