import type { Get } from "./get.ts";
import type { Paths } from "./path.ts";

export type StrictMatchKeysAndValues<TSchema> = {
	[Property in Paths<TSchema>]?: Get<TSchema, Property>;
};
