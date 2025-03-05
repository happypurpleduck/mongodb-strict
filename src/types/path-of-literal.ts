import type { IsLiteral } from "type-fest";
import type { Get } from "./get.ts";
import type { Paths } from "./path.ts";

export type PathsOfLiteral<T> = {
	[K in Paths<T>]: K extends string
		? IsLiteral<Get<T, K>> extends true
			? K
			: never
		: never;
}[Paths<T>];
