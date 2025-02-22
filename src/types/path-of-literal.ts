import type { IsLiteral } from "type-fest";
import type { Get } from "./get";
import type { Paths } from "./path";

export type PathsOfLiteral<T> = {
	[K in Paths<T>]: K extends string
		? IsLiteral<Get<T, K>> extends true
			? K
			: never
		: never;
}[Paths<T>];
