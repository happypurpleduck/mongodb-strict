import type { Get } from "./get.ts";
import type { PathsOfType } from "./path-of-type.ts";

export type PullAllOperator<TSchema> = {
	readonly [key in PathsOfType<TSchema, ReadonlyArray<any>>]?: Get<
		TSchema,
		key
	>;
}; // & NotAcceptedFields<TSchema, ReadonlyArray<any>>;
